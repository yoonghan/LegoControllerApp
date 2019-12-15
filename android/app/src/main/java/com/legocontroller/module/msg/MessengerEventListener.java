package com.legocontroller.module.msg;

import android.util.Log;


import javax.sql.ConnectionEvent;
import javax.sql.ConnectionEventListener;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.pusher.client.channel.PrivateChannelEventListener;

public class MessengerEventListener implements ConnectionEventListener, PrivateChannelEventListener {

    private String TAG = MessengerEventListener.class.getName();
    private final ReactContext reactContext;
    private final String eventEmitterName;
    private final String connectionEmitterName;

    private final String DISCONNECTED = "DISCONNECTED";
    private final String CONNECTED = "CONNECTED";
    private final String CONNECTING = "CONNECTING";

    public MessengerEventListener(ReactContext reactContext, String eventEmitterName, String connectionEmitterName) {
        this.eventEmitterName = eventEmitterName;
        this.reactContext = reactContext;
        this.connectionEmitterName = connectionEmitterName;
        init();
    }

    private WritableMap createConnectionMap(String status) {
        WritableMap params = Arguments.createMap();
        params.putString("status", status);
        return params;
    }

    private WritableMap createMessageMap(String message) {
        WritableMap params = Arguments.createMap();
        params.putString("message", message);
        return params;
    }

    private void emitConnectionStatus(String status) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(this.connectionEmitterName, createConnectionMap(status));
    }

    private void init() {
        emitConnectionStatus(CONNECTING);
    }

    @Override
    public void connectionClosed(ConnectionEvent connectionEvent) {
        Log.d(TAG, "Closed");
        emitConnectionStatus(DISCONNECTED);
    }

    @Override
    public void connectionErrorOccurred(ConnectionEvent connectionEvent) {
        Log.d(TAG, "Connection error");
        emitConnectionStatus(DISCONNECTED);
    }

    @Override
    public void onAuthenticationFailure(String message, Exception exception) {
        Log.e(TAG, "Authentication failure:" + message);
        emitConnectionStatus(DISCONNECTED);
    }

    @Override
    public void onSubscriptionSucceeded(String s) {
        Log.i(TAG, "Subscribed");
        emitConnectionStatus(CONNECTED);
    }

    @Override
    public void onEvent(String channelName, String eventName, String data) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(this.eventEmitterName, createMessageMap(data));
        Log.i(TAG, this.eventEmitterName + data);
    }


}
