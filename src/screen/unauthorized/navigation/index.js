import React from 'react';
import { fromRight } from 'react-navigation-transitions';
import { createStackNavigator } from 'react-navigation-stack';
import ApplicationScreen from "../ApplicationScreen";
import LearnMore from "../LearnMore";
import OpenScreen from "../OpenScreen";
import Language from "../Language";
import InstructionFirstLogin from "../InstructionFirstLogin";
import QRCodeScreen from "../QRCodeScreen";
import {APPBAR} from "../../../util/style";
import { translate } from "../../../util/tools";

function generateNavigationScreen() {

  const NavigationScreens = {
    OpenScreen: {
      screen: OpenScreen,
      navigationOptions: {
        header: null
      }
    },
    ApplicationScreen: {
      screen: ApplicationScreen,
      navigationOptions: {
        title: translate("Register"),
        ...APPBAR
      }
    },
    Language: {
      screen: Language,
      navigationOptions: {
        title: translate("Language"),
        ...APPBAR
      }
    },
    LearnMore: {
      screen: LearnMore,
      navigationOptions: {
        title: translate("Learn More"),
        ...APPBAR
      }
    },
    InstructionFirstLogin: {
      screen: InstructionFirstLogin,
      navigationOptions: {
        header: null
      }
    },
    QRScreen: {
      screen: QRCodeScreen,
    }
  };

  return NavigationScreens;
}

export default generateNavigationScreen;
