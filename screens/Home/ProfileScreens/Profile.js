//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableWithoutFeedback,AsyncStorage} from 'react-native';
import Header from "../../major_components/Header";
import Wrapper from '../Wrapper';

import {Ionicons} from "@expo/vector-icons";

import {connect} from "react-redux";
import Loader from '../../major_components/Loader';
// write a function to logout


class Profile extends Component {
   constructor(props){
       super(props);
       this.state={

       }
   } 
   componentWillMount() {
       fetch(`${this.props.baseUrl}/profile`, {
           method: "GET",
           headers: {
               "AUTH_TOKEN": this.props.AUTH_TOKEN
           }
       }).then(res => res.json()).then(data => {
           if (data.success == true) {
               profile = data.profile;
               let obj = {
                   firstName: profile.first_name,
                   lastName: profile.last_name,
                   mobile: profile.phone_number,
                   email: profile.email,
                   address: profile.user_address
               }
               this.props.setProfile(obj);
           }
       }).catch(err => console.log(err));
   }
     
   logout(){
    this.setState({
        loading:true
    });
    fetch(`${this.props.baseUrl}/logout`,{
        method:"GET",
        headers:{
            "AUTH_TOKEN":this.props.AUTH_TOKEN
        }
    }).then(res=>res.json()).then(data=>{
        if(data.success==true){
            AsyncStorage.clear().then(()=>{
                this.props.clearAuthToken();
                this.props.navigation.navigate('LoginStack');
            }).catch(err=>{
                console.log(err);
            });
        }  
        else{
            this.setState({
                loading: false
            })
        }
    }).catch(err=>{
        this.setState({
            loading:false
        })
    })
}
    render() {
        return (
            this.state.loading?<Loader/>:
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
                        <TouchableWithoutFeedback onPress={this.logout.bind(this)} >
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
        email:profile.email,
        baseUrl: state.Config.base_url,
        AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{
    return {
         setProfile:(obj)=>{dispatch({type: "SET_PROFILE",profile: obj})},
         clearAuthToken:()=>{dispatch({type:"CLEAR_AUTH_TOKEN"})}
    }
}

export default connect(mapState,mapDispatch)(Profile);
