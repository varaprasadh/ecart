import React, { Component } from 'react';
import { View, Text,StyleSheet,ImageBackground,TouchableOpacity} from 'react-native';
import Wrapper from '../Wrapper';
import Header from '../../major_components/Header';

import {connect} from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import Loader from '../../major_components/Loader';
import ExpectedDelivery from '../../major_components/ExpectedDelivery';
import { ScrollView } from 'react-native-gesture-handler';
import BillingAddress from '../../major_components/BillingAddress';
import Axios from 'axios';

class OrderItemDetail extends Component {
  constructor(props) {
    super(props);
    orderObj = props.navigation.getParam('order');
    console.log("data",orderObj);
    this.state = {
        orderObj:orderObj,
        orderInfo:orderObj.order,
        products:orderObj.products,
        items:[],
        index:this.props.navigation.getParam('index'),
        status:orderObj.order.status,
        billingAdress: orderObj.billing_address
      }
  }

cancelOrder(){
   let obj = {
       order_id: this.state.orderInfo.id
   }
   this.setState({
       loading:true
   });
   Axios.post("/cancel_order",obj,{headers:{"AUTH-TOKEN":this.props.AUTH_TOKEN}})
   .then(({data})=>{ 
       if(data.success==true){
           showMessage({
               type:"success",
               message:"success",
               description:"order cancelled successfully",
               autoHide:true
           });
           this.setState({
               cancelled:true
           });
       
       this.props.modifyStatus(this.state.index,'Cancelled');
       }else{
          showMessage({
              type:"danger",
              message: "failed",
              description: "something went wrong..try again later",
              autoHide: true
          });
       }
       this.setState({
           loading:false
       })
   })
}
  render() {
       let order = this.state.orderObj.order
       let delivered = /delivered/i.test(order.status);
       let pending = /pending/i.test(order.status);
       let cancelled = /cancelled/i.test(order.status);
       let deliveredOn = order.updated_at.split('T')[0];
       console.log("status",order.status);
    return (
      this.state.loading?<Loader/>:
      <Wrapper>
        <View> 
          <Header title="Order Information" backbutton backHandler={this.props.navigation.goBack}/>
        </View>
        <ImageBackground style={{width:"100%",height:"100%"}} source={require("../../images/backgroundimage.jpg")}>
        <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:100}}>
        <View style={{padding:10}}> 
            <View style={{backgroundColor:"#fff",padding:10,borderRadius:5}}>
                <View style={styles.jrow}>
                    <Text style={styles.label}>Order ID:</Text><Text>BZK{this.state.orderInfo.id}</Text>
                </View>
                <View style={styles.jrow}>
                    <Text style={styles.label}>Ordered On:</Text><Text>{this.state.orderObj.date}</Text>
                </View>
               {delivered?<View style={styles.jrow}>
                    <Text style={styles.label}>Delivered On:</Text><Text>{deliveredOn}</Text>
                </View>:null
               }
                <View style={styles.jrow} >
                    <Text style={styles.label}>Delivery Status:</Text>
                    
                    <Text style={[styles.status,{fontWeight:"bold"},
                         this.state.cancelled?{color:"#e74c3c"}:delivered ? {color:"#27ae60"} : pending ?{color:"#e67e22"} : cancelled ? {color:"#e74c3c"} : {}
                        ]}>
                     {this.state.cancelled?"Cancelled":delivered?"Delivered":pending?"Pending":cancelled?"Cancelled":""}</Text>
                </View>
            </View>
            <View style={{backgroundColor:"#fff",padding:10,marginTop:10,borderRadius:5}}>
                <Text style={[styles.label,{color:"#e74c3c"}]}>Order Contents:</Text>
                <OrderItemsTable  items={this.state.products}/>
            </View> 
            <BillingAddress address={this.state.billingAdress}/>
            {!delivered && !cancelled && !this.state.cancelled && 
            <View>
                <ExpectedDelivery orderDate={this.state.orderObj.date}/>
            </View>
            }
        </View> 
        
       
         </ScrollView>
        
