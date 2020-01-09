import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import generateNavigationScreen from "./navigation";

const MainScreen = createAppContainer(createStackNavigator(generateNavigationScreen()));

export default MainScreen;
