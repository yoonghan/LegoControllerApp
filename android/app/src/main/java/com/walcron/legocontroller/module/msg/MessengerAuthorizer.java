package com.walcron.legocontroller.module.msg;

import android.content.Context;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.RequestFuture;
import com.android.volley.toolbox.Volley;
import com.pusher.client.AuthorizationFailureException;
import com.pusher.client.Authorizer;
import com.walcron.legocontroller.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class MessengerAuthorizer implements Authorizer {
    private final String TAG = MessengerAuthorizer.class.getName();
    private final Context CONTEXT;
    private final String AUTHORIZATION_URL;

    public MessengerAuthorizer(Context context) {
        this.CONTEXT = context;
        this.AUTHORIZATION_URL = CONTEXT.getString(R.string.PUSHER_AUTH_URL);
    }

    public JSONObject createPusherObj(String channelName, String socketId) {
        try {
            JSONObject pusherAuthObj = new JSONObject();
            pusherAuthObj.put("channel_name", channelName);
            pusherAuthObj.put("socket_id", socketId);
            return pusherAuthObj;
        }
        catch (JSONException joe) {
           Log.e(TAG, joe.getMessage());
            return null;
        }
    }

    public String authorize(String channelName, String socketId) throws AuthorizationFailureException {
        String response = requestForAuthToken(channelName, socketId);
        return response;
    }

    public String requestForAuthToken(String channelName, String socketId) {
        RequestQueue queue = Volley.newRequestQueue(this.CONTEXT);
        RequestFuture<JSONObject> future = RequestFuture.newFuture();
        JsonObjectRequest authTokenRequest = new JsonObjectRequest(
                Request.Method.POST,
                AUTHORIZATION_URL,
                createPusherObj(channelName, socketId),
                future,
                future
        );
        queue.add(authTokenRequest);

        try {
            JSONObject response = future.get(30, TimeUnit.SECONDS);
            return response.toString();
        }
        catch (InterruptedException| TimeoutException | ExecutionException e) {
            Log.e(TAG, e.getMessage());
            return "";
        }
    }
}
