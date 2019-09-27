import React, { Component } from 'react';
import { 
    View, 
    Text,StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    TouchableWithoutFeedback
  } from 'react-native';
import Header from "../major_components/Header";

import Wrapper from "../Home/Wrapper";

import EmptyItems from "../major_components/EmptyItems";

import {Ionicons} from "@expo/vector-icons";

import {connect} from "react-redux";
import Loader from '../major_components/Loader';
import RetryButton from '../major_components/RetryButton';

class CheckAddressSelect extends Component {
 
    constructor(props){
        super(props);
        this.state={
            selectedAddress:null,
            prevAddress: [],
            loading:false
        }
        this.setSelected=this.setSelected.bind(this);
        this.loadData=this.loadData.bind(this);
        this.selectDefault=this.selectDefault.bind(this);
    }
   loadData(){ 
        this.setState({
            loading: true
        })
        fetch(`${this.props.baseUrl}/user_billing_address`, {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "AUTH-TOKEN": this.props.AUTH_TOKEN
            }
        }).then(res => res.json()).then(data => {
            if (data.success == true) {
                if(data.billing_address.length==1){
                    let obj=data.billing_address[0];

                   this.setState({
                       prevAddress:[{...obj,seleted:true}],
                       selectedAddress:{...obj,seleted:true}
                   });
                }else{
                   this.setState({
                      prevAddress: data.billing_address
                    });
                }
                
            }
            this.setState({
                loading: false,
                error: false
            })
        }).catch(err => {
            this.setState({
                loading: false,
                error: true
            });
        })
   }

    componentWillMount(){
        this.loadData();
    }
   retry() {
        this.loadData();
   }

   setSelected(id){
     let addresses=this.state.prevAddress;
     addresses=addresses.map(address=>{
        isSelected=address.id==id 
        isSelected&& this.setState({
            selectedAddress:address
        }, () => { 
            console.log(this.state.selectedAddress);
        });
        return {
            ...address,
            seleted:isSelected
        }
     });
     this.setState({
         prevAddress:addresses,
     })
    
   }
   selectDefault(){
    //    let prevAddress=this.state.prevAddress;
    //    if(prevAddress.length==1){
    //        let obj=prevAddress[0];
    //        this.setState({
    //            prevAddress:[{...obj,seleted:true}]
    //        })
    //    }
   }
  onCheckout(){
      let {selectedAddress} =this.state;
       let {email,area,street,lane,block,phone_number,first_name,last_name,id}=selectedAddress;
      let address= {
          firstname: first_name,
          lastname: last_name,
          email,
          mobile:phone_number,
          area,
          street,
          block,
          lane,
          id
      }
    this.props.setAddress(address);
    this.props.navigation.push('CheckPayment');
  }
  isValid(state){
   
  }
 
  render() {
    //   let btn_disabled = !this.isValid(this.state);
    return (
    this.state.loading?<Loader/>:this.state.error?
    <EmptyItems message="something went wrong">
        <RetryButton onRetry={this.retry.bind(this)}/>
    </EmptyItems>:
    <Wrapper>
     <ImageBackground source={require("../images/backgroundimage.jpg")} style={{width:"100%",height:"100%"}}>
      <Header title="Checkout" backbutton={true} backHandler={()=>this.props.navigation.navigate('Cart')}/> 
      <View style={{flex:1}}>
        <Text style={[styles.text,styles.styltext]}>CHOOSE DELIVERY ADDRESS</Text>
       <View style={{flex:1,padding:10}}>
         {  this.state.prevAddress.length?<ScrollView style={{flex:1}}>
                
                {this.state.prevAddress.map((address,id)=>{
                  return(
                <TouchableWithoutFeedback key={id} onPress={()=>this.setSelected(address.id)}>
                   <View style={[styles.Address,styles.row]}>
                     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <View>  
                           {address.seleted?
                           <Ionicons name="ios-checkmark-circle" size={30} color="#2ecc71"/>:
                           <Ionicons name="ios-radio-button-off" size={30} color="#2ecc71" />}
                        </View>
                     </View>
                     <View style={{flex:3}}>
                         <View style={[{flexDirection:"row"},styles.frow]}>
                            <Text style={styles.key}>name :</Text>
                            <Text style={styles.value}>{`${address.first_name} ${address.last_name}`}</Text>
                         </View>
                         <View style={[{flexDirection:"row"},styles.frow]}>
                            <Text style={styles.key}>mobile :</Text>
                            <Text style={styles.value}>{`${address.phone_number}`}</Text>
                         </View>
                         <View style={[{flexDirection:"row"},styles.frow]}>
                            <Text style={styles.key}>Dno & area :</Text>
                            <Text style={styles.value}>{`${address.area}`}</Text>
                         </View>
                         <View style={[{flexDirection:"row"},styles.frow]}>
                            <Text style={styles.key}>street :</Text>
                            <Text style={styles.value}>{`${address.street}`}</Text>
                         </View>
                         <View style={[{flexDirection:"row"},styles.frow]}>
                            <Text style={styles.key}>block :</Text>
                            <Text style={styles.value}>{`${address.block}`}</Text>
                         </View>
                         <View style={[{flexDirection:"row"},styles.frow]}>
                            <Text style={styles.key}>lane :</Text>
                            <Text style={styles.value}>{`${address.lane}`}</Text>
                         </View>
                     </View>
                   </View>
                </TouchableWithoutFeedback>
                  )
              })
            }
           </ScrollView>:<EmptyItems message="No Previous Address Available"/>
        }
       </View> 
            <View className="bottombar" style={[styles.checkouttab]}>
                    <TouchableOpacity 
                    onPress={()=>this.props.navigation.push('CheckAddress',{custom:true})}
                    style={[styles.btn,{backgroundColor:"#16a085"}]} >
                        <Text style={{color:"white",fontWeight:"bold"}}>ADD ADDRESS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.btn,this.state.selectedAddress==null&&{ backgroundColor:"#bdc3c7"}]} 
                        disabled={this.state.selectedAddress==null}
                        onPress={this.onCheckout.bind(this)}>
                        <Text style={{color:"white",fontWeight:"bold"}}>NEXT</Text>
                    </TouchableOpacity>   
            </View>   
        </View>   
        </ImageBackground>
    </Wrapper>
   
    );
  }
}

