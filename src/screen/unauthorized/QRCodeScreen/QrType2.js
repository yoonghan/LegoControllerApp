'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {compose} from "redux";
import {connect} from "react-redux";
import QRCode from 'react-native-qrcode-svg';
import * as QRRegistrationAction from "../../../redux/action/QRRegistrationAction";

const QrType2 = ({qrState}) => {
  const {info} = qrState;
  const infoInJson = JSON.parse(info);
  const {first_name, last_name, mobileno} = infoInJson;
  const result = JSON.stringify({first_name, last_name, mobileno});
  return (
    <View style={styles.container}>
      <View style={styles.qrcontainer}>
        <Text>*{result}*</Text>
        <QRCode
          value={result}
          size={300}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  qrcontainer: {
    flexGrow:1,
    alignItems: 'center',
    justifyContent:'center'
  }
});

export default compose(
  connect(QRRegistrationAction.mapStateToProps, QRRegistrationAction.mapDispatchToProps)
)(QrType2);
