import React, {useState, useEffect} from 'react';
import { compose } from 'redux'
import { Text } from 'react-native';
import produce from "immer";
import withConnectionDeterminator from "../../hoc/withConnectionDeterminator";
import withMessenger, {STATUS} from "../../hoc/withMessenger";
import { GiftedChat } from 'react-native-gifted-chat';

class LegoController extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: "s0",
          text: 'Establishing connection',
          createdAt: new Date(),
          system: true
        }
      ],
      counter: 0
    };
  }

  _onEventReceived = (event) => {
    const {message} = event;
    this._updateMessage(JSON.parse(message).message);
  }

  _onConnectionStatusReceived = (status) => {
    switch (status) {
      case STATUS.CONNECTED:
        this._updateMessage("Connected", true);
        break;
      case STATUS.DISCONNECTED:
        this._updateMessage("Disconnected", true);
        break;
      default:
    }
  }

  _updateSentMessage = (message) => {
    const {send} = this.props.messenger;
    if(send(message[0].text)) {
      const nextState = produce(this.state, draftState => {
          draftState.messages = GiftedChat.append(this.state.messages, message);
      });
      this.setState(nextState);
    }
    else {
      this._updateMessage("Message sent failed!", true);
      return;
    }
  }

  _updateMessage = (message, isSystemMessage) => {
    const nextState = produce(this.state, draftState => {
      const {counter, messages} = this.state;
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

      console.log("DONE");
      const updatedMessages = [messageGift];
      draftState.messages = GiftedChat.append(messages, updatedMessages);
      draftState.counter = updatedCounter;
    });
    console.log("UPDATED");
    this.setState(nextState);
  }

  componentDidMount() {
    const self = this;
    //setTimeout(() => {
      self.props.messenger.connect(self._onEventReceived, self._onConnectionStatusReceived);
    //}, 500);
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <GiftedChat
        multiline={false}
        messages={this.state.messages}
        onSend={this._updateSentMessage}
        renderLoading={()=><Text>Hello</Text>}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

const LegoControllerWithMessenger = compose(
  withConnectionDeterminator,
  withMessenger
)(LegoController);


LegoControllerWithMessenger.navigationOptions = {
  drawerLabel: 'Playtime',
  drawerIcon: ({ tintColor }) => (
    <Text>Not</Text>
  ),
};

export default LegoControllerWithMessenger;
