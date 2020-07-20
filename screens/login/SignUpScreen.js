//import liraries
import React, { Component } from 'react';
import { StyleSheet,ScrollView ,ImageBackground,KeyboardAvoidingView,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import {Text,View,Input} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {Constants,Font,Asset} from "expo";

import {connect} from "react-redux";

import Loader from "../major_components/Loader";
import Wrapper from '../Home/Wrapper';
import Header from '../major_components/Header';
import { showMessage } from 'react-native-flash-message';
import Axios from 'axios';
class SignUpScreen extends Component {
    
    constructor(props){
        super(props); 
        this.state={
            firstname:"",
            lastname:"",
            mobile:"",
            email:"",
            area:"",
            block:"",
            street:"",
            lane:"",
            password:"",
            password_confirmation:"",
            loading:false
        }

      this.validate=this.validate.bind(this);
      this.signUP=this.signUP.bind(this);
    }
     
   validate(){
      const regex={
          firstname: /^[a-zA-Z]+$/,
          lastname: /^[a-zA-Z]+$/,
          mobile:/^\d{8}$/,
          email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          area: /^(?!\s*$).+/,
          block: /^(?!\s*$).+/,
          street: /^(?!\s*$).+/,
          lane: /^(?!\s*$).+/,
          password:/^[a-zA-Z0-9]{4,}$/g,
          password_confirmation:/^[a-zA-Z0-9]{4,}$/g
      }
     let fieldKeys=Object.keys(this.state);
     validFlag=false;
     
     for(key of fieldKeys){

         if(key in regex){
           console.log(key);        
            if(regex[key].test(this.state[key])){
                validFlag=true;
                console.log("correct",key);
            } else{
                console.log("false",key);
                validFlag=false;
                break;             
            }
         }
     }
    return validFlag;
   }
   signUP(){

    console.log("signing up");
         let obj={
            email:this.state.email,
            first_name:this.state.firstname,
            last_name:this.state.lastname,
            phone_number:this.state.mobile,
            user_address: {
                area:this.state.area,
                block:this.state.block,
                street:this.state.street,
                lane:this.state.lane
            },
            password:this.state.password,
            password_confirmation:this.state.password_confirmation
         };
        this.setState({
            loading:true
        });
        Axios.post("/register",obj).then(({data})=>{
            console.log("debug dATA",data);
            if(data.success==true){
                this.props.navigation.push('OTP',{mobile:this.state.mobile,type:"signup"});
            }else{
                showMessage({
                    type:"danger",
                    message:"OOPS",
                    description:data.message.capitalize(),
                    autoHide:true
                });
            } 
            this.setState({
                loading:false
            });
        }).catch(err=>{
            console.log("debug",err);
            showMessage({
                type:"danger",
                message:"Error",
                description:"something went wrong,try again",
                autoHide:true
            });
            // this.props.navigation.goBack();         
        });
   }

    render() {
       isValid=this.validate();
        return (
          this.state.loading?<Loader/>:
      <Wrapper>
        <ImageBackground style={{width:"100%",height:"100%"}} source={require("../images/backgroundimage.jpg")}>
          <KeyboardAvoidingView enabled behavior="padding" style={{flex:1}}>
            <Header backbutton title="Signup" backHandler={this.props.navigation.goBack}/>
                <View style={styles.container}>
                  <View style={{flex:1}}>
                    <View className="wrapper" style={styles.wrapper}>
                        <View className="title">
                          {/* <Text style={styles.title}>Sign Up</Text> */}
                        </View>
                            <ScrollView className="form" showsVerticalScrollIndicator={false} style={{paddingLeft:10,paddingRight:10,height:450}} >
                               <View style={{paddingBottom:10}}>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label}>First Name</Text>
                                        <Input  
                                        ref={firstname=>this.firstname=firstname}
                                        style={[styles.inputline,styles.input]}
                                        returnKeyType="next"
                                        placeholder="Enter First Name"
                                        placeholderTextColor = "#bdc3c7"
                                        value={this.state.firstname}
                                        onSubmitEditing={()=>this.lastname._root.focus()}
                                        onChangeText={text=>this.setState({firstname:text})}
                                        /> 
                                    </View>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Last Name</Text>
                                        <Input 
                                        ref={lastname=>this.lastname=lastname} 
                                        style={[styles.inputline,styles.input]}
                                        returnKeyType="next"
                                        placeholder="Enter Last Name"
                                        placeholderTextColor = "#bdc3c7"
                                        value={this.state.lastname}
                                        onSubmitEditing={()=> this.mobile._root.focus()}
                                        onChangeText={text=>this.setState({lastname:text})}
                                        />
                                    </View>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Mobile</Text>
                                        <View 
                                         style={[styles.inputline,styles.input,{flex:4},{display:"flex",flexDirection:"row",paddingLeft:0}]}
                                        >
                                            <Input value="+965"
                                              style={[{flex:1,textAlign:"center",color:"#fff"}]}
                                              editable = {
                                                  false
                                              } 
                                              />
                                            <Input 
                                            ref={mobile=>this.mobile=mobile}
                                            style={[{flex:4,color:"#fff"}]}
                                            textContentType="telephoneNumber"
                                            keyboardType="number-pad"
                                            returnKeyType="next"
                                            maxLength={8}
                                            placeholder="Enter Mobile Number"
                                            placeholderTextColor = "#bdc3c7"
                                            value={this.state.mobile}
                                            onSubmitEditing={()=>this.email._root.focus()} 
                                            onChangeText={text=>this.setState({mobile:text})}
                                            />
                                        </View>
                                    </View>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Email</Text>
                                        <Input ref={email=>this.email=email} 
                                        returnKeyType="next"
                                        placeholderTextColor = "#bdc3c7"
                                        textContentType="emailAddress" 
                                        keyboardType="email-address"
                                        placeholder="Enter Email"
                                        value={this.state.email}
                                        style={[styles.inputline,styles.input]}
                                        onSubmitEditing={()=>this.area._root.focus()}
                                        onChangeText={text=> this.setState({email:text})}
                                        />
                                    </View>

                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Address</Text>

                                        <Input ref={area=>this.area=area} 
                                        style={[styles.inputline,styles.input]}
                                        returnKeyType="next"
                                        placeholderTextColor = "#bdc3c7"
                                        placeholder="Enter Dno & area"
                                        onSubmitEditing={()=>this.block._root.focus()}
                                        value={this.state.area}
                                        onChangeText={text=>this.setState({area:text})}
                                        />
                                        <Input ref={block=>this.block=block} 
                                        style={[styles.inputline,styles.input,{marginTop:3}]}
                                        returnKeyType="next"
                                        placeholderTextColor = "#bdc3c7"
                                        placeholder="Enter block"
                                        onSubmitEditing={()=>this.street._root.focus()}
                                        value={this.state.block}
                                        onChangeText={text=>this.setState({block:text})}
                                        />
                                        <Input ref={street=>this.street=street} 
                                        style={[styles.inputline,styles.input,{marginTop:3}]}
                                        returnKeyType="next"
                                        placeholderTextColor = "#bdc3c7"
                                        placeholder="Enter street"
                                        value={this.state.street}
                                        onSubmitEditing={()=> this.lane._root.focus()}
                                        onChangeText={text=>this.setState({street:text})}
                                        />
                                        <Input ref={lane=>this.lane=lane} 
                                        style={[styles.inputline,styles.input,{marginTop:3}]}
                                        returnKeyType="next"
                                        placeholderTextColor = "#bdc3c7"
                                        placeholder="Enter lane"
                                        value={this.state.lane}
                                        onSubmitEditing={()=>this.password._root.focus()}
                                        onChangeText={text=>this.setState({lane:text})}
                                        />
                                    </View>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Password</Text>
                                        <Input 
                                         ref={password=>this.password=password}
                                         style={[styles.inputline,styles.input]}
                                         returnKeyType="next"
                                         placeholder="Enter password"
                                         placeholderTextColor = "#bdc3c7"
                                         secureTextEntry={true}
                                         value={this.state.password}
                                         onSubmitEditing={()=>this.c_password._root.focus()}
                                         onChangeText={text=> this.setState({password:text})}
                                         />
                                    </View>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Confirm Password</Text>
                                        <Input
                                         ref={c_password=>this.c_password=c_password}
                                         style={[styles.inputline,styles.input]}
                                         returnKeyType="go"
                                         placeholder="Confirm password" 
                                         placeholderTextColor = "#bdc3c7"
                                         onChangeText={text=>this.setState({password_confirmation:text})}
                                         secureTextEntry={true}
                                         value={this.state.password_confirmation}
                                         onChangeText={text=> {
                                           this.setState({ password_confirmation :text});
                                         }}/>  
                                    </View>
                                </View>
                            </ScrollView>  
                    </View>
                </View>
          </View>
          </KeyboardAvoidingView>
          <TouchableOpacity onPress={this.signUP.bind(this)} disabled={!isValid}  style={[styles.btn_signup,{backgroundColor:!isValid?"#7f8c8d":"#2ecc71"}]}>
               <Text style={{color:"white"}}>SIGN UP</Text>
          </TouchableOpacity>
        </ImageBackground>
        </Wrapper>
        ); 
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
    },
    title:{
        fontWeight:"bold",
        fontSize:32
    },
    wrapper:{
        flex:1,
        paddingHorizontal:10,
        borderRadius:10,
        backgroundColor:"#000000A1",
        elevation:1
      },
      input:{
        fontSize:20,
        paddingRight:10,
        paddingTop:1,
        paddingLeft:10,
        color:"#fff",
       },
       inputline:{
         borderWidth:2,
         borderColor: "#27ae60",
         borderRadius: 5,
    },
    inputRow:{
        display:"flex",
        marginBottom:5
      },
   btn_signup:{
       
       height:50,
       backgroundColor:"#2ecc71",
       color:"#fff",
       display:"flex",
       justifyContent: 'center',
       alignItems:"center"
   },
   label:{
       fontWeight:"bold",
    //    color:"#2ecc71",
       color: "#fff",
   }
});
mapState=state=>{
    return {
        baseUrl: state.Config.base_url,
        AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}

export default connect(mapState)(SignUpScreen);

