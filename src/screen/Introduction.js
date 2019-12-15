`use strict`

import React from 'react';
import {
  View,
  Text
} from 'react-native';

const Introduction: () => React$Node = () => {
  return (
    <View>
      <Text>This is Introduction</Text>
    </View>
  );
}

Introduction.navigationOptions = {
  drawerLabel: 'Home',
  drawerIcon: ({ tintColor }) => (
    <Text>Home</Text>
  ),
};


export default Introduction;
