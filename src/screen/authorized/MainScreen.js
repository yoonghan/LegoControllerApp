import React from 'react';
import { createAppContainer } from 'react-navigation';
import generateNavigationScreen from "./navigation";
import NavigationBar from "../../component/NavigationBar";

const MainScreen = createAppContainer(NavigationBar(generateNavigationScreen()));

export default MainScreen;
