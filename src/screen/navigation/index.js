import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {CreateScreen} from "../../component/NavigationBar";

//Setting Navigation
import Setting from "../Setting";
const Setting_StackNavigation = createStackNavigator(CreateScreen(Setting, "Setting"));

//Introduction Navigation
import Introduction from "../Introduction";
const Introduction_StackNavigation = createStackNavigator(CreateScreen(Introduction, "Introduction"));

const NavigationScreens = {
  Settings: {
    screen: Setting_StackNavigation
  },
  Introduction: {
    screen: Introduction_StackNavigation
  },
};

export default NavigationScreens;
