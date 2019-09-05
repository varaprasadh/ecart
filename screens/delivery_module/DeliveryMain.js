import React, { Component } from 'react';
import { View, Text,ScrollView,FlatList,StyleSheet,TouchableWithoutFeedback,TouchableOpacity,AsyncStorage} from 'react-native';
import Wrapper from '../Home/Wrapper';
import {Ionicons} from "@expo/vector-icons"

import {connect} from "react-redux";
import Loader from '../major_components/Loader';
import { showMessage } from 'react-native-flash-message';
import EmptyItems from "../major_components/EmptyItems";
import RetryButton from "../major_components/RetryButton";

import _ from 'lodash';


class DeliveryMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading:false,
        orders:[], 
        refreshing:false
    };
    this.loadData=this.loadData.bind(this);
  }
 
  onSelect(order,index){
    this.props.navigation.push("DDettails", {order,index});
  }

 componentWillMount(){
   this.loadData();
 }
 retry(){
   this.loadData();
 }
 
 
loadData(){
      this.setState({
          loading: true && !this.state.refreshing
      });
    //   fetch(`${this.props.baseUrl}/orders`, {
    //       method: "GET",
    //       headers: {
    //           "AUTH_TOKEN": this.props.AUTH_TOKEN
    //       }
    //   }).then(res => res.json()).then(data => {
    //       if (data.success) {
    //           myOrders = data.my_orders;
    //           myOrders = myOrders.map(orderAr => {
    //               return orderAr[0];
    //           });
    //           console.log(myOrders);
    //           this.props.setOrders(myOrders);
    //           this.setState({
    //               orders:myOrders,
    //               error: false,
    //               refreshing:false,
    //               loading:false
    //           })
    //       } else {
    //           this.setState({
    //               error: true,
    //               refreshing:false
    //           });
    //       }
    //       this.setState({
    //           loading: false
    //       });
    //   }).catch(err => {
    //       this.setState({
    //           loading: false,
    //           error: true
    //       })
    //   })
    data=response;
     myOrders = data.my_orders;
        myOrders = myOrders.map(orderAr => {
            return orderAr[0];
        });
        console.log(myOrders);
        this.props.setOrders(myOrders);
        this.setState({
            orders:myOrders,
            error: false,
            refreshing:false,
            loading:false
        });

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
  refresh(){
    this.setState({
        refreshing:true
    },()=>{
        this.loadData();
    });
  }
  changePassword(){
      this.props.navigation.push('ChangePassword');
  }
 retry(){
     this.loadData();
 }

// shouldComponentUpdate(nextProps, nextState){
//         return (
//             !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
//         );
// }

  render() {
    return (
     this.state.loading?<Loader/>: this.state.error?
     <EmptyItems message="something went wrong">
         <RetryButton onRetry={this.retry.bind(this)}/>
     </EmptyItems>:
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
                   extraData={this.props.orders} 
                   refreshing={this.state.refreshing}
                   onRefresh={this.refresh.bind(this)}
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
        this.state = {
            name: billing_address.first_name || '' + ' ' + billing_address.last_name || '',
            orderId: order.id,
            mobile: billing_address.phone_number || '',
            Amount: order.total_price,
            order
        }
    } 
    componentDidMount(){
       console.log("lets test this buddy");    
    }
   componentDidUpdate(){
    //   console.log("updated");
      let {data}=this.props;
      let billing_address = data.billing_address||{};
      let {order} = data;
      this.state = {
            name: billing_address.first_name || '' + ' ' + billing_address.last_name || '',
            orderId: order.id,
            mobile: billing_address.phone_number || '',
            Amount: order.total_price,
            order
        }
   }
    onSelect(){
        this.props.onSelect(this.props.data,this.props.index);
    }
    render(){
        console.log("rednerisdsff..")
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

const response = {
    "success": true,
    "my_orders": [
        [{ 
            "date": "2019-09-04",
            "order": {
                "id": 115,
                "user_id": 5,
                "total_price": 30,
                "status": "Pending",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-09-04T15:43:19.942Z",
                "updated_at": "2019-09-04T15:44:19.300Z",
                "billing_address_id": 41
            },
            "billing_address": {
                "id": 41,
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
                "created_at": "2019-08-30T19:48:57.121Z",
                "updated_at": "2019-08-30T19:48:57.121Z"
            },
            "products": [{
                    "product_id": 3,
                    "product_name": "Egyptian Hookah",
                    "price": 2.5,
                    "product_description": "Shesha Medium",
                    "ordered_quantity": 1
                },
                {
                    "product_id": 1,
                    "product_name": "Shampoo",
                    "price": 25,
                    "product_description": "Best Selling Product",
                    "ordered_quantity": 1
                }
            ]
        }],
        [{
            "date": "2019-09-04",
            "order": {
                "id": 114,
                "user_id": 5,
                "total_price": 25,
                "status": "Delivered",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-09-04T15:32:40.687Z",
                "updated_at": "2019-09-04T16:04:07.044Z",
                "billing_address_id": 42
            },
            "billing_address": {
                "id": 42,
                "user_id": 5,
                "area": "sffafaf",
                "block": "fafafaf",
                "street": "afafafaf",
                "lane": "fafaafafa",
                "city": null,
                "first_name": "john",
                "last_name": "doe",
                "phone_number": "8106492369",
                "email": null,
                "country": "Kuwait",
                "created_at": "2019-08-30T20:20:08.970Z",
                "updated_at": "2019-08-30T20:20:08.970Z"
            },
            "products": [{
                "product_id": 1,
                "product_name": "Shampoo",
                "price": 25,
                "product_description": "Best Selling Product",
                "ordered_quantity": 1
            }]
        }],
        [{
            "date": "2019-09-04",
            "order": {
                "id": 113,
                "user_id": 5,
                "total_price": 1,
                "status": "Delivered",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-09-04T15:25:14.926Z",
                "updated_at": "2019-09-04T15:28:38.815Z",
                "billing_address_id": 42
            },
            "billing_address": {
                "id": 42,
                "user_id": 5,
                "area": "sffafaf",
                "block": "fafafaf",
                "street": "afafafaf",
                "lane": "fafaafafa",
                "city": null,
                "first_name": "john",
                "last_name": "doe",
                "phone_number": "8106492369",
                "email": null,
                "country": "Kuwait",
                "created_at": "2019-08-30T20:20:08.970Z",
                "updated_at": "2019-08-30T20:20:08.970Z"
            },
            "products": [{
                "product_id": 8,
                "product_name": "Square Wooden burner",
                "price": 1,
                "product_description": null,
                "ordered_quantity": 1
            }]
        }],
        [{
            "date": "2019-09-03",
            "order": {
                "id": 112,
                "user_id": 5,
                "total_price": 2.5,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-09-03T18:36:55.793Z",
                "updated_at": "2019-09-03T18:37:08.755Z",
                "billing_address_id": 42
            },
            "billing_address": {
                "id": 42,
                "user_id": 5,
                "area": "sffafaf",
                "block": "fafafaf",
                "street": "afafafaf",
                "lane": "fafaafafa",
                "city": null,
                "first_name": "john",
                "last_name": "doe",
                "phone_number": "8106492369",
                "email": null,
                "country": "Kuwait",
                "created_at": "2019-08-30T20:20:08.970Z",
                "updated_at": "2019-08-30T20:20:08.970Z"
            },
            "products": [{
                    "product_id": 3,
                    "product_name": "Egyptian Hookah",
                    "price": 2.5,
                    "product_description": "Shesha Medium",
                    "ordered_quantity": 1
                },
                {
                    "product_id": 7,
                    "product_name": "Shesha Hookah",
                    "price": 0,
                    "product_description": null,
                    "ordered_quantity": 1
                }
            ]
        }],
        [{
            "date": "2019-09-03",
            "order": {
                "id": 111,
                "user_id": 5,
                "total_price": 2.5,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-09-03T18:34:57.517Z",
                "updated_at": "2019-09-03T18:35:10.758Z",
                "billing_address_id": 42
            },
            "billing_address": {
                "id": 42,
                "user_id": 5,
                "area": "sffafaf",
                "block": "fafafaf",
                "street": "afafafaf",
                "lane": "fafaafafa",
                "city": null,
                "first_name": "john",
                "last_name": "doe",
                "phone_number": "8106492369",
                "email": null,
                "country": "Kuwait",
                "created_at": "2019-08-30T20:20:08.970Z",
                "updated_at": "2019-08-30T20:20:08.970Z"
            },
            "products": [{
                "product_id": 3,
                "product_name": "Egyptian Hookah",
                "price": 2.5,
                "product_description": "Shesha Medium",
                "ordered_quantity": 1
            }]
        }],
        [{
            "date": "2019-09-03",
            "order": {
                "id": 110,
                "user_id": 5,
                "total_price": 25,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-09-03T17:52:17.365Z",
                "updated_at": "2019-09-03T18:24:10.626Z",
                "billing_address_id": 41
            },
            "billing_address": {
                "id": 41,
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
                "created_at": "2019-08-30T19:48:57.121Z",
                "updated_at": "2019-08-30T19:48:57.121Z"
            },
            "products": [{
                "product_id": 1,
                "product_name": "Shampoo",
                "price": 25,
                "product_description": "Best Selling Product",
                "ordered_quantity": 1
            }]
        }],
        [{
            "date": "2019-09-03",
            "order": {
                "id": 109,
                "user_id": 5,
                "total_price": 2.5,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-09-03T17:51:46.772Z",
                "updated_at": "2019-09-03T18:27:03.755Z",
                "billing_address_id": 42
            },
            "billing_address": {
                "id": 42,
                "user_id": 5,
                "area": "sffafaf",
                "block": "fafafaf",
                "street": "afafafaf",
                "lane": "fafaafafa",
                "city": null,
                "first_name": "john",
                "last_name": "doe",
                "phone_number": "8106492369",
                "email": null,
                "country": "Kuwait",
                "created_at": "2019-08-30T20:20:08.970Z",
                "updated_at": "2019-08-30T20:20:08.970Z"
            },
            "products": [{
                "product_id": 3,
                "product_name": "Egyptian Hookah",
                "price": 2.5,
                "product_description": "Shesha Medium",
                "ordered_quantity": 1
            }]
        }],
        [{
            "date": "2019-09-03",
            "order": {
                "id": 108,
                "user_id": 5,
                "total_price": 26,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-09-03T17:46:45.753Z",
                "updated_at": "2019-09-03T18:15:56.260Z",
                "billing_address_id": 42
            },
            "billing_address": {
                "id": 42,
                "user_id": 5,
                "area": "sffafaf",
                "block": "fafafaf",
                "street": "afafafaf",
                "lane": "fafaafafa",
                "city": null,
                "first_name": "john",
                "last_name": "doe",
                "phone_number": "8106492369",
                "email": null,
                "country": "Kuwait",
                "created_at": "2019-08-30T20:20:08.970Z",
                "updated_at": "2019-08-30T20:20:08.970Z"
            },
            "products": [{
                    "product_id": 8,
                    "product_name": "Square Wooden burner",
                    "price": 1,
                    "product_description": null,
                    "ordered_quantity": 1
                },
                {
                    "product_id": 1,
                    "product_name": "Shampoo",
                    "price": 25,
                    "product_description": "Best Selling Product",
                    "ordered_quantity": 1
                }
            ]
        }],
        [{
            "date": "2019-09-03",
            "order": {
                "id": 107,
                "user_id": 5,
                "total_price": 2.5,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-09-03T17:26:07.045Z",
                "updated_at": "2019-09-03T17:26:49.889Z",
                "billing_address_id": 42
            },
            "billing_address": {
                "id": 42,
                "user_id": 5,
                "area": "sffafaf",
                "block": "fafafaf",
                "street": "afafafaf",
                "lane": "fafaafafa",
                "city": null,
                "first_name": "john",
                "last_name": "doe",
                "phone_number": "8106492369",
                "email": null,
                "country": "Kuwait",
                "created_at": "2019-08-30T20:20:08.970Z",
                "updated_at": "2019-08-30T20:20:08.970Z"
            },
            "products": [{
                "product_id": 3,
                "product_name": "Egyptian Hookah",
                "price": 2.5,
                "product_description": "Shesha Medium",
                "ordered_quantity": 1
            }]
        }],
        [{
            "date": "2019-09-01",
            "order": {
                "id": 102,
                "user_id": 5,
                "total_price": 45,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-09-03T16:21:08.671Z",
                "updated_at": "2019-09-03T16:38:11.738Z",
                "billing_address_id": 42
            },
            "billing_address": {
                "id": 42,
                "user_id": 5,
                "area": "sffafaf",
                "block": "fafafaf",
                "street": "afafafaf",
                "lane": "fafaafafa",
                "city": null,
                "first_name": "john",
                "last_name": "doe",
                "phone_number": "8106492369",
                "email": null,
                "country": "Kuwait",
                "created_at": "2019-08-30T20:20:08.970Z",
                "updated_at": "2019-08-30T20:20:08.970Z"
            },
            "products": [{
                "product_id": 16,
                "product_name": "fssfss",
                "price": 45,
                "product_description": "fdgfg",
                "ordered_quantity": 1
            }]
        }],
        [{
            "date": "2019-08-29",
            "order": {
                "id": 80,
                "user_id": 5,
                "total_price": 50,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-08-30T19:48:57.200Z",
                "updated_at": "2019-08-31T21:16:52.968Z",
                "billing_address_id": 41
            },
            "billing_address": {
                "id": 41,
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
                "created_at": "2019-08-30T19:48:57.121Z",
                "updated_at": "2019-08-30T19:48:57.121Z"
            },
            "products": [{
                "product_id": 1,
                "product_name": "Shampoo",
                "price": 25,
                "product_description": "Best Selling Product",
                "ordered_quantity": 1
            }]
        }],
        [{
            "date": "2019-08-27",
            "order": {
                "id": 74,
                "user_id": 5,
                "total_price": 50,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-08-27T18:35:17.499Z",
                "updated_at": "2019-09-03T16:53:31.035Z",
                "billing_address_id": 28
            },
            "billing_address": {
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
            "products": [{
                "product_id": 1,
                "product_name": "Shampoo",
                "price": 25,
                "product_description": "Best Selling Product",
                "ordered_quantity": 3
            }]
        }],
        [{
            "date": "2019-08-25",
            "order": {
                "id": 71,
                "user_id": 5,
                "total_price": 50,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-08-27T16:44:50.973Z",
                "updated_at": "2019-09-03T16:57:40.477Z",
                "billing_address_id": 25
            },
            "billing_address": {
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
            "products": [{
                "product_id": 11,
                "product_name": "Tennis Ball",
                "price": 300,
                "product_description": "Tennis Ball",
                "ordered_quantity": 1
            }]
        }],
        [{
            "date": "2019-08-25",
            "order": {
                "id": 66,
                "user_id": 5,
                "total_price": 50,
                "status": "Cancelled",
                "offer_applied": "NA",
                "accepted_payment_method": "CASH",
                "created_at": "2019-08-25T21:43:26.672Z",
                "updated_at": "2019-09-03T17:00:15.701Z",
                "billing_address_id": 20
            },
            "billing_address": {
                "id": 20,
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
                "created_at": "2019-08-25T21:43:26.667Z",
                "updated_at": "2019-08-25T21:43:26.667Z"
            },
            "products": [{
                    "product_id": 6,
                    "product_name": "Teddy Bear",
                    "price": 1,
                    "product_description": null,
                    "ordered_quantity": 1
                },
                {
                    "product_id": 10,
                    "product_name": "Shoe",
                    "price": 450,
                    "product_description": "Running Shoes",
                    "ordered_quantity": 1
                },
                {
                    "product_id": 1,
                    "product_name": "Shampoo",
                    "price": 25,
                    "product_description": "Best Selling Product",
                    "ordered_quantity": 1
                },
                {
                    "product_id": 2,
                    "product_name": "Shampoo",
                    "price": 25,
                    "product_description": "Sample ",
                    "ordered_quantity": 1
                }
            ]
        }]
    ]
}