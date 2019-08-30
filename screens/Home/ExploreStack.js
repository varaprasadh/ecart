import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {createStackNavigator,createDrawerNavigator} from "react-navigation";
import Explore from "./Explore";
import ProductMain from './ProductMain';
import SearchResult from "./SearchResult";
import Drawer from "./Drawer";

const ExplorStackRAW =createStackNavigator({
    ExploreMain:Explore,
    // ExploreProduct:ProductMain,
    // SearchResult: SearchResult,
},{
    // initialRouteName:"ExploreCategory",
    headerMode:"none"
});
  

const ExplorStack=createDrawerNavigator({
   ExplorStackRAW
},{
    initialRouteName: 'ExplorStackRAW',
    contentComponent:Drawer,
    hideStatusBar: true,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
});

export default ExplorStack;