const styles = StyleSheet.create({
   Address:{
     backgroundColor:"#fff",
     padding:20,
     borderBottomWidth:1,
     borderBottomColor:"#000"
   },
   row:{
     flexDirection:"row"
   },
   key:{
    paddingHorizontal:20,
    flex:1,
    color: "#7f8c8d",
    textTransform:"capitalize"
},
   value:{
     flex:3
   },
   frow:{
     paddingVertical:2
   },
    btn:{
        backgroundColor:"#27ae60",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5, 
        paddingHorizontal:30,
        paddingVertical:5,
    },
    btn_disabled:{
         backgroundColor:"#bdc3c7"
    },
    checkouttab:{
        display:"flex",
        borderWidth:2,
        borderColor: "#44bd32",
        height:70,
        flexDirection:"row",
        paddingVertical:10,
        paddingHorizontal:20,
        justifyContent:"space-between",
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
     let {Addition}=state;
     let {profile}=Addition;
    return {
        profile:profile,
        baseUrl: state.Config.base_url,
        AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{
    return {
        setAddress:(address)=>{dispatch({type:"SET_CHECKOUT_ADDRESS",address})}
    }
}
export default connect(mapStateToProps, mapDispatch)(CheckAddressSelect);

const response = {
    "success": true,
    "billing_address": [{
            "id": 28,
            "user_id": 5,
            "area": "fsfsfs",
            "block": "gsgsfss",
            "street": "fsfsfs",
            "lane": "sgsggs",
            "city": null,
            "first_name": "zdgse",
            "last_name": "sgsgsg",
            "phone_number": "8106492369",
            "email": "sgsg.sgs@sgs.com",
            "country": "Kuwait",
            "created_at": "2019-08-27T18:35:17.492Z",
            "updated_at": "2019-08-27T18:35:17.492Z"
        },
        {
            "id": 25,
            "user_id": 5,
            "area": "fsfsfs",
            "block": "gsgsfss",
            "street": "fsfsfs",
            "lane": "sgsggs",
            "city": null,
            "first_name": "zdgse",
            "last_name": "sgsgsg",
            "phone_number": "8106492369",
            "email": "sgsg.sgs@sgs.com",
            "country": "Kuwait",
            "created_at": "2019-08-27T16:44:50.951Z",
            "updated_at": "2019-08-27T16:44:50.951Z"
        },
        {
            "id": 20,
            "user_id": 5,
            "area": "fsfsfs",
            "block": "gsgs fss ",
            "street": "fsfsfs",
            "lane": "sgsggs",
            "city": null,
            "first_name": "zdgse",
            "last_name": "sgsgsg",
            "phone_number": "8106492369",
            "email": "sgsg.sgs@sgs.com",
            "country": "Kuwait",
            "created_at": "2019-08-25T21:43:26.667Z",
            "updated_at": "2019-08-25T21:43:26.667Z"
        }
    ],
    "user_details": {
        "id": 5,
        "first_name": "santosh",
        "last_name": "kumar",
        "phone_number": "8500589739",
        "email": "korada.santoshkumar611@gmail.com",
        "password_digest": "$2a$12$BBTEL5xh10wiYyEzgD5PGOBidGvrJ6SYY/P5ej9zvsuxM19qqLRh2",
        "address": "madhapur,hyderabad",
        "role": "Customer",
        "active": true,
        "created_at": "2019-08-07T11:37:46.399Z",
        "updated_at": "2019-08-29T19:34:16.085Z",
        "user_address": null
    }
}
