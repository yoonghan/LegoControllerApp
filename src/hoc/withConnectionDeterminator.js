"use strict"

import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Loading from "../component/Loading";
import produce from "immer";

export const STATUS = {
  CONNECTING: 0,
  CONNECTED: 1,
  DISCONNECTED: 2
}

const withConnectionDeterminator = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      console.log("Added withConnectionDeterminator");
      this.state = {
        status: STATUS.CONNECTING
      };
    }

    componentDidMount() {
      this._checkConnectivity();
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    _changeConnection = (isConnected) => {
      let nextState = produce(this.state, draftState => {
        draftState.status = isConnected? STATUS.CONNECTED: STATUS.DISCONNECTED;
      });
      this.setState(nextState);
    }

    _checkConnectivity = () => {
      const unsubscribe = NetInfo.addEventListener(state => {
        this._changeConnection(state.isConnected);
      });
      this.unsubscribe = unsubscribe;
    };

    render() {
      const {status} = this.state;

      switch(status) {
        case STATUS.CONNECTING:
          return <Loading/>;
          break;
        case STATUS.CONNECTED:
          return <WrappedComponent {...this.props}/>;
          break;
        default:
          return <View><Text>Disconnected</Text></View>
      }
      // return <WrappedComponent
      //           messenger={
      //             {
      //               isConnected: this._isConnected,
      //               connect: this._connect,
      //               disconnect: this._disconnect,
      //               send: this._send
      //             }
      //           }
      //           {...this.props}
      //           />;
    }
  }
}

export default withConnectionDeterminator;
