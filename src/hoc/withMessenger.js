import React from 'react';

import { NativeModules } from 'react-native';
import Messenger from "../native/android/Messenger";

const MESSENGER_MESSAGE_EVENT = "onMessengerEvent";
const MESSENGER_CONNECT_EVENT = "onMessengerConnectEvent";

export const STATUS = {
  CONNECTING: 0,
  CONNECTED: 1,
  DISCONNECTED: 2
}

const withMessenger = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      const {messenger, messengerEmitter} = Messenger;
      this._messenger = messenger;
      this._messengerEmitter = messengerEmitter;
      this._isConnected = false;
      this._canConnect = true;
      this._connectionStatus = STATUS.CONNECTING;
    }

    connect = (eventCallback, connectionCallback) => {
      this._messenger.connect(MESSENGER_MESSAGE_EVENT, MESSENGER_CONNECT_EVENT);
      this._addConnectionListener(connectionCallback);
      this._addEventListener(eventCallback);
    }

    _addConnectionListener = (connectionCallback) => {
      this._messengerEmitter.addListener(MESSENGER_CONNECT_EVENT, (event) => {
        const {status} = event;
        switch(status) {
          case "CONNECTED":
            this._connectionStatus = STATUS.CONNECTED;
            break;
          case "CONNECTING":
            this._connectionStatus = STATUS.CONNECTING;
            break;
          default:
            if(this._connectionStatus === STATUS.CONNECTED) {
              this._messengerEmitter.removeListener(MESSENGER_MESSAGE_EVENT);
            }
            this._connectionStatus = STATUS.DISCONNECTED;
            break;
        }
        connectionCallback(this._connectionStatus);
      });
    }

    _addEventListener = (eventCallback) => {
      switch(this._connectionStatus) {
        case STATUS.CONNECTED:
          this._messengerEmitter.addListener(
            MESSENGER_MESSAGE_EVENT,
            (event) => {
              eventCallback(event)
            }
          );
      }
    }

    send = (message) => {
      if(this._connectionStatus === STATUS.CONNECTED) {
        this._messenger.sendMessage(message);
      }
    }

    disconnect = () => {
      switch(this._connectionStatus) {
        case STATUS.CONNECTED:
        case STATUS.CONNECTING:
          this._messenger.disconnect();
          break;
      }
    }

    componentWillUnmount() {
      this.disconnect();
    }

    render() {
      return <WrappedComponent
                messenger={
                  {
                    connect: this.connect,
                    disconnect: this.disconnect,
                    send: this.send
                  }
                }
                {...this.props}
                />;
    }
  }
}

export default withMessenger;
