//import liraries
import React, { Component } from 'react';
import { StyleSheet,ScrollView ,Button,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import {Container,Content,Text,View,Input} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import {Constants,Font,Asset} from "expo";

// create a component
class SignUpScreen extends Component {
    
    constructor(props){
        super(props);
        this.state={
            firstname:"",
            lastname:"",
            mobile:"",
            email:"",
            address:"",
            password:"",
            password_confirmation:"",
            submit_enabled:false,
        }
      this.validate=this.validate.bind(this);
      this.signUP=this.signUP.bind(this);
       
    }
     

    // async componentWillMount() {
    //     await Font.loadAsync({
    //         Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
    //         Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
    //         Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    //     });
    //     this.setState({ loading: false });
    // }
   buttonDisabled(){
       return !this.state.submit_enabled;
   }
   validate(){
       console.log("calling function")
      const regex={
          firstname:/^\w+$/g,
          lastname:/^\w+$/g,
          mobile:/^\d{10}$/,
          email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          address:/^[A-z0-9,\s]*$/g,
          password:/^\S{4}\S*$/g,
          password_confirmation:/^\S{4}\S*$/g
      }
     let fieldKeys=Object.keys(this.state);
     validFlag=false;
    //  console.log(fieldKeys,regexKeys);
     
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
         this.setState({
            submit_enabled:validFlag?true:false
         })
   }
   signUP(){

   }

    render() {
        return (
          <KeyboardAvoidingView enabled behavior="padding" style={{flex:1}}>
          <View style={styles.container}>
                    <View style={{flex:1}}>
                    <View style={{paddingTop:5,paddingBottom:5,display:"flex"}} >
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Ionicons name="ios-arrow-back" size={32} color="black" />
                            <Text onPress={()=>this.props.navigation.goBack()} style={{marginLeft:10}}>Back</Text>
                        </View>
                    </View>
                    <View className="wrapper" style={styles.wrapper}>
                        <View className="title">
                          <Text style={styles.title}>Sign Up</Text>
                        </View>
                            <ScrollView className="form" style={{paddingLeft:10,paddingRight:10,height:450}} >
                               <View style={{paddingBottom:10}}>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label}>First Name</Text>
                                        <Input 
                                        ref={firstname=>this.firstname=firstname}
                                        style={[styles.inputline,styles.input]}
                                        returnKeyType="next"
                                        onSubmitEditing={({nativeEvent:{text}})=>{
                                            this.setState({firstname:text})
                                            this.validate();
                                            this.lastname._root.focus();

                                            }
                                        }
                                        onChangeText={text=>this.setState({firstname:text})}
                                        />
                                    </View>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Last Name</Text>
                                        <Input 
                                        ref={lastname=>this.lastname=lastname} 
                                        style={[styles.inputline,styles.input]}
                                        returnKeyType="next"
                                        onSubmitEditing={({nativeEvent:{text}})=>{
                                            this.setState({lastname:text});
                                            this.validate();
                                            this.mobile._root.focus()
                                            }
                                        }
                                        onChangeText={text=>this.setState({lastname:text})}
                                        />
                                    </View>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Mobile</Text>
                                        <View 
                                         style={[styles.inputline,styles.input,{flex:4},{display:"flex",flexDirection:"row",paddingLeft:0}]}
                                        >
                                            <Input value="+965"
                                              style={[{flex:1,backgroundColor:"#ecf0f1",textAlign:"center"}]}
                                              disabled />
                                            <Input 
                                            ref={mobile=>this.mobile=mobile}
                                            style={[{flex:4}]}
                                            textContentType="telephoneNumber"
                                            keyboardType="number-pad"
                                            returnKeyType="next"
                                            onSubmitEditing={({nativeEvent:{text}})=>{
                                                this.setState({mobile:text});
                                                this.validate();
                                                this.email._root.focus()
                                                }
                                            } 
                                            onChangeText={text=>this.setState({mobile:text})}
                                            />
                                        </View>
                                    </View>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Email</Text>
                                        <Input ref={email=>this.email=email} 
                                        returnKeyType="next"
                                        textContentType="emailAddress" 
                                        keyboardType="email-address"
                                        style={[styles.inputline,styles.input]}
                                        onSubmitEditing={({nativeEvent:{text}})=>{
                                            this.setState({email:text});
                                            this.validate();
                                            this.address._root.focus()
                                            }
                                        }
                                        onChangeText={text=> this.setState({email:text})}
                                        />
                                    </View>

                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Address</Text>
                                        <Input ref={address=>this.address=address} 
                                        style={[styles.inputline,styles.input]}
                                        returnKeyType="next"
                                        onSubmitEditing={({nativeEvent:{text}})=>{
                                            this.setState({address:text});
                                            this.validate();
                                            this.password._root.focus()
                                           }
                                        }
                                        onChangeText={text=>this.setState({address:text})}
                                        />
                                    </View>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Password</Text>
                                        <Input 
                                         ref={password=>this.password=password}
                                         style={[styles.inputline,styles.input]}
                                         returnKeyType="next"
                                         onSubmitEditing={({nativeEvent:{text}})=>{
                                             this.setState({password:text});
                                             this.validate();
                                             this.c_password._root.focus()
                                             }
                                         }
                                             onChangeText={text=> this.setState({password:text})}
                                         />
                                    </View>
                                    <View className="input-row" style={styles.inputRow}>
                                        <Text style={styles.label} >Confirm Password</Text>
                                        <Input
                                         ref={c_password=>this.c_password=c_password}
                                         style={[styles.inputline,styles.input]}
                                         returnKeyType="go"
                                         onSubmitEditing={({nativeEvent:{text}})=>{
                                             this.setState({password_confirmation:text});
                                             console.log(this.state); 
                                             this.validate();
                                         }}
                                         onChangeText={text=> this.setState({ password_confirmation :text})}
                                         />  
                                    </View>
                           
                                </View>
                            </ScrollView>  
                    </View>
                </View>
          </View>
          <TouchableOpacity disabled={this.buttonDisabled()}  style={[styles.btn_signup,{backgroundColor:this.buttonDisabled()?"#7f8c8d":"#2ecc71"}]}>
               <Text style={{color:"white"}}>SIGN UP</Text>
          </TouchableOpacity> 
          </KeyboardAvoidingView>
        );
    }
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
        paddingTop:Constants.statusBarHeight,
        backgroundColor:"#F5F5F5"
    },
    title:{
        fontWeight:"bold",
        fontSize:32
    },
    wrapper:{
        flex:1,
        padding:10,
        marginTop: 20,
        backgroundColor:"#fff",
        elevation:1
      },
      input:{
        fontSize:20,
        paddingRight:10,
        paddingTop:1,
        paddingLeft:10
       },
       inputline:{
         borderWidth:1,
         borderColor:"#7f8c8d",
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
       color:"#2ecc71"
   }
});

export default SignUpScreen;
