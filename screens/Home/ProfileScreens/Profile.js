//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableWithoutFeedback} from 'react-native';
import Header from "../../major_components/Header";
import Wrapper from '../Wrapper';

import {Ionicons} from "@expo/vector-icons";

import {connect} from "react-redux";
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
               <View style={{marginTop:-10,flex:1}}>
                    {/* <Header title="Profile"/> */}
                    <View style={styles.profileDataContainer}>
                        <Image style={styles.pro_Icon} source={require("./images/boy.png")}/>
                        <View style={styles.details}>
                            <View style={[styles.jrow,{backgroundColor:"#2980b9"}]}>
                               <Ionicons color="#ecf0f1" name="ios-person" size={25} />
                               <Text style={styles.name}>{this.props.name}</Text>
                            </View>
                            <View style={[styles.jrow,{backgroundColor:"#2980b9"}]}>
                               <Ionicons color="#ecf0f1" name="ios-call" size={25} />
                               <Text style={styles.mobile}>{this.props.mobile}</Text>
                            </View>
                            <View style={[styles.jrow,{backgroundColor:"#2980b9"}]}>
                               <Ionicons color="#ecf0f1" name="ios-mail" size={25} />
                               <Text style={styles.email}>{this.props.email}</Text>
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
                        {/* <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("ShippingAddress")} >
                            <View style={[styles.row]}>
                                <Image source={require("./images/Icon_Location.png")}/>
                                <Text style={styles.btn_text} >Shipping Adress</Text>  
                            </View>
                        </TouchableWithoutFeedback> */}
                        
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("OrderHistory")}>
                            <View style={[styles.row]}>
                                <Image source={require("./images/Icon_History.png")}/>
                                <Text style={styles.btn_text} >My Orders</Text>
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
        alignItems:"center",
        borderRadius:10,
        paddingHorizontal: 5,
        marginVertical:3,
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
        flex:1
       
    },

    name:{
     alignSelf:"stretch",
     paddingHorizontal:10,
     color:"#fff",
     paddingVertical:5,
   },
    email:{
      flex:1,
      flexDirection:"row",
      flexWrap:"wrap",
      paddingVertical:2,
      paddingHorizontal:10,
      color: "#fff",
    },
    mobile:{
      flex:1,
      alignSelf:"stretch",
      flexDirection:"row",
      flexWrap:"wrap",
      paddingVertical:2,
      paddingHorizontal:10,
      color: "#fff",
    }

});

mapState=state=>{
    console.log(state);
    let {Addition}=state;
    let {profile}=Addition;
    return {
        name:profile.name,
        mobile:profile.mobile,
        email:profile.email
    }
}

export default connect(mapState)(Profile);
