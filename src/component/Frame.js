import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const Frame: () => React$Node = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});


export default Frame;
