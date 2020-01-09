import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CreateScreen } from "../../../component/NavigationBar";
import { APPBAR } from "../../../util/style";

//Logout Navigation
import Logout from "../Logout";

//Setting Navigation
import Setting from "../Setting";
import Setting_About from "../Setting/About";
import Setting_Language from "../../unauthorized/Language";

//Introduction Navigation
import Introduction from "../Introduction";
import LegoController from "../LegoController";

//Created as function to rerender translated messages
function generateNavigationScreen() {
  const _settingScreen = CreateScreen(Setting, "Settings", true);
  const _settingAboutScreen = CreateScreen(Setting_About, "About", false);
  const _settingLanguageScreen = CreateScreen(Setting_Language, "Language", false);
  const _settingLogoutScreen = CreateScreen(Logout, "Logout", false);
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

  const Introduction_StackNavigation = createStackNavigator(CreateScreen(Introduction, "Introduction", true));

  //Lego NavigationBar
  const LegoController_StackNavigation = createStackNavigator(CreateScreen(LegoController, "LegoController", true));

  const NavigationScreens = {
    Introduction: {
      screen: Introduction_StackNavigation,
      navigationOptions: {
        drawerLabel: "Introduction",
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

  return NavigationScreens;
}

export default generateNavigationScreen;
