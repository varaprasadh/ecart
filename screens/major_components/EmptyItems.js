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
                        <TouchableOpacity
                          onPress={()=>this.props.handler()}
                        >
                          <Text style={styles.retry}>Retry</Text>
                        </TouchableOpacity> 
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
    retry:{
        margin:10,
        paddingHorizontal:30,
        paddingVertical:10,
        backgroundColor: "#e74c3c",
        color:"#fff"
    }
})

export default EmptyItems
