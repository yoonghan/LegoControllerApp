import React from 'react';
import {
  View,
} from 'react-native';
import {styles} from "../util/style";

const HorizontalLine: () => React$Node = (props) => {
  return (
    <View style={props.noPadding?styles.horizontalLineNoPadding: styles.horizontalLine}/>
  )
}

export default HorizontalLine;
