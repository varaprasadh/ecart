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
            <Wrapper noBackground>
               <View style={{flex:1}}>
                    {/* <Header title="Profile"/> */}
                    <View style={styles.profileDataContainer}>
                        <Image style={styles.pro_Icon} source={require("./images/avatar.gif")}/>
                        <View style={styles.details}>
                            <View style={[styles.jrow]}>
                               <Ionicons color="#ecf0f1" name="ios-person" size={25} />
                               <Text style={styles.name}>{this.props.name}</Text>
                            </View>
                            <View style={[styles.jrow]}>
                               <Ionicons color="#ecf0f1" name="ios-call" size={25} />
                               <Text style={styles.mobile}>{this.props.mobile}</Text>
                            </View>
                            <View style={[styles.jrow]}>
                               <Ionicons color="#ecf0f1" name="ios-mail" size={25} />
                               <Text style={styles.email}>{this.props.email}</Text>
                            </View>
                         </View>
                    </View>
                    <View style={styles.actions}>
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("EditProfile")} >
                            <View style={[styles.row]}>
                                <Ionicons name="ios-create" color="#fff" size={25}/>
                                <Text style={styles.btn_text}>Edit Profile</Text>
                            </View>   
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("ChangePassword")} >
                            <View style={[styles.row]}> 
                                <Ionicons name="ios-hammer" color="#fff" size={25}/>
                                <Text style={styles.btn_text} >Change Password</Text>  
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.push("OrderHistory")}>
                            <View style={[styles.row]}>
                                <Ionicons name="ios-cart" color="#fff" size={25}/>
                                <Text style={styles.btn_text} >My Orders</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.logout} >
                            <View style={[styles.row]}>
                                <Ionicons name="ios-exit" color="#fff" size={25}/>
                                <Text style={[styles.btn_text]} >Logout</Text>
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
        // flexDirection:"row",
        alignItems:"center",
        borderBottomWidth:2,
        borderBottomColor:"#7f8c8d",
        padding:10
     },
     actions:{
        // backgroundColor: "#fff"
     },
    pro_Icon:{
        width:150,
        height:150,
    }, 
    row:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        borderWidth:2,
        borderColor: "#27ae60",
        marginTop:5
        // backgroundColor:"#fff"
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
        marginLeft:20,
        color:"#fff"
    },
    details:{
        alignSelf:"flex-start",
        alignItems:"flex-start",
        paddingVertical:10,
        paddingHorizontal:10,
       
    },

    name:{
     paddingHorizontal:10,
     color:"#fff",
     paddingVertical:5,
     fontWeight:"bold"
   },
    email:{
      paddingVertical:2,
      paddingHorizontal:10,
      color: "#fff",
      fontWeight:"bold"
    },
    mobile:{
      paddingVertical:2,
      paddingHorizontal:10,
      color: "#fff",
      fontWeight:"bold"
    }
});

mapState=state=>{
    console.log(state);
    let {Addition}=state;
    let {profile}=Addition;
    return {
        name:profile.firstName+" "+profile.lastName,
        mobile:profile.mobile,
        email:profile.email
    }
}

export default connect(mapState)(Profile);
