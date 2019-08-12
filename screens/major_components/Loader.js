import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems:"center"}}>
           <Image source={require("../../assets/icons/icon144.png")}/> 
           <Text style={styles.text}>please wait ...</Text>
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
     container:{
         justifyContent:"center",
         top:0,
         right:0,
         bottom:0,
         left:0,
         position:"absolute",
         backgroundColor: "#fff",
         zIndex:99
     },
     text:{
         fontWeight:"bold",
         color: "#27ae60",
         fontSize:20
     }
})

export default Loader;
