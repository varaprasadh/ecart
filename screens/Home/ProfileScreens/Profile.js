//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableWithoutFeedback} from 'react-native';
import Header from "../../major_components/Header";
import Wrapper from '../Wrapper';

import {Ionicons} from "@expo/vector-icons";

// write a function to logout


class Profile extends Component {
   constructor(props){
       super(props);
       this.state={

       }
       this.logout=this.logout.bind(this);
   } 
   componentDidMount(){
    //  this.props.navigation.push("OrderHistory");
   }

   logout(){
    //clear data and redirect to login screen
   }
    render() {
        return (
            <Wrapper>
               <View style={{marginTop:-10}}>
                    {/* <Header title="Profile"/> */}
                    <View style={styles.profileDataContainer}>
                        <Image style={styles.pro_Icon} source={require("./images/boy.png")}/>
                        <View style={styles.details}>
                            <View style={styles.jrow}>
                               <Ionicons name="ios-person" size={25} color="#27ae60"/>
                               <Text style={styles.name}>john doe</Text>
                            </View>
                            <View style={styles.jrow}>
                               <Ionicons name="ios-call" size={25} color="#27ae60"/>
                               <Text style={styles.mobile}>9988773344</Text>
                            </View>
                            <View style={styles.jrow}>
                               <Ionicons name="ios-mail" size={25} color="#27ae60"/>
                               <Text style={styles.email}>johndoen@test.com</Text>
                            </View>
                        </View>
                        </View>
                        <View>
                        {/* <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("EditProfile")} >
                            <View style={[styles.row]}>
                                <Image source={require("./images/Icon_Edit-Profile.png")}/>
                                <Text style={styles.btn_text}>Edit Profile</Text>
                            </View>
                        </TouchableWithoutFeedback> */}
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("ShippingAddress")} >
                            <View style={[styles.row]}>
                                <Image source={require("./images/Icon_Location.png")}/>
                                <Text style={styles.btn_text} >Shipping Adress</Text>  
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("OrderHistory")}>
                            <View style={[styles.row]}>
                                <Image source={require("./images/Icon_History.png")}/>
                                <Text style={styles.btn_text} >Order History</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.logout} >
                            <View style={[styles.row]}>
                                <Image source={require("./images/Icon_Exit.png")}/>
                                <Text style={styles.btn_text} >Logout</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        </View>
                    </View>
            </Wrapper>   
        );
    }
}

// define your styles
const styles = StyleSheet.create({
 
     profileDataContainer:{
        flexDirection:"row",
        borderBottomWidth:2,
        borderBottomColor:"#7f8c8d",
     }
    ,
    pro_Icon:{
        width:150,
        height:150,
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10
    },
    jrow:{
        flexDirection:"row",
        alignItems:"center"
    },
    btn_text:{
        fontSize:18,
        paddingVertical:15,
        marginLeft:20
    },
    details:{
        alignSelf:"flex-start",
        paddingVertical:20,
        paddingHorizontal:10,
       
    },
    name:{
     fontSize:20,
     marginBottom:10,
     paddingHorizontal:10,
     color:"#2980b9"
   },
    email:{
      fontSize:16,
      paddingVertical:2,
      paddingHorizontal:10

    },
    mobile:{
      fontSize:16,
      paddingVertical:2,
      paddingHorizontal:10
    }

});


export default Profile;
