//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import WishList from "./WishList";
import Profile from "./Profile";
import Cart from "./Cart";

// create a component

const HomeStack =createBottomTabNavigator({
    WishList:{
      screen:WishList
    },
    Profile:{
        screen:Profile
    },
    Cart:{
        screen:Cart
    }
},{
    initialRouteName:"WishList",
    animationEnabled:true
}) 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default HomeStack;
