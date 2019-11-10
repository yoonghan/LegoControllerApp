import React from 'react';
import {
  View,
} from 'react-native';
import {styles} from "../util/style";

const HorizontalLine: () => React$Node = ({children}) => {
  return (
    <View style={styles.horizontalLine}/>
  )
}

export default HorizontalLine;
