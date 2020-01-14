import React, {useState, useEffect} from 'react';
import { compose } from 'redux'
import { Text } from 'react-native';
import produce from "immer";
import withConnectionDeterminator from "../../hoc/withConnectionDeterminator";
import withMessenger, {STATUS} from "../../hoc/withMessenger";
import withConnectivity from "../../hoc/withConnectivity";
import { GiftedChat } from 'react-native-gifted-chat';

const enumStatus = {
  NULL: 0,
  INIT: 1,
  INIT_TOKEN: 2,
  INIT_CONNECT: 3,
  X:9,
  COMPLETE: 4,
  INIT_DISCONNECT: 5
}

const LegoController = ({tokenApi, messenger}) => {
  const [messages, setMessages] = useState(
    [
      {
        _id: "s0",
        text: 'Establishing connection',
        createdAt: new Date(),
        system: true
      }
    ]
  );
  const [counter, setCounter] = useState(0);
  const [connectionStatus, changeConnectionStatus] = React.useState(enumStatus.NULL);
  const [tokenCodegenAsChannelId, changeTokenCodeGen] = React.useState("");

  function updateMessage(message, isSystemMessage) {
    const updatedCounter = counter + 1;
    let messageGift = {};
    if(isSystemMessage) {
      messageGift = {
        _id: `s_${updatedCounter}`,
        text: message,
        createdAt: new Date(),
        system: true,
        user: {
          _id: 1
        }
      }
    }
    else {
      messageGift = {
        _id: `u_${updatedCounter}`,
        text: message,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "O"
        }
      };
    }

    const updatedMessages = [messageGift];
    setMessages(GiftedChat.append(messages, updatedMessages));
    setCounter(updatedCounter);
  }


  function updateSentMessage(message) {
    const {send} = messenger;
    if(send(message[0].text)) {
      setMessages(GiftedChat.append(messages, message));
    }
    else {
      updateMessage("Message sent failed!", true);
      return;
    }
  }

  function onConnectionStatusReceived(status) {
    switch (status) {
      case STATUS.CONNECTED:
        updateMessage("Connected", true);
        break;
      case STATUS.DISCONNECTED:
        updateMessage("Disconnected", true);
        break;
      default:
    }
  }

  function onEventReceived(event) {
    const {message} = event;
    updateMessage(JSON.parse(message).message);
  }

  function getToken(tokenApi) {
    if(!tokenApi.isLoading) {
      tokenApi.connect(undefined, "Unable to get key", 'GET');
    }
  }

  function displayLoading() {
    return <React.Fragment/>;
  }

  React.useEffect(() => {
    if(!tokenApi.isLoading && Object.keys(tokenApi.success).length !== 0) {
      changeConnectionStatus(enumStatus.INIT_TOKEN);
    }
    else if(tokenApi.isError){
      updateMessage("Encountered Issue Connecting", true);
      console.warn(tokenApi.error, "Error");
    }
    else if(tokenApi.isLoading) {
      updateMessage("Authenticating connection", true);
    }
  }, [tokenApi.isLoading]);

  React.useEffect(() => {
    switch(connectionStatus) {
      case enumStatus.NULL:
        changeConnectionStatus(enumStatus.INIT);
        break;
      case enumStatus.INIT:
        getToken(tokenApi);
        break;
      case enumStatus.INIT_TOKEN:
        updateMessage("Establishing connection to server", true);
        changeConnectionStatus(enumStatus.INIT_CONNECT);
        break;
      case enumStatus.INIT_CONNECT:
        messenger.connect(tokenApi.success.codegen, onEventReceived, onConnectionStatusReceived);
        changeConnectionStatus(enumStatus.COMPLETE);
        break;
      default:
    }
  }, [connectionStatus]);

  return (
    <GiftedChat
      multiline={false}
      messages={messages}
      onSend={updateSentMessage}
      renderLoading={displayLoading}
      user={{
        _id: 1,
      }}
    />
  )
}

const mapTokenApi = (result) => ({tokenApi: result});

const LegoControllerWithMessenger = compose(
  withConnectionDeterminator,
  withConnectivity(mapTokenApi, {})("https://www.walcron.com/api/manipulator"),
  withMessenger
)(LegoController);

export default LegoControllerWithMessenger;
