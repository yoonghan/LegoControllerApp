package com.legocontroller.module.msg;

import android.content.Context;
import android.os.AsyncTask;

import com.facebook.react.bridge.ReactContext;
import com.legocontroller.R;
import com.pusher.client.Pusher;
import com.pusher.client.channel.PrivateChannel;

public class MessengerConnectionTask extends AsyncTask<MessengerBackgroundModel, Void, PrivateChannel> {

    private final Pusher pusher;
    private final ReactContext context;

    MessengerConnectionTask(ReactContext context, Pusher pusher) {
        this.pusher = pusher;
        this.context = context;
    }

    @Override
    protected PrivateChannel doInBackground(MessengerBackgroundModel ...messengerBackgroundModels) {
        MessengerBackgroundModel messengerBackgroundModel = messengerBackgroundModels[0];
        String eventEmitterName = messengerBackgroundModel.getEventEmitterName();
        String connectionEmitterName = messengerBackgroundModel.getConnectionEmitterName();

        pusher.connect();

        PrivateChannel privateChannel = pusher.subscribePrivate(
                messengerBackgroundModel.getChannelName(),
                new MessengerEventListener(this.context, eventEmitterName, connectionEmitterName),
                "client-"+context.getString(R.string.PUSHER_EVENT_NAME)
        );

        return privateChannel;
    }
}
