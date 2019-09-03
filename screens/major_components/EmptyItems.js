import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity} from 'react-native'
import {Ionicons} from "@expo/vector-icons";
import Wrapper from '../Home/Wrapper';

export class EmptyItems extends Component {
    render() {
        return (
            <Wrapper noBackground>
                <View style={{flex:1}}>
                    <View style={styles.container}>
                        <Ionicons name={this.props.icon||"ios-nutrition"} size={50} color="#2ecc71"/>
                        <Text style={styles.text}>{this.props.message||"404 not found"}</Text>
                        {this.props.children}
                    </View>
            </View>
           </Wrapper>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:"center",
    },
    text:{
        fontWeight:"bold",
        fontSize:20,
        color: "#fff"
    },
    
})

export default EmptyItems
