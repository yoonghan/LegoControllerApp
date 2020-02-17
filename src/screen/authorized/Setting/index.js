'use strict';

import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  StyleSheet
}
from 'react-native';
import { Alert } from "react-native";
import {connect} from "react-redux";
import {compose} from "redux";
import auth from '@react-native-firebase/auth';
import Frame from "../../../component/Frame";
import { styles } from "../../../util/style";
import { translate } from "../../../util/tools";
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import HorizontalLine from "../../../component/HorizontalLine";
import * as LoginAction from "../../../redux/action/LoginAction";

const onPressAction = (navigation, key) => () => {
    navigation.navigate(key);
}

const Setting: () => React$Node = (props) => {
  if (props.loginState.error) {
    Alert.alert(
      translate("Error"),
      translate("Logout failed"),
      [
        {text: translate("OK")}
      ],
      {cancelable: false}
    );
  }

  return (
    <View style={settingsStyles.container}>
    {
      [
        {key: "Language", icon: "language"},
        {key: "About", icon: "account-circle"},
        {key: "", icon: ""},
        {key: "Logout", icon: "sign-out"}
      ].map((item, i) => {
        const translatedTitle = (item.key === "")? "" : translate(item.key);

        switch (item.key) {
          case "Logout":
            return (
              <ListItem
                key={i}
                title={ translatedTitle }
                leftIcon={{ name: item.icon, type:"font-awesome", color: '#CC5555' }}
                bottomDivider
                onPress={ props.signoff }
                titleStyle={{ color: '#CC5555', fontWeight: 'bold' }}
              />
            );
          case "":
            return (
              <ListItem
                key={i}
                title={ translatedTitle }
                bottomDivider
              />
            )
          default:
            return (
              <ListItem
                key={i}
                title={ translatedTitle }
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

export default compose(
  connect(LoginAction.mapStateToProps, LoginAction.mapDispatchToProps)
)(Setting);
