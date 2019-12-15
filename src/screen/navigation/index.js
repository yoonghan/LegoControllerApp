import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {CreateScreen} from "../../component/NavigationBar";

//Setting Navigation
import Setting from "../Setting";
const Setting_StackNavigation = createStackNavigator(CreateScreen(Setting, "Setting"));

//Introduction Navigation
import Introduction from "../Introduction";
const Introduction_StackNavigation = createStackNavigator(CreateScreen(Introduction, "Introduction"));

//Lego NavigationBar
import LegoController from "../LegoController";
const LegoController_StackNavigation = createStackNavigator(CreateScreen(LegoController, "LegoController"));

//Logout Navigation
import Logout from "../Logout";

const NavigationScreens = {
  Introduction: {
    screen: Introduction_StackNavigation
  },
  LegoController: {
    screen: LegoController_StackNavigation
  },
  Settings: {
    screen: Setting_StackNavigation
  },
  Logout: {
    screen: Logout
  }
};

export default NavigationScreens;
