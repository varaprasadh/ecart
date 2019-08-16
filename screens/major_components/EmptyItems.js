import React, { Component } from 'react'
import { Text, View,StyleSheet} from 'react-native'
import {Ionicons} from "@expo/vector-icons";

export class EmptyItems extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.container}>
                   <Ionicons name={this.props.icon||"ios-nutrition"} size={50} color="#2ecc71"/>
                   <Text style={styles.text}>{this.props.message||"404 not found"}</Text>
                </View>
           </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor:"#fff"
    },
    text:{
        fontWeight:"bold",
        fontSize:20,
        color: "#95a5a6"
    }
})

export default EmptyItems
