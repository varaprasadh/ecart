import React, { Component } from 'react'
import { Text, View,StyleSheet,Image,TouchableOpacity} from 'react-native'
import Wrapper from '../Home/Wrapper';

export class CheckoutStatus extends Component {
    constructor(props){
        super(props);  
    }
    render() {
        return (
           <Wrapper noBackground>
               <View style={styles.container}>
                  <View style={styles.card}>
                      <Image style={styles.img} source={this.props.status?require("./icons/checkmark.gif"):require("./icons/error.png")}/>
                      <Text style={this.props.status?styles.done:styles.failed}>
                         {this.props.status?"Order placed Successfully":"something went wrong"}
                      </Text>
                      <TouchableOpacity 
                        style={[styles.btn,this.props.status?{backgroundColor:"#27ae60"}:{backgroundColor:"#e74c3c"}]}
                        onPress={this.props.onContinue}
                        >
                          <Text style={styles.cont_text}>{this.props.status?"Continue Shopping":"Try again Later"}</Text>
                      </TouchableOpacity>
                  </View>
               </View>
           </Wrapper>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        paddingHorizontal:10,
        paddingVertical:10,
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    card:{
      alignItems:"center"
    },
    img:{
        height:100,
        width:100,
        marginBottom:10
    },
    failed:{
      fontSize:20,
      fontWeight:"bold",
      color: "#e74c3c"
    },
    done:{
     fontSize: 20,
     fontWeight: "bold",
     color: "#27ae60"
    },
    btn:{
        backgroundColor: "#27ae60",
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:5,
        marginTop:20
    },
    cont_text:{
       color:"#fff",
       fontWeight:"bold",
       fontSize:20
    }
})

export default CheckoutStatus
