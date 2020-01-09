import React from 'react';
import { fromRight } from 'react-navigation-transitions';
import LearnMore from "../LearnMore";
import OpenScreen from "../OpenScreen";
import Language from "../Language";
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
    }
  };

  return NavigationScreens;
}

export default generateNavigationScreen;
