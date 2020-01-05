import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CreateScreen } from "../../../component/NavigationBar";
import { APPBAR } from "../../../util/style";
import { translate } from "../../../util/tools";

//Logout Navigation
import Logout from "../Logout";

//Setting Navigation
import Setting from "../Setting";
import Setting_About from "../Setting/About";
import Setting_Language from "../../unauthorized/Language";
const _settingScreen = CreateScreen(Setting, translate("Settings"), true);
const _settingAboutScreen = CreateScreen(Setting_About, translate("About"), false);
const _settingLanguageScreen = CreateScreen(Setting_Language, translate("Language"), false);
const _settingLogoutScreen = CreateScreen(Logout, translate("Logout"), false);
const Setting_StackNavigation = createStackNavigator(
  {
    ..._settingScreen,
    ..._settingAboutScreen,
    ..._settingLanguageScreen,
    ..._settingLogoutScreen
  },
  {
    transitionConfig: () => fromRight(),
  }
);

//Introduction Navigation
import Introduction from "../Introduction";
const Introduction_StackNavigation = createStackNavigator(CreateScreen(Introduction, translate("Introduction"), true));

//Lego NavigationBar
import LegoController from "../LegoController";
const LegoController_StackNavigation = createStackNavigator(CreateScreen(LegoController, translate("LegoController"), true));

const NavigationScreens = {
  Introduction: {
    screen: Introduction_StackNavigation,
    navigationOptions: {
      drawerLabel: translate('Introduction'),
      drawerIcon: ({ tintColor }) => (
        <Icon
          name={"rocket"}
        />
      ),
    }
  },
  LegoController: {
    screen: LegoController_StackNavigation
  },
  Settings: {
    screen: Setting_StackNavigation
  }
};

export default NavigationScreens;
