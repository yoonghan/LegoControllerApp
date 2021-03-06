package com.walcron.legocontroller.module.msg;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.walcron.legocontroller.R;
import com.pusher.client.Pusher;
import com.pusher.client.PusherOptions;
import com.pusher.client.channel.PrivateChannel;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ReactMessenger extends ReactContextBaseJavaModule {
    private final String LOG = ReactMessenger.class.getName();
    private final Pusher pusher;

    private PrivateChannel privateChannel = null;
    private String authToken;

    public ReactMessenger(ReactApplicationContext context) {
        super(context);
        PusherOptions pusherOptions = createPusherOptions(context);
        this.pusher = new Pusher(context.getString(R.string.PUSHER_APP_KEY), pusherOptions);
    }

    @NonNull
    @Override
    public String getName() {
        return "ReactMessenger";
    }

    private PusherOptions createPusherOptions(Context context) {
        PusherOptions options = new PusherOptions();
        options.setCluster(context.getString(R.string.PUSHER_CLUSTER));
        options.setAuthorizer(new MessengerAuthorizer(context));
        return options;
    }


    @ReactMethod
    public void connect(String authToken, String eventEmitterName, String connectionEmitterName) {
        this.authToken = authToken;
        MessengerBackgroundModel messengerBackgroundModel = new MessengerBackgroundModel(
                getChannelName(authToken),
                eventEmitterName,
                connectionEmitterName);

        AsyncTask<MessengerBackgroundModel, Void, PrivateChannel> messengerConnectionTask =
            new MessengerConnectionTask(getReactApplicationContext(), this.pusher)
                    .execute(messengerBackgroundModel);

        try {
            privateChannel = messengerConnectionTask.get(1, TimeUnit.MINUTES);
        }
        catch(InterruptedException| ExecutionException| TimeoutException e) {
            e.printStackTrace();
            Log.e(LOG, "Exception" + e.getMessage());
        }
    }

    private String createMessage(String message) {
        JSONObject msgObj = new JSONObject();
        try {
            msgObj.put("message", message);
        } catch (JSONException e) {
            //Dont send
        }
        return msgObj.toString();
    }

    @ReactMethod
    public void sendMessage(String message) {
        if(privateChannel != null) {
            privateChannel.trigger(
                    "client-"+getReactApplicationContext().getString(R.string.PUSHER_EVENT_NAME),
                    createMessage(message));

        }
        else {
            createMessage("[Message fail to send]");
        }
    }

    private String getChannelName(String authToken) {
        return "private-wal_" + authToken;
    }

    @ReactMethod
    public void disconnect() {
        if(privateChannel != null) {
            pusher.unsubscribe(getChannelName(this.authToken));
            pusher.disconnect();
        }
    }
}
