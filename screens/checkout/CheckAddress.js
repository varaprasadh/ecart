import React, { Component } from 'react';
import { 
    View, 
    Text,StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
  } from 'react-native';
import Header from "../major_components/Header";

import Wrapper from "../Home/Wrapper";

import EmptyItems from "../major_components/EmptyItems";

import {connect} from "react-redux";

class CheckAddress extends Component {
 
    constructor(props){
        super(props);
        this.state={
          firstName:'',
          lastName:'',
          mobile:'',
          email:'',
          area:'',
          block:'',
          street:'',
          lane:''
        }
    }
   
  onCheckout(){
          this.props.setAddress(this.state);
          this.props.navigation.push('CheckPayment');
  }
  isValid(state){
      flag=false;
      for (entry of Object.entries(state)){
          key=entry[0];
          value=entry[1];
          if(value.trim()==''){
               return false;
          }
          flag=true;
      }
      if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(state.email)) {
          flag=false;
      }
      if(!/^\d{6,}$/.test(state.mobile)){
          flag=false
      }
      return flag;
  }
  render() {
      let btn_disabled = !this.isValid(this.state);
    return (
        
    <Wrapper>
      <View style={{marginTop:-10,flex:1}}>
        <KeyboardAvoidingView behavior="padding" style={{flex:3}}>
            <KeyboardAvoidingView  style={{flex:1}}>
                <Header title="Checkout" backbutton={true} backHandler={()=>this.props.navigation.navigate('Cart')}/> 
                <View style={{flex:1,paddingHorizontal:10}}>
                    <Text style={[styles.text,styles.styltext,{alignSelf:"flex-start"}]}>Fill All the Details</Text>
                    <ScrollView>
                        <View style={styles.inputstyle} >
                            <TextInput placeholder="first name"
                            style={styles.input} 
                            onChangeText={text=>this.setState({firstName:text})}
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <TextInput placeholder="last name"
                            style={styles.input}
                            onChangeText={text=>this.setState({lastName:text})} 
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <TextInput placeholder="email address"
                            style={styles.input} 
                            onChangeText={text=>this.setState({email:text})}
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <TextInput placeholder="mobile number"
                            style={styles.input}
                            onChangeText={text=>this.setState({mobile:text})} 
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <TextInput placeholder="area"
                            style={styles.input} 
                            onChangeText={text=>this.setState({area:text})}
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <TextInput placeholder="block"
                            style={styles.input}
                            onChangeText={text=>this.setState({block:text})} 
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <TextInput placeholder="street"
                            style={styles.input} 
                            onChangeText={text=>this.setState({street:text})}
                            /> 
                        </View>
                        <View style={styles.inputstyle} >
                            <TextInput placeholder="lane" 
                            style={styles.input}
                            onChangeText={text=>this.setState({lane:text})}
                            /> 
                        </View>
                        </ScrollView> 
                    </View>
            </KeyboardAvoidingView>   
            <View className="bottombar" style={styles.checkouttab}>
                <TouchableOpacity 
                    disabled={btn_disabled} 
                    style={[styles.btn,btn_disabled?styles.btn_disabled:{}]} 
                    onPress={this.onCheckout.bind(this)}>
                    <Text style={{color:"white",fontWeight:"bold"}}>NEXT</Text>
                </TouchableOpacity>   
            </View>   
        </KeyboardAvoidingView>
        </View>   
        
    </Wrapper>
   
    );
  }
}

const styles = StyleSheet.create({
    inputstyle:{
        borderBottomWidth:1,
        borderBottomColor: "#7f8c8d",
        marginTop:10,
    },
    input:{
        paddingVertical:5,
        paddingHorizontal:10,
    },
    btn:{
        backgroundColor:"#27ae60",
        justifyContent:"center",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:40,
        paddingRight:40,
        borderRadius:5,  
        marginRight:20 
    },
    btn_disabled:{
         backgroundColor:"#bdc3c7"
    },
    checkouttab:{
        display:"flex",
        backgroundColor:"#fff",
        height:70,
        flexDirection:"row",
        paddingTop:10,
        paddingBottom:10,
        justifyContent:"flex-end",
        elevation:3
    
    },
    text: {
        fontSize:18,
        textAlign:"center",
        fontWeight:"bold"
    },
    styltext:{
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#2ecc71",
        color: "#fff",
        marginVertical:10,
    } 
});

mapStateToProps=state=>{
    return {
        
    }
}
mapDispatch=dispatch=>{
    return {
        setAddress:(address)=>{dispatch({type:"SET_CHECKOUT_ADDRESS",address})}
    }
}
export default connect(mapStateToProps,mapDispatch)(CheckAddress);


