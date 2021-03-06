import React, { Component } from 'react'
import { View,StatusBar,StyleSheet,ImageBackground,Platform,SafeAreaView } from 'react-native'

export class Wrapper extends Component {
    constructor(props){
        super(props);
        
    }
    render() { 
        return (
            <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
            {
            Platform.OS == "ios" ?
                <SafeAreaView style={[{flex:1}]}>
                   <View style={[{flex:1,paddingTop:10},{...!this.props.noBackground?{backgroundColor: "#F2AA4CFF"}:{}}]}>
                      {this.props.children}
                   </View>
                </SafeAreaView>:
                <View style={[{flex:1,paddingTop:StatusBar.currentHeight},{...!this.props.noBackground?{backgroundColor: "#F2AA4CFF"}:{}}]}>
                   {this.props.children}
                </View>
            }
            </ImageBackground>
        )
    }
}

export default Wrapper
