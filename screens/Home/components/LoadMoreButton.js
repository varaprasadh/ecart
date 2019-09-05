import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';

class LoadMoreButton extends Component {
 
  render() {
    return (
        <View style={{alignItems:"center"}}>
          <TouchableOpacity 
           onPress={()=>this.props.onPress()}
          >
             <Text style={styles.load}>{this.props.loading?"Loading...":"Load More"}</Text>
          </TouchableOpacity>  
        </View>
    );
  }
}
const styles = StyleSheet.create({
    load:{
        fontWeight:"bold",
        color:"white",
        backgroundColor:"#2980b9",
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
        marginVertical:5
    }
});

export default LoadMoreButton;
