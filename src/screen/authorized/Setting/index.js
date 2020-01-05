'use strict';

import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet
}
from 'react-native';
import Frame from "../../../component/Frame";
import { styles } from "../../../util/style";
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import HorizontalLine from "../../../component/HorizontalLine";

const onPressAction = (navigation, key) => () => {
  navigation.navigate(key);
}

const Setting: () => React$Node = (props) => {
  return (
    <View style={settingsStyles.container}>
    {
      [
        {key: 'Language', icon: "language"},
        {key: 'About', icon: "account-circle"},
        {key: '', icon: ""},
        {key: 'Logout', icon: "sign-out"}
      ].map((item, i) => {
        if(item.key === "Logout") {
          return (
            <ListItem
              key={i}
              title={ item.key }
              leftIcon={{ name: item.icon, type:"font-awesome", color: '#CC5555' }}
              bottomDivider
              onPress={ onPressAction(props.navigation, item.key) }
              titleStyle={{ color: '#CC5555', fontWeight: 'bold' }}
            />
          );
        }
        if(item.key === "") {
          return (
            <ListItem
              key={i}
              title={ item.key }
              bottomDivider
            />
          )
        }
        else {
          return (
            <ListItem
              key={i}
              title={ item.key }
              leftIcon={{ name: item.icon }}
              bottomDivider
              chevron
              onPress={ onPressAction(props.navigation, item.key) }
            />
          );
        }
      })
    }
    </View>
  );
}

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    width: "100%"
  },
  itemTitle: {
    fontSize: 20,
    padding: 20,
    textAlign: "left"
  },
})

Setting.navigationOptions = {
  drawerLabel: 'Notifications',
  drawerIcon: ({ tintColor }) => (
    <Text>Not</Text>
  ),
};

export default Setting;
