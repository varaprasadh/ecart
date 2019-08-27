import React, { Component } from 'react';
import { View, Text,StyleSheet,ImageBackground } from 'react-native';
import Wrapper from '../Wrapper';
import Header from '../../major_components/Header';

class OrderItemDetail extends Component {
  constructor(props) {
    super(props);
    orderObj = props.navigation.getParam('order');
    console.log("data",orderObj);
    this.state = {
        orderObj:orderObj,
        orderInfo:orderObj.order,
        products:orderObj.products,
        items:[]
      }
  }


  render() {
      delivered = this.state.orderObj.delivery_date != null;
 
    return (
      <Wrapper>
        <View> 
          <Header title="Order Information" backbutton backHandler={this.props.navigation.goBack}/>
        </View>
        <ImageBackground style={{width:"100%",height:"100%"}} source={require("../../images/backgroundimage.jpg")}>
        <View style={{padding:10}}> 
            <View style={{backgroundColor:"#fff",padding:10}}>
                <View style={styles.jrow}>
                    <Text style={styles.label}>Order ID:</Text><Text>{this.state.orderInfo.id}</Text>
                </View>
                <View style={styles.jrow}>
                    <Text style={styles.label}>Ordered On:</Text><Text>{this.state.orderObj.date}</Text>
                </View>
               {delivered?<View style={styles.jrow}>
                    <Text style={styles.label}>Delivered On:</Text><Text>12-33-1999</Text>
                </View>:null
               }
                <View style={styles.jrow} >
                    <Text style={styles.label}>Delivery Status:</Text>
                    <Text style={[styles.status,delivered?styles.done:styles.pending,]}>
                    {delivered?"Delivered":"Pending"}
                    </Text>
                </View>
            </View>
            <View style={{backgroundColor:"#fff",paddingHorizontal:10}}>
                <Text style={[styles.label,{color:"#c0392b"}]}>Order Contents:</Text>
                <OrderItemsTable items={this.state.products}/>
            </View> 
        </View>
        </ImageBackground>
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
    },
    colData:{
       color:"#2c3e50",
       textAlign:"center",
       paddingVertical:5,
       textTransform:"capitalize"

    },
    label:{
      fontSize:16,
      fontWeight:"bold",
      color:"#2c3e50",
    },
    status:{
        color:"white",
        fontWeight:"bold",
        paddingHorizontal:10,
        paddingVertical:3,
        borderRadius:4
    },
    done:{
      backgroundColor:"#27ae60",
       
    },
    pending:{
        backgroundColor:'#d35400',
    }
  });

export default OrderItemDetail;

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
            <View> 
                <View style={[styles.row,{borderBottomWidth:1,borderBottomColor:"#2c3e50"}]}> 
                <View style={styles.col}><Text style={[styles.colHead]}>S.No</Text></View>
                <View style={styles.col}><Text style={[styles.colHead]}>Product</Text></View>
                <View style={styles.col}><Text style={[styles.colHead]}>Quantity</Text></View>
                <View style={styles.col}><Text style={[styles.colHead]}>Price</Text></View>
                </View>
                { this.state.items.map((item,index)=>{
                    quantity=item.quantity||item.ordered_quantity;
                    totalPrice+=item.price*quantity
                return (
                    <View style={styles.row} key={index}>  
                        <View style={styles.col}><Text style={[styles.colData]}>{index+1}</Text></View>
                        <View style={styles.col}><Text style={[styles.colData]}>{item.title||item.product_name}</Text></View>
                        <View style={styles.col}><Text style={[styles.colData]}>{item.quantity||item.ordered_quantity}</Text></View>
                        <View style={styles.col}><Text style={[styles.colData,{color:"#27ae60"}]}>{item.quantity||item.ordered_quantity} X {item.price.toFixed(3)}</Text></View>
                    </View>
                )   
                })
            
                }
                <View style={styles.row}>  
                    <View style={styles.col}><Text style={[styles.colData]}></Text></View>
                    <View style={styles.col}><Text style={[styles.colData]}></Text></View>
                    <View style={styles.col}><Text style={[styles.colData,{fontWeight:"bold"}]}>Total</Text></View>
                    <View style={styles.col}><Text style={[styles.colData,{color:"#27ae60",fontWeight:"bold",textTransform:"uppercase"}]}>{totalPrice.toFixed(3)} KD</Text></View>
                </View> 

                <View>
                </View>
            </View>
        )
    }
}