import React from 'react';
import { StyleSheet } from 'react-native';

export const APPBAR = {
  headerStyle: {
    color: "#FFFFFF",
    backgroundColor: "#00A1E9"
  },
  headerTintColor: "#FFFFFF"
}

export const styles = StyleSheet.create({
  releaseContainer: {
    fontSize: 12
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    padding: 10
  },
  horizontalLineNoPadding: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%'
  },
  boldText: {
    fontWeight: 'bold'
  }
});
