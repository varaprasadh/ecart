import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginStack from './screens/login/LoginStack';
import { createAppContainer,createStackNavigator } from 'react-navigation';
import HomeStack from "./screens/Home/HomeStack";

const rootStack=createStackNavigator({
  LoginStack:LoginStack,
  HomeStack:HomeStack
},{
  initialRouteName:"LoginStack",
  headerMode:"none"
})

const App=createAppContainer(rootStack);

export default App;
