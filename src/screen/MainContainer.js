import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import NavigationScreens from "./navigation";
import NavigationBar from "../component/NavigationBar";

const MainContainer = createAppContainer(NavigationBar(NavigationScreens));

export default MainContainer;
