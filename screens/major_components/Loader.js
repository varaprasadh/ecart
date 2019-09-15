import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,ImageBackground } from 'react-native';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ImageBackground style={{width:"100%",height:"100%"}} source={require("../images/backgroundimage.jpg")}>
      <View style={styles.container}>
        <View style={{alignItems:"center"}}>
           <Image source={require("../../assets/icons/icon_cropped.png")}/> 
           <Text style={styles.text}>Loading...</Text>
        </View>
      </View>
      </ImageBackground>
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
        //  backgroundColor: "#fff",
         zIndex:99
     },
     text:{
         fontWeight:"bold",
         color: "#fff",
         fontSize:20
     }
})

export default Loader;
