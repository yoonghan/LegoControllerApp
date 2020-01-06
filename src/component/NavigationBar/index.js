import React from 'react';
import {Platform, Text} from 'react-native';

import DrawerButton from "./DrawerButton";
import TabNavigator from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";

import { APPBAR } from "../../util/style";

const Navigation = (Platform.OS === 'ios'? TabNavigator: DrawerNavigator);

export const CreateScreen = (component, title, isMain) => {
  const screenOpt = {};
  screenOpt[title] = {
    screen: component,
    navigationOptions: createNavigation(title, isMain)
  };
  return screenOpt;
}

const createNavigation = (title, isMain) => ({navigation}) => {
  const navigationOpt = {
    ...APPBAR,
    "title": title
  };
  if(title.toLowerCase() === "logout") {
    navigationOpt["header"] = null;
  }
  if(isMain && Platform.OS !== 'ios') {
    navigationOpt["headerLeft"] = <DrawerButton navigation={navigation}/>;
  }
  return navigationOpt;
}


export default Navigation;
