import React, {useState, useEffect} from 'react';
import { compose } from "redux";
import {connect} from "react-redux";
import { Text, StyleSheet, View } from "react-native";
import produce from "immer";
import withConnectionDeterminator from "../../hoc/withConnectionDeterminator";
import withMessenger, {STATUS} from "../../hoc/withMessenger";
import withConnectivity from "../../hoc/withConnectivity";
import { GiftedChat, Send } from 'react-native-gifted-chat';
import * as TranslationAction from "../../redux/action/TranslationAction";

const enumStatus = {
  NULL: 0,
  INIT: 1,
  INIT_TOKEN: 2,
  INIT_CONNECT: 3,
  COMPLETE: 4,
  INIT_DISCONNECT: 5,
  DISCONNECTED: 6
}

const LegoController = ({translationState, tokenApi, messenger}) => {
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
        changeConnectionStatus(enumStatus.COMPLETE);
        break;
      case STATUS.DISCONNECTED:
        updateMessage("Disconnected", true);
        changeConnectionStatus(enumStatus.DISCONNECTED);
        break;
      default:
    }
  }

  function renderSend(props) {
    switch(connectionStatus) {
      case enumStatus.COMPLETE:
        return (<Send
            {...props}
        />);
      case enumStatus.DISCONNECTED:
        return (
          <View style={styles.container}>
            <Text style={styles.text}>{translationState.translate("FAILED")}</Text>
          </View>
        )
      default:
        return (
          <View style={styles.container}>
            <Text style={styles.text}>{translationState.translate("LOADING")}.. </Text>
          </View>
        );
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
        break;
      default:
    }
  }, [connectionStatus]);

  return (
    <GiftedChat
      multiline={false}
      messages={messages}
      onSend={updateSentMessage}
      isLoadingEarlier={true}
      scrollToBottom={true}
      user={{
        _id: 1,
      }}
      placeholder={translationState.translate("TypeaMessage")}
      renderSend = {renderSend}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
  },
  text: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
})

const mapTokenApi = (result) => ({tokenApi: result});

const LegoControllerWithMessenger = compose(
  withConnectionDeterminator,
  withConnectivity(mapTokenApi, {})("https://www.walcron.com/api/manipulator"),
  withMessenger,
  connect(TranslationAction.mapStateToProps, TranslationAction.mapDispatchToProps)
)(LegoController);

export default LegoControllerWithMessenger;
