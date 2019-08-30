//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,ScrollView } from 'react-native';
import Header from "../../major_components/Header";
import Wrapper from '../Wrapper';
import OrderItem from "./components/OrderItem";

import {connect} from "react-redux";
import Loader from '../../major_components/Loader';
class OrderHistory extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            orders:[]
        }
    }
    onClick(index){
        console.log(index);
        console.log(this.state.orders[index]);
         this.props.navigation.push('OrderItemDetail',{order:this.state.orders[index]});
    }
    componentWillMount(){
    // myOrders=my_orders.map(orderArray=>{
    //     return orderArray[0];
    // });
    // this.setState({
    //     orders:myOrders
    // });
    // console.log(myOrders);
     console.log(" will mount callling");
     
      this.setState({
          loading:true
      });
       fetch(`${this.props.baseUrl}/orders`,{
           method:"GET",
           headers:{
               "AUTH_TOKEN":this.props.AUTH_TOKEN
           }
       }).then(res=>res.json()).then(data=>{
        //    console.log(data);
           if(data.success==true){
              myOrders = data.my_orders;
              myOrders=myOrders.map((orderArray,index)=>{
                  console.log("orderindexz",index);
                 return orderArray[0];
              });
            console.log("debug",myOrders)
              this.setState({
                  orders:myOrders,
                  loading: false
              });
           }

       }).catch(err=>console.log(err));
    }

    render() {
        return (
           !this.state.loading? <Wrapper>
                  <View style={[styles.container]}>
                     <Header backbutton title="My Orders" backHandler={this.props.navigation.goBack} />
                  <View>
                  <View >
                   <ScrollView>
                      <FlatList 
                          style={{marginBottom:40}}
                          data={this.state.orders}
                          keyExtractor={(item,index)=>index+''} 
                          renderItem={({item,index})=>(
                          <OrderItem data={{index:index,...item}}
                              onClick={this.onClick.bind(this)}
                          />
                          )}
                      /> 
                    </ScrollView>  
                  </View> 
                  </View>
                </View>
            </Wrapper>:<Loader/>

        );  
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    
    },
}); 
mapState=state=>{
    return {
        baseUrl: state.Config.base_url,
        AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}

export default connect(mapState)(OrderHistory);



   
// const my_orders= [
//         [{
//             "date": "2019-08-22",
//             "delivery_date":"2019-08-07",
//             "order": {
//                 "id": 33,
//                 "user_id": 6,
//                 "total_price": 2,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-24T06:35:21.093Z",
//                 "updated_at": "2019-08-24T06:35:21.093Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                     "product_id": 4,
//                     "product_name": "Teddy Bear",
//                     "price": 1,
//                     "product_description": null,
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 5,
//                     "product_name": "Teddy Bear",
//                     "price": 20,
//                     "product_description": "Made with cotton",
//                     "ordered_quantity": 1
//                 }
//             ]
//         }],
//         [{
//             "date": "2019-08-19",
//             "delivery_date": "2019-08-07",
//             "order": {
//                 "id": 17,
//                 "user_id": 6,
//                 "total_price": 302,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-19T17:33:35.237Z",
//                 "updated_at": "2019-08-19T17:33:35.237Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                     "product_id": 6,
//                     "product_name": "Teddy Bear",
//                     "price": 1,
//                     "product_description": null,
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 11,
//                     "product_name": "Tennis Ball",
//                     "price": 300,
//                     "product_description": "Tennis Ball",
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 9,
//                     "product_name": "Pyramid wooden burner",
//                     "price": 1,
//                     "product_description": null,
//                     "ordered_quantity": 1
//                 }
//             ]
//         }],
//         [{
//             "date": "2019-08-21",
//             "order": {
//                 "id": 22,
//                 "user_id": 6,
//                 "total_price": 100,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-21T16:33:49.752Z",
//                 "updated_at": "2019-08-21T16:33:49.752Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                     "product_id": 7,
//                     "product_name": "Shesha Hookah",
//                     "price": 0,
//                     "product_description": null,
//                     "ordered_quantity": 2
//                 },
//                 {
//                     "product_id": 2,
//                     "product_name": "Shampoo",
//                     "price": 25,
//                     "product_description": "Sample ",
//                     "ordered_quantity": 4
//                 }
//             ]
//         }],
//         [{
//             "date": "2019-08-24",
//             "order": {
//                 "id": 34,
//                 "user_id": 6,
//                 "total_price": 1,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-24T07:01:23.020Z",
//                 "updated_at": "2019-08-24T07:01:23.020Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 4,
//                 "product_name": "Teddy Bear",
//                 "price": 1,
//                 "product_description": null,
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-21",
//             "order": {
//                 "id": 23,
//                 "user_id": 6,
//                 "total_price": 25,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-21T16:56:32.991Z",
//                 "updated_at": "2019-08-21T16:56:32.991Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 2,
//                 "product_name": "Shampoo",
//                 "price": 25,
//                 "product_description": "Sample ",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-24",
//             "order": {
//                 "id": 35,
//                 "user_id": 6,
//                 "total_price": 2,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-24T08:18:03.887Z",
//                 "updated_at": "2019-08-24T08:18:03.887Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 5,
//                 "product_name": "Teddy Bear",
//                 "price": 20,
//                 "product_description": "Made with cotton",
//                 "ordered_quantity": 2
//             }]
//         }],
//         [{
//             "date": "2019-08-19",
//             "order": {
//                 "id": 18,
//                 "user_id": 6,
//                 "total_price": 326,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-19T17:41:37.728Z",
//                 "updated_at": "2019-08-19T17:41:37.728Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                     "product_id": 7,
//                     "product_name": "Shesha Hookah",
//                     "price": 0,
//                     "product_description": null,
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 2,
//                     "product_name": "Shampoo",
//                     "price": 25,
//                     "product_description": "Sample ",
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 11,
//                     "product_name": "Tennis Ball",
//                     "price": 300,
//                     "product_description": "Tennis Ball",
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 6,
//                     "product_name": "Teddy Bear",
//                     "price": 1,
//                     "product_description": null,
//                     "ordered_quantity": 1
//                 }
//             ]
//         }],
//         [{
//             "date": "2019-08-18",
//             "order": {
//                 "id": 6,
//                 "user_id": 6,
//                 "total_price": 2.5,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-18T14:05:30.751Z",
//                 "updated_at": "2019-08-18T14:05:30.751Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 3,
//                 "product_name": "Egyptian Hookah",
//                 "price": 2.5,
//                 "product_description": "Shesha Medium",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-24",
//             "order": {
//                 "id": 37,
//                 "user_id": 6,
//                 "total_price": 25,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-24T10:21:16.273Z",
//                 "updated_at": "2019-08-24T10:21:16.273Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 1,
//                 "product_name": "Shampoo",
//                 "price": 25,
//                 "product_description": "gfjsdghjgfhjsgfjhdghfgdshgfhdsgjfgsd",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-24",
//             "order": {
//                 "id": 38,
//                 "user_id": 6,
//                 "total_price": 150,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-24T16:30:14.506Z",
//                 "updated_at": "2019-08-24T16:30:14.506Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 1,
//                 "product_name": "Shampoo",
//                 "price": 25,
//                 "product_description": "gfjsdghjgfhjsgfjhdghfgdshgfhdsgjfgsd",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-20",
//             "order": {
//                 "id": 19,
//                 "user_id": 6,
//                 "total_price": 482.5,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-20T17:09:35.987Z",
//                 "updated_at": "2019-08-20T17:09:35.987Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                     "product_id": 4,
//                     "product_name": "Teddy Bear",
//                     "price": 1,
//                     "product_description": null,
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 10,
//                     "product_name": "Shoe",
//                     "price": 450,
//                     "product_description": "Running Shoes",
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 3,
//                     "product_name": "Egyptian Hookah",
//                     "price": 2.5,
//                     "product_description": "Shesha Medium",
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 1,
//                     "product_name": "Shampoo",
//                     "price": 25,
//                     "product_description": "gfjsdghjgfhjsgfjhdghfgdshgfhdsgjfgsd",
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 8,
//                     "product_name": "Square Wooden burner",
//                     "price": 1,
//                     "product_description": null,
//                     "ordered_quantity": 4
//                 }
//             ]
//         }],
//         [{
//             "date": "2019-08-18",
//             "order": {
//                 "id": 7,
//                 "user_id": 6,
//                 "total_price": 700,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-18T14:22:55.195Z",
//                 "updated_at": "2019-08-18T14:22:55.195Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                     "product_id": 11,
//                     "product_name": "Tennis Ball",
//                     "price": 300,
//                     "product_description": "Tennis Ball",
//                     "ordered_quantity": 2
//                 },
//                 {
//                     "product_id": 1,
//                     "product_name": "Shampoo",
//                     "price": 25,
//                     "product_description": "gfjsdghjgfhjsgfjhdghfgdshgfhdsgjfgsd",
//                     "ordered_quantity": 4
//                 }
//             ]
//         }],
//         [{
//             "date": "2019-08-18",
//             "order": {
//                 "id": 8,
//                 "user_id": 6,
//                 "total_price": 22.5,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-18T15:04:24.152Z",
//                 "updated_at": "2019-08-18T15:04:24.152Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 3,
//                 "product_name": "Egyptian Hookah",
//                 "price": 2.5,
//                 "product_description": "Shesha Medium",
//                 "ordered_quantity": 9
//             }]
//         }],
//         [{
//             "date": "2019-08-18",
//             "order": {
//                 "id": 9,
//                 "user_id": 6,
//                 "total_price": 1,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-18T15:33:10.527Z",
//                 "updated_at": "2019-08-18T15:33:10.527Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 6,
//                 "product_name": "Teddy Bear",
//                 "price": 1,
//                 "product_description": null,
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-24",
//             "order": {
//                 "id": 46,
//                 "user_id": 6,
//                 "total_price": 50,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-24T17:30:39.933Z",
//                 "updated_at": "2019-08-24T17:30:39.933Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 1,
//                 "product_name": "Shampoo",
//                 "price": 25,
//                 "product_description": "gfjsdghjgfhjsgfjhdghfgdshgfhdsgjfgsd",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-18",
//             "order": {
//                 "id": 10,
//                 "user_id": 6,
//                 "total_price": 300,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-18T15:57:29.175Z",
//                 "updated_at": "2019-08-18T15:57:29.175Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 11,
//                 "product_name": "Tennis Ball",
//                 "price": 300,
//                 "product_description": "Tennis Ball",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-18",
//             "order": {
//                 "id": 11,
//                 "user_id": 6,
//                 "total_price": 2.5,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-18T16:37:21.599Z",
//                 "updated_at": "2019-08-18T16:37:21.599Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 3,
//                 "product_name": "Egyptian Hookah",
//                 "price": 2.5,
//                 "product_description": "Shesha Medium",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-21",
//             "order": {
//                 "id": 28,
//                 "user_id": 6,
//                 "total_price": 25,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-21T21:41:21.855Z",
//                 "updated_at": "2019-08-21T21:41:21.855Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                     "product_id": 4,
//                     "product_name": "Teddy Bear",
//                     "price": 1,
//                     "product_description": null,
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 10,
//                     "product_name": "Shoe",
//                     "price": 450,
//                     "product_description": "Running Shoes",
//                     "ordered_quantity": 1
//                 },
//                 {
//                     "product_id": 1,
//                     "product_name": "Shampoo",
//                     "price": 25,
//                     "product_description": "gfjsdghjgfhjsgfjhdghfgdshgfhdsgjfgsd",
//                     "ordered_quantity": 1
//                 }
//             ]
//         }],
//         [{
//             "date": "2019-08-19",
//             "order": {
//                 "id": 12,
//                 "user_id": 6,
//                 "total_price": 300,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-19T16:49:46.256Z",
//                 "updated_at": "2019-08-19T16:49:46.256Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 11,
//                 "product_name": "Tennis Ball",
//                 "price": 300,
//                 "product_description": "Tennis Ball",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-19",
//             "order": {
//                 "id": 13,
//                 "user_id": 6,
//                 "total_price": 2.5,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-19T17:02:38.974Z",
//                 "updated_at": "2019-08-19T17:02:38.974Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 3,
//                 "product_name": "Egyptian Hookah",
//                 "price": 2.5,
//                 "product_description": "Shesha Medium",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-19",
//             "order": {
//                 "id": 14,
//                 "user_id": 6,
//                 "total_price": 25,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-19T17:07:00.531Z",
//                 "updated_at": "2019-08-19T17:07:00.531Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 1,
//                 "product_name": "Shampoo",
//                 "price": 25,
//                 "product_description": "gfjsdghjgfhjsgfjhdghfgdshgfhdsgjfgsd",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-19",
//             "order": {
//                 "id": 15,
//                 "user_id": 6,
//                 "total_price": 0,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-19T17:12:26.315Z",
//                 "updated_at": "2019-08-19T17:12:26.315Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 7,
//                 "product_name": "Shesha Hookah",
//                 "price": 0,
//                 "product_description": null,
//                 "ordered_quantity": 2
//             }]
//         }],
//         [{
//             "date": "2019-08-24",
//             "order": {
//                 "id": 51,
//                 "user_id": 6,
//                 "total_price": 1,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-25T13:20:27.335Z",
//                 "updated_at": "2019-08-25T13:20:27.335Z",
//                 "billing_address_id": 5
//             },
//             "billing_address": {
//                 "id": 5,
//                 "user_id": null,
//                 "area": "wtete",
//                 "block": "ttdtdtgd",
//                 "street": "dtgdgd",
//                 "lane": "edgdddd",
//                 "city": null,
//                 "first_name": "jbbmnj",
//                 "last_name": "sdgdSDsg",
//                 "phone_number": "9876543210",
//                 "email": "sgsgsgs.sdsd@sfs.com",
//                 "country": "Kuwait",
//                 "created_at": "2019-08-25T13:20:27.329Z",
//                 "updated_at": "2019-08-25T13:20:27.329Z"
//             },
//             "products": [{
//                 "product_id": 3,
//                 "product_name": "Egyptian Hookah",
//                 "price": 2.5,
//                 "product_description": "Shesha Medium",
//                 "ordered_quantity": 1
//             }]
//         }],
//         [{
//             "date": "2019-08-25",
//             "order": {
//                 "id": 51,
//                 "user_id": 6,
//                 "total_price": 1,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-25T13:20:27.335Z",
//                 "updated_at": "2019-08-25T13:20:27.335Z",
//                 "billing_address_id": 5
//             },
//             "billing_address": {
//                 "id": 5,
//                 "user_id": null,
//                 "area": "wtete",
//                 "block": "ttdtdtgd",
//                 "street": "dtgdgd",
//                 "lane": "edgdddd",
//                 "city": null,
//                 "first_name": "jbbmnj",
//                 "last_name": "sdgdSDsg",
//                 "phone_number": "9876543210",
//                 "email": "sgsgsgs.sdsd@sfs.com",
//                 "country": "Kuwait",
//                 "created_at": "2019-08-25T13:20:27.329Z",
//                 "updated_at": "2019-08-25T13:20:27.329Z"
//             },
//             "products": [{
//                 "product_id": 1,
//                 "product_name": "Shampoo",
//                 "price": 25,
//                 "product_description": "gfjsdghjgfhjsgfjhdghfgdshgfhdsgjfgsd",
//                 "ordered_quantity": 3
//             }]
//         }],
//         [{
//             "date": "2019-08-19",
//             "order": {
//                 "id": 16,
//                 "user_id": 6,
//                 "total_price": 25,
//                 "status": "Payment Done",
//                 "offer_applied": "NA",
//                 "accepted_payment_method": "CASH",
//                 "created_at": "2019-08-19T17:25:19.615Z",
//                 "updated_at": "2019-08-19T17:25:19.615Z",
//                 "billing_address_id": null
//             },
//             "billing_address": null,
//             "products": [{
//                 "product_id": 2,
//                 "product_name": "Shampoo",
//                 "price": 25,
//                 "product_description": "Sample ",
//                 "ordered_quantity": 1
//             }]
//         }]
//     ]
