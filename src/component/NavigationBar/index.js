import React from 'react';
import {Platform} from 'react-native';

import DrawerButton from "./DrawerButton";
import TabNavigator from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";

import { APPBAR } from "../../util/style";

const Navigation = (Platform.OS === 'ios'? TabNavigator: DrawerNavigator);

export const CreateScreen = (component, title) => {
  return {
    title: {
      screen: component,
      navigationOptions: createNavigation(title)
    }
  };
}

const createNavigation = (title) => ({navigation}) => {
  const navigationOpt = APPBAR;
  navigationOpt["title"] = title;
  if(Platform.OS !== 'ios') {
    navigationOpt["headerLeft"] = <DrawerButton navigation={navigation}/>;
  }
  return navigationOpt;
}


export default Navigation;
