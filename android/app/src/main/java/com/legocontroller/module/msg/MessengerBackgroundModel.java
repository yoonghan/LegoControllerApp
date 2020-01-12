package com.legocontroller.module.msg;

import com.facebook.react.bridge.ReactContext;

public class MessengerBackgroundModel {
    private final String eventEmitterName;
    private final String connectionEmitterName;
    private final String channelName;

    public MessengerBackgroundModel(String channelName, String eventEmitterName, String connectionEmitterName) {
        this.channelName = channelName;
        this.eventEmitterName = eventEmitterName;
        this.connectionEmitterName = connectionEmitterName;
    }

    public String getChannelName() { return channelName; }

    public String getEventEmitterName() {
        return eventEmitterName;
    }

    public String getConnectionEmitterName() {
        return connectionEmitterName;
    }
}
