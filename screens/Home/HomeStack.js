//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from 'react-navigation';
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import WishList from "./WishList"; 
import Profile from "./ProfileScreens/Profile"; 
import Cart from "./Cart";
// import Explore from "./Explore";
import ExploreStack from "./ExploreStack"
import {Ionicons} from '@expo/vector-icons'

// create a component

const HomeStack =createMaterialBottomTabNavigator({
    Explore:{
      screen:ExploreStack,
      navigationOptions: {  
        tabBarLabel: 'explore',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" color={tintColor} size={24} />
        )
      }
    },
    WishList:{
      screen:WishList, 
      navigationOptions: {  
        tabBarLabel: 'wishlist',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmark" color={tintColor} size={24} />
        )
      }  
    },
    Profile:{ 
        screen:Profile,
        navigationOptions: {  
            tabBarLabel: 'profile',
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-person" color={tintColor} size={24} />
            )
          }
    },
    Cart:{
        screen:Cart,
        navigationOptions: {  
            tabBarLabel: 'cart',
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-cart" color={tintColor} size={24} />
            )
          }
    }
},{
    initialRouteName: "Explore",
    activeTintColor: '#2ecc71',
    shifting: true,
    order:["Explore","WishList","Cart","Profile"],
    barStyle: { backgroundColor: '#fff' },
})  

export default HomeStack;
