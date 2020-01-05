import React from 'react';
import { createAppContainer } from 'react-navigation';
import NavigationScreens from "./navigation";
import NavigationBar from "../../component/NavigationBar";

const MainScreen = createAppContainer(NavigationBar(NavigationScreens));

export default MainScreen;
