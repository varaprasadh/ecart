import React, { Component } from 'react'
import { View,StatusBar,StyleSheet } from 'react-native'

export class Wrapper extends Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <View style={[styles.container,{flex:1,paddingTop:StatusBar.currentHeight}]}>
               {this.props.children}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor: "#130f40"
    }
})

export default Wrapper
