'use strict';

import React, { Component } from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as QRRegistrationAction from "../../../redux/action/QRRegistrationAction";

const ScanQRScreen = ({qrState}) => {

  const buildInfo = () => {
    const {info} = qrState;
    const infoInJson = JSON.parse(info);
    const {first_name, last_name, mobileno} = infoInJson;
    const eName = encodeURI((first_name||"") + (last_name||""));
    const eMobileNo = encodeURI(mobileno);
    return `?name=${eName}&mobile_no=${eMobileNo}`;
  }

  const onSuccess = e => {
    console.warn(buildInfo());
    Linking.openURL(e.data+buildInfo()).catch(err =>
      console.error('An error occured', err)
    );
  };

  return (
    <QRCodeScanner
        onRead={onSuccess}
        topContent={
          <Text style={styles.centerText}>
            Scan and fill in the form
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default compose(
  connect(QRRegistrationAction.mapStateToProps, QRRegistrationAction.mapDispatchToProps)
)(ScanQRScreen);
