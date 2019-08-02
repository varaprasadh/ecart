import React, { Component } from 'react'
import { View,StatusBar } from 'react-native'

export class Wrapper extends Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <View style={{flex:1,paddingTop:StatusBar.currentHeight+10}}>
               {this.props.children}
            </View>
        )
    }
}

export default Wrapper
