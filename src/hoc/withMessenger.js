import React from 'react';

import { NativeModules } from 'react-native';
import Messenger from "../native/Messenger";

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
      console.log("Added withMessenger");
      const {messenger, messengerEmitter} = Messenger;
      this._messenger = messenger;
      this._messengerEmitter = messengerEmitter;
      this._canConnect = true;
      this._connectionStatus = STATUS.CONNECTING;
    }

    _connect = (authToken, eventCallback, connectionCallback) => {
      this._messenger.connect(authToken, MESSENGER_MESSAGE_EVENT, MESSENGER_CONNECT_EVENT);
      this._addConnectionListener(eventCallback, connectionCallback);
    }

    _addConnectionListener = (eventCallback, connectionCallback) => {
      this._messengerEmitter.addListener(MESSENGER_CONNECT_EVENT, (event) => {

        const {status} = event;
        switch(status) {
          case "CONNECTED":
            this._connectionStatus = STATUS.CONNECTED;
            this._addEventListener(eventCallback);
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

    _send = (message) => {
      if(this._connectionStatus === STATUS.CONNECTED) {
        this._messenger.sendMessage(message);
        return true;
      }
      return false;
    }

    _disconnect = () => {
      switch(this._connectionStatus) {
        case STATUS.CONNECTED:
        case STATUS.CONNECTING:
          this._messenger.disconnect();
          break;
      }
    }

    _isConnected = () => {
      return STATUS.CONNECTED === this._connectionStatus;
    }

    componentWillUnmount() {
      this._disconnect();
    }

    render() {
      return <WrappedComponent
                messenger={
                  {
                    isConnected: this._isConnected,
                    connect: this._connect,
                    disconnect: this._disconnect,
                    send: this._send
                  }
                }
                {...this.props}
                />;
    }
  }
}

export default withMessenger;
