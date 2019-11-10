import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import DrawerSidebar from "./DrawerSidebar";

const DrawerNavigator = (screens) => createDrawerNavigator(
  screens,
  {
    contentComponent: DrawerSidebar
  }
);

export default DrawerNavigator;