        </ImageBackground>
        {!delivered && !cancelled && !this.state.cancelled &&
            <View style={styles.btn_abs}> 
                <TouchableOpacity
                    disabled={this.state.cancelled}
                    onPress={this.cancelOrder.bind(this)}
                >
                    <Text style={styles.btn}>{this.state.cancelled?"CANCELLED":"CANCEL ORDER"}</Text>
                </TouchableOpacity>
            </View>
        }
      </Wrapper>
    );
  } 
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:"space-around",
        borderBottomWidth:1,
        borderBottomColor:"#95a5a6"
        },
        jrow:{
            flexDirection:"row",
            paddingVertical:3,
            justifyContent:"space-between",
            borderBottomWidth:1,
            borderBottomColor:"#7f8c8d"
        },
    colHead:{
        fontWeight:"bold",
        color:"#2980b9",
        paddingVertical:10,
    },
    col:{
        flex:1,
        alignItems:"center",
        textAlign:"center"
    },
    colData:{
       color:"#2c3e50",
       textAlign:"center",
       paddingVertical:5,
       textTransform:"capitalize"

    },
    label:{
      fontWeight:"bold",
      color: "#7f8c8d",
    },
    status:{
        color:"white",
        fontWeight:"bold",
        paddingHorizontal:10,
        paddingVertical:3,
        borderRadius:4
    },
    btn:{
        textAlign:"center",
        padding:10,
        backgroundColor: "#e74c3c",
        color:"#fff",
        fontWeight:"bold",
        paddingHorizontal:30,
        borderRadius:5
    },
    btn_abs:{
        position:"absolute",
        bottom:0,
        left:0,
        right:0,
        height:50,
        alignItems:"center"
    }
  });


export class OrderItemsTable extends Component{
    constructor(props){
        super(props);
        this.state={
          items:props.items
        }
    }
    render(){
        totalPrice=0;
        return(
            <View style={{paddingHorizontal:10}}> 
                <View style={[styles.row,{borderBottomWidth:1,borderBottomColor:"#2c3e50"}]}> 
                <View style={styles.col}><Text style={[styles.colHead]}>Product Code</Text></View>
                <View style={styles.col}><Text style={[styles.colHead]}>Product</Text></View>
                <View style={styles.col}><Text style={[styles.colHead]}>Quantity</Text></View>
                <View style={styles.col}><Text style={[styles.colHead]}>Price</Text></View>
                </View>
                { this.state.items.map((item,index)=>{
                    quantity=item.quantity||item.ordered_quantity;
                    totalPrice+=item.price*quantity
                    console.log(item);
                return (
                    <View style={styles.row} key={index}>  
                        <View style={styles.col}><Text style={[styles.colData,{textTransform:"uppercase"}]}>{item.product_code||item.id}</Text></View>
                        <View style={styles.col}><Text style={[styles.colData]}>{item.title||item.product_name}</Text></View>
                        <View style={styles.col}><Text style={[styles.colData]}>{item.quantity||item.ordered_quantity}</Text></View>
                        <View style={styles.col}><Text style={[styles.colData,{color:"#27ae60"}]}>{item.quantity||item.ordered_quantity} X {item.price.toFixed(3)}</Text></View>
                    </View>
                )   
                })
                }
            
               {
                    <View style={styles.row}>  
                        <View style={styles.col}><Text style={[styles.colData]}></Text></View>
                        <View style={styles.col}><Text style={[styles.colData]}></Text></View>
                        <View style={styles.col}><Text style={[styles.colData,{fontWeight:"bold"}]}>shipping charge</Text></View>
                        <View style={styles.col}>
                            <Text style={[styles.colData,{color:"#27ae60",fontWeight:"bold",textTransform:"uppercase"}]}>
                            {totalPrice<5?Number(1).toFixed(3)+"KD":"Free"} 
                            </Text>
                        </View>
                    </View> 
               }

                <View style={styles.row}>  
                    <View style={styles.col}><Text style={[styles.colData]}></Text></View>
                    <View style={styles.col}><Text style={[styles.colData]}></Text></View>
                    <View style={styles.col}><Text style={[styles.colData,{fontWeight:"bold"}]}>Total</Text></View>
                    <View style={styles.col}>
                        <Text style={[styles.colData,{color:"#27ae60",fontWeight:"bold",textTransform:"uppercase"}]}>
                            {totalPrice>=5?totalPrice.toFixed(3):Number(totalPrice+1).toFixed(3)} KD
                        </Text>
                    </View>
                </View> 

                <View>
                </View>
            </View>
        )
    }
}

mapState = state => {
    return {
        baseUrl: state.Config.base_url,
        AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{
    return {
        modifyStatus:(index,status)=>{dispatch({type:"MODIFY_STATUS",index,status})}
    }
}

export default connect(mapState,mapDispatch)(OrderItemDetail);