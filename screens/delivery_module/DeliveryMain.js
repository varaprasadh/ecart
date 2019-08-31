import React, { Component } from 'react';
import { View, Text,ScrollView,FlatList,StyleSheet,TouchableWithoutFeedback,TouchableOpacity,AsyncStorage} from 'react-native';
import Wrapper from '../Home/Wrapper';
import {Ionicons} from "@expo/vector-icons"

import {connect} from "react-redux";
import Loader from '../major_components/Loader';
import { showMessage } from 'react-native-flash-message';


class DeliveryMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading:false,
        orders:[]
    };
  }
 
  onSelect(order,index){
    this.props.navigation.push("DDettails", {order,index});
  }

 componentWillMount(){
     this.setState({
         loading:true
     });
     fetch(`${this.props.baseUrl}/orders`,{
         method:"GET",
         headers:{
             "AUTH_TOKEN":this.props.AUTH_TOKEN
         }
     }).then(res=>res.json()).then(data=>{
         if(data.success){
             myOrders = data.my_orders;
             myOrders=myOrders.map(orderAr=>{
                 return orderAr[0];
             });
             console.log(myOrders);
             this.props.setOrders(myOrders);
             this.setState({
                 error:false
             })
         }
         else{
             this.setState({
                 error:true
             });
         }
         this.setState({
             loading:false
         });
     })
 }
 

  logout(){
        this.setState({loading:true});
        fetch(`${this.props.baseUrl}/logout`,{
            method:"GET",
            headers:{
                "AUTH_TOKEN":this.props.AUTH_TOKEN
            }
        }).then(res=>res.json()).then(data=>{
            if(data.success==true){
                AsyncStorage.clear();
                this.props.clearAuthToken();
                this.props.navigation.navigate('LoginStack');
            }else{
                this.setState({
                    loading:false
                });
                showMessage({
                    message:"logout failed",
                    description:"something went wrong,try again later",
                    type:"danger",
                    autoHide:true
                });
            }
        })
  }
  changePassword(){
      this.props.navigation.push('ChangePassword');
  }
  componentWillUpdate(){
      
  }
  render() {
    return (
     this.state.loading?<Loader/>: 
      <Wrapper noBackground>
          <View style={styles.container}>
              <View style={{flexDirection:"row"}} >
                   <View>
                       <Text style={styles.title}>welcome!!</Text>
                       <Text style={styles.sTitle}>Your Pending Deliveries</Text>
                   </View>
                   <View style={{alignItems:"flex-end",flex:1}}>
                      <TouchableOpacity onPress={this.logout.bind(this)}>
                           <Text style={styles.logout}>Logout</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={this.changePassword.bind(this)}>
                          <View style={{alignItems:"center",padding:10}}>
                              <Ionicons name="ios-settings" size={30} color="#fff"/>
                              <Text style={{color:"#fff"}}>change password</Text>
                          </View>
                      </TouchableOpacity>
                    
                   </View>
              </View>
              <View style={{flex:1}}>
                  <FlatList data={this.props.orders} 
                   keyExtractor={(item,i)=>i+''} 
                   extraData={this.props}
                   renderItem={({item,index})=>
                      <Item data={item} index={index} onSelect={this.onSelect.bind(this)}/>
                      }
                   showsVerticalScrollIndicator={false}
                //    ItemSeparatorComponent={()=><View style={{borderWidth:1,borderBottomColor:"#fff"}}></View>}
                   />
              </View>
          </View>
      </Wrapper>
    );
  }
}

class Item extends Component{
    constructor(props){
        super(props);
        let {data}=this.props;
        let billing_address = data.billing_address||{};
        let {order} = data;
       
        this.state={
            name: billing_address.first_name||''+' '+billing_address.last_name||'',
            orderId:order.id,
            mobile: billing_address.phone_number||'',
            Amount: order.total_price,
            order
        }
    } 

    onSelect(){
        this.props.onSelect(this.props.data,this.props.index);
    }
    render(){
        let order=this.state.order
        let delivered=/delivered/i.test(order.status);
        let pending=/pending/i.test(order.status);
        let cancelled=/cancelled/i.test(order.status)
        return(
           <TouchableWithoutFeedback onPress={this.onSelect.bind(this)}>
            <View style={styles.item}>
            <View style={{flex:4}}>
                <View style={styles.frow}>
                    <Text style={styles.label}>Order ID:</Text>
                    <Text style={[styles.text,]} >{this.state.orderId}</Text>
                </View>
                <View style={styles.frow}>
                    <Text style={styles.label}>Customer Name:</Text>
                    <Text style={[styles.text,]} >{this.state.name}</Text>
                </View>
                <View style={styles.frow}>
                    <Text style={styles.label} >Mobile Number:</Text>
                    <Text style={[styles.text,]}  >{this.state.mobile}</Text>
                </View>
                <View style={styles.frow}>
                    <Text style={styles.label} >Amount:</Text>
                    <Text style={[styles.text,]} >{Number(this.state.Amount).toFixed(3)} KD</Text>
                </View>
            </View>
            <View style={{alignItems:"center",flex:1}}>
                {delivered?
                <Ionicons name="ios-done-all" color="#27ae60" size={30}/>
                :pending?
                <Ionicons name="ios-time"  color="#e67e22" size={30}/>:
                cancelled?
                <Ionicons name="ios-close-circle" color="#e74c3c" size={30}/>:
                null}
                <Text style={[{fontWeight:"bold"},
                delivered ? {color:"#27ae60"} : pending ?{color:"#e67e22"} : cancelled ? {color:"#e74c3c"} : {}
                ]}>{delivered?"Delivered":pending?"Pending":cancelled?"Cancelled":""}</Text>
            </View>
            <View style={{alignItems:"flex-end",flex:1,}}>
                <Ionicons name="ios-arrow-forward" color="#27ae60" size={25}/>
            </View>
            </View>
           </TouchableWithoutFeedback>
        )
    }

}

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:10
    },
     title: {
         fontSize:20,
         paddingVertical:10,
         paddingHorizontal:10,
         fontWeight:"bold",
         color:"#fff"
     },
     sTitle:{
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        backgroundColor: "#2980b9",
        alignSelf:"flex-start",
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:10,
        color:"#fff"
     },
      label:{
       flex:1,
       color: "#95a5a6",
       fontWeight:"bold"
     },
     text:{
        flex:1,
        fontWeight:"bold",
        color: "#27ae60",
        fontWeight:"bold"
    }, 
     item:{
       paddingVertical:10,
       flexDirection: 'row',
       alignItems:"center",
       flex:1,
       backgroundColor:"#fff",
       padding:10,
       margin:5,
       borderRadius:10
     },
     frow:{
         flexDirection:"row",
         padding:5
     },
     logout: {
         backgroundColor: "#e74c3c",
         paddingHorizontal: 10,
         paddingVertical: 5,
         color: "#fff",
         fontWeight: "bold",
         borderRadius: 5,
         margin:10
     }
})
mapState=state=>{
    return {
        orders:state.Delivery.orders,
        baseUrl: state.Config.base_url,
        AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{
    return {
        clearAuthToken:()=>{dispatch({type:"CLEAR_AUTH_TOKEN"})},
        setOrders:(orders)=>{dispatch({type:"SET_ORDERS",orders})}
    }
}
export default connect(mapState,mapDispatch)(DeliveryMain);
