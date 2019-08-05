import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {createStackNavigator} from "react-navigation";
import Explore from "./Explore";
import CategoryMain from "./CategoryMain";
import ProductMain from './ProductMain';

const ExplorStack =createStackNavigator({
    ExploreMain:Explore,
    ExploreCategory:CategoryMain,
    ExploreProduct:ProductMain
},{
    // initialRouteName:"ExploreCategory",
    headerMode:"none"
});

export default ExplorStack;
