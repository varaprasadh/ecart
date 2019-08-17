import React, { Component } from 'react';
import { 
    View, 
    Text,StyleSheet,
    StatusBar,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
  } from 'react-native';
import Header from "../major_components/Header";

import Ship_AdressComponent from "../Home/ProfileScreens/components/Ship_AddressComponent";
import Wrapper from "../Home/Wrapper";

import EmptyItems from "../major_components/EmptyItems";

import {connect} from "react-redux";

class CheckAddress extends Component {
 
    constructor(props){
        super(props);
        this.state={
        addresses:props.savedAddress||[],
        selectedAddress:"",
        btn_disabled:true
        }
        console.log("dub",this.props);
    }
  StatusBarHeight=StatusBar.currentHeight;
   
  onAddressSelected(index){
     this.updateSelection(index);
     let selectedAddress=this.state.addresses[index].address;
     this.setState({
         selectedAddress:selectedAddress
     },()=>console.log(this.state))
  }

  updateSelection(index){
    newAddress=this.state.addresses.map((address,i)=>{
        if(i==index){
            address.selected=!address.selected 
        }
        else{
          address.selected=false; 
        }
       
        return address
     });
     console.log(newAddress);
    this.setState({
        addresses:newAddress
    })
  }
  
  onChangeText(text){
      this.setState({
          selectedAddress: text,
          btn_disabled:text.trim()==''
      });
  }
  onCheckout(){
          //update checkout reducer
          this.props.setAddress(this.state.selectedAddress);
          this.props.navigation.push('CheckPayment');
  }
  render() {
    return (
        
    <Wrapper>
      <View style={{marginTop:-10,flex:1}}>
      <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
      <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
        <Header title="Checkout" backbutton={true} backHandler={()=>this.props.navigation.navigate('Cart')}/> 
            <View style={{flex:1}}>
                {this.state.addresses.length>0? 
                  <View>
                     <Text style={[styles.text,{fontWeight:"normal"}]}>Choose Address from below</Text>
                     <ScrollView style={{flex:1}}>
                        { this.state.addresses.map((obj,index)=>{
                        return (
                            <View  key={index} >
                                <Ship_AdressComponent label={obj.title} 
                                content={obj.address}
                            
                                id={index} 
                                selected={obj.selected?true:false}
                                onSelect={this.onAddressSelected.bind(this)}/>
                            </View>
                        )}) 
                        }
                        </ScrollView>
                 </View>:
                 <EmptyItems message="you have not saved any address yet!"/>
                }
                </View>
    
            
                <View style={{flex:1}}>
                    <Text style={[styles.text,{color:"#27ae60"}]}>OR</Text>
                    <Text style={[styles.text,{color:"#2980b9"}]}>Enter New Address</Text>
                    <View style={{paddingHorizontal: 20,paddingVertical:10}}>
                    {/* <View style={styles.inputstyle}>
                          <TextInput 
                            placeholder="enter address type..e.g home " 
                            style={styles.add_type}
                            returnKeyType="next"
                            onChangeText={(text)=>this.setState({title:text})}
                            />
                        </View>   */}
                      
                            <View style={styles.inputstyle} >
                            <TextInput placeholder="enter address " 
                            multiline={true} 
                            editable={true} 
                            returnKeyType="done"
                            value={this.state.selectedAddress}
                            style={[styles.add_type,{height:100,textAlignVertical:"top"}]}
                            onChangeText={this.onChangeText.bind(this)}
                            /> 
                        </View>
                        
                    </View>
                </View>      
            </KeyboardAvoidingView>
            </KeyboardAvoidingView>
                <View className="bottombar" style={styles.checkouttab}>
                    <TouchableOpacity 
                        disabled={this.state.btn_disabled} 
                        style={[styles.btn,this.state.btn_disabled?styles.btn_disabled:{}]} 
                        onPress={this.onCheckout.bind(this)}>
                        <Text style={{color:"white",fontWeight:"bold"}}>NEXT</Text>
                    </TouchableOpacity>   
                </View>
      </View>   
    

      

    </Wrapper>
   
    );
  }
}

const styles = StyleSheet.create({
    add_type:{
        height:50,
        backgroundColor:"#fff",
        paddingHorizontal:20,
        paddingVertical:5 , 
    },
    inputstyle:{
        borderWidth:2,
        borderColor:"#000",
        marginTop:10,
        borderRadius:2
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
    }
    
    
});

mapStateToProps=state=>{
    return {
        savedAddress:state.Addition.savedAddress
    }
}
mapDispatch=dispatch=>{
    return {
        setAddress:(address)=>{dispatch({type:"SET_CHECKOUT_ADDRESS",address})}
    }
}
export default connect(mapStateToProps,mapDispatch)(CheckAddress);


