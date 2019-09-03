import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,TextInput as Input,ImageBackground} from 'react-native';

import {connect} from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import Loader from '../major_components/Loader';

class MyClass extends Component {
     
    constructor(props){
        super(props);
        this.state={
            number:null,
            submit_disabled:true
        }
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount(){
        this.input.focus();
    }

   

    handleChange(text){ 
          this.setState({
              number:text
          },()=>{
           if( this.state.number.length==8 ){ 
               this.input.blur();
               this.setState({
                   submit_disabled:false
               });
           }else{
            this.setState({
                submit_disabled:true
            });
           }
          });
    
    }
    continue(){
        let obj={
            	phone_number:this.state.number
        }

        this.setState({
            loading:true
        });
        
        fetch(`${this.props.baseUrl}/generate_otp`,{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        }).then(res=>res.json()).then(data=>{
            if(data.success==true){
             this.props.navigation.push('OTP',{mobile:this.state.number,type:"signin_with_otp"})
            }
            else{
                showMessage({
                    type:"warning",
                    message:"Error",
                    description:"something went wrong,try again",
                    autoHide:true
                });
            }
            this.setState({
                loading:false
            })
        }).catch(err=>{
            showMessage({
                type:"danger",
                message:"Failed",
                description:"something went wrong,try again later",
                autoHide:true
            });
            this.props.navigation.goBack();
        })
       
    }
 

    render() { 
        return (
              this.state.loading?<Loader/>:
               <ImageBackground style={{width:"100%",height:"100%"}} source={require("../images/backgroundimage.jpg")}>    
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View><Text style={styles.label}>Verification</Text></View>
                        <View style={{width:200}}>
                            <Text style={styles.text}>Enter your registered mobile number</Text>
                        </View>
                        <View 
                        style={[styles.inputline,styles.input,{display:"flex",flexDirection:"row",paddingLeft:0}]}
                        > 
                            <Input 
                            value="+965"
                            editable={false} 
                            style={[
                                {paddingVertical:10,paddingHorizontal:5,textAlign:"center"}]} 
                            />
                            <Input 
                            style={{flex:3,fontSize:20,}}  
                            maxLength={8}
                            ref={input=>this.input=input}
                            onSubmitEditing={()=>this.input.blur()}
                            returnKeyType="go"
                            keyboardType="number-pad"
                            onChangeText={this.handleChange}
                            />
                        </View>
                        
                        <TouchableOpacity disabled={this.state.submit_disabled} 
                            onPress={this.continue.bind(this)}
                            style={[styles.btn,{backgroundColor:this.state.submit_disabled?"gray":"green"}]}>
                            <Text style={{fontSize:20,color:"white",elevation:6}}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ecf0f1',
    },
   
    inputline:{
         borderWidth:1,
         borderColor:"#2ecc71",
         borderRadius: 5,
    },
    label:{marginBottom:10, fontSize:25,fontWeight:"bold",paddingVertical:10,alignSelf:"flex-start"},
    text:{
        fontSize:18,
        marginBottom:20,
        textAlign:"justify",
        textTransform:"capitalize"
    },
    btn:{
        paddingBottom:5,
        paddingTop:5,
        backgroundColor:"green",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: 20,
        borderRadius:5,
    },
    card:{
        backgroundColor:"white",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:30,
        paddingRight:30,
        elevation:3,
        borderRadius:5
    }
});
mapState=state=>{
    return {
        baseUrl: state.Config.base_url,
    }
}

export default connect(mapState)(MyClass);
