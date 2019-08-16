import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {createStackNavigator} from "react-navigation";
import Explore from "./Explore";
import ProductMain from './ProductMain';
import SearchResult from "./SearchResult";
import ProductResult from "./ProductResult";
const ExplorStack =createStackNavigator({
    ExploreMain:Explore,
    ExploreProduct:ProductMain,
    SearchResult: SearchResult,
    ProductResult:ProductResult
},{
    // initialRouteName:"ExploreCategory",
    headerMode:"none"
});

export default ExplorStack;
