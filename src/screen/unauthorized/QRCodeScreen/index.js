import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import QrType1 from "./QrType1";
import QrType2 from "./QrType2";
import QrType3 from "./QrType3";
import { translate } from "../../../util/tools";
import Icon from 'react-native-vector-icons/FontAwesome';

const TabNavigator = createBottomTabNavigator({
  QrType1: {
    screen: QrType1,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon size={ 20 } name={ 'lock' } color={ tintColor }/>,
      tabBarLabel: translate("unauthorized.qrcodescreen.type1")
    }
  },
  QrType2: {
    screen: QrType2,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon size={ 20 } name={ 'eye' } color={ tintColor }/>,
      tabBarLabel: translate("unauthorized.qrcodescreen.type2")
    }
  },
  QrType3: {
    screen: QrType3,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon size={ 20 } name={ 'search' } color={ tintColor }/>,
      tabBarLabel: translate("unauthorized.qrcodescreen.type3")
    }
  }
});

export default createAppContainer(TabNavigator);
