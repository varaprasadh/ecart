import React, { Component } from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class Header extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
              <View style={styles.row}>
               {this.props.backbutton?( <TouchableWithoutFeedback onPress={this.props.backHandler} 
                style={{flex:1,paddingRight:20}}>
               <Ionicons name="ios-arrow-back" size={25} color="#fff"/> 
               </TouchableWithoutFeedback>):(null)
               } 

               <Text style={{fontSize:18,flex:3,textAlign:"center",color:"#fff"}}>
                  {this.props.title}
               </Text>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#F2AA4CFF',
        height:50,
        paddingVertical:10,
        paddingHorizontal:10,
    },
    row:{
        flexDirection:"row",
        alignItems:"center"
    }
});

export default Header;
