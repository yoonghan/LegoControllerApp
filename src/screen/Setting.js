import React from 'react';
import {
  View,
  Text
} from 'react-native';
import Frame from "../component/Frame";

import { VERSION } from "../util/const";
import { styles } from "../util/style";

const Setting: () => React$Node = () => {
  return (
    <Frame>
      <View>
      </View>
      <Text style={styles.releaseContainer}> ────── Release {VERSION} ────── </Text>
    </Frame>
  );
}

Setting.navigationOptions = {
  drawerLabel: 'Notifications',
  drawerIcon: ({ tintColor }) => (
    <Text>Not</Text>
  ),
};

export default Setting;
