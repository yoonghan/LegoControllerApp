'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {compose} from "redux";
import {connect} from "react-redux";
import QRCode from 'react-native-qrcode-svg';
import * as QRRegistrationAction from "../../../redux/action/QRRegistrationAction";
import moment from 'moment';

const QrType2 = ({qrState}) => {
  const {info} = qrState;
  const infoInJson = JSON.parse(info);
  const {first_name, last_name, mobileno, postal_code, gen_date} = infoInJson;
  const result = JSON.stringify(
    {
      first_name,
      last_name,
      mobileno,
      postal_code,
      gen_date,
      scan_date: moment()
          .utcOffset('+08:00')
          .format('YYYY-MM-DD hh:mm:ss a')
    });
  return (
    <View style={styles.container}>
      <View style={styles.qrcontainer}>
        <Text>{result}</Text>
        <Text>--------</Text>
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
