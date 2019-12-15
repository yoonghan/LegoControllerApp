package com.legocontroller.module.msg;

import com.facebook.react.bridge.ReactContext;

public class MessengerBackgroundModel {
    private final String eventEmitterName;
    private final String connectionEmitterName;

    public MessengerBackgroundModel(String eventEmitterName, String connectionEmitterName) {
        this.eventEmitterName = eventEmitterName;
        this.connectionEmitterName = connectionEmitterName;
    }

    public String getEventEmitterName() {
        return eventEmitterName;
    }

    public String getConnectionEmitterName() {
        return connectionEmitterName;
    }
}
