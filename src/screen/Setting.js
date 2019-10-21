import React from 'react';
import {
  View,
  Text
} from 'react-native';

import { VERSION } from "../util/const";
import { styles } from "../util/style";

const Setting: () => React$Node = () => {
  return (
    <View>
      <Text>This is Setting</Text>
      <Text style={styles.releaseContainer}>Release {VERSION}</Text>
    </View>
  );
}

Setting.navigationOptions = {
  drawerLabel: 'Notifications',
  drawerIcon: ({ tintColor }) => (
    <Text>Not</Text>
  ),
};

export default Setting;
