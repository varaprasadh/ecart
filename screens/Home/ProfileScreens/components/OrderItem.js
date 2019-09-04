import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableWithoutFeedback } from 'react-native';
import {Ionicons} from "@expo/vector-icons";

export default class OrderItem extends Component{
    constructor(props){
        super(props);
        this.state={
            orderobj:props.data,
            orderinfo:props.data.order,
            index:this.props.navigation
        }
    }
    render(){
           let order = this.state.orderobj.order;  
           let delivered = /delivered/i.test(order.status);
           let pending = /pending/i.test(order.status);
           let cancelled = /cancelled/i.test(order.status)
        return (
        <TouchableWithoutFeedback
         onPress={()=>this.props.onClick(this.state.orderobj.index)}
        >
            <View style={styles.listContainer}>
                <View style={{flex:1,alignItems:"center"}}>
                  <Text style={styles.index}>{this.state.orderobj.index+1}</Text>
                </View>
                <View style={styles.right}> 
                    <View style={{flex:4}}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Order ID:</Text>
                            <Text style={styles.value}>{this.state.orderinfo.id}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Amount:</Text>  
                            <Text style={styles.price}>{Number(this.state.orderinfo.total_price).toFixed(3)} KD</Text>  
                        </View>
                    </View>
                       {/* <View style={{alignItems:"center",flex:3}}>
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
                    </View> */}
                    <View style={{flex:1,alignItems:"flex-end",marginRight:10}}>
                        <Ionicons name="ios-arrow-forward" size={25}/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({

    listContainer:{
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:10,
        borderBottomWidth:1,
        marginVertical:5
      
    },
    price:{
       textAlign:"center",
       fontWeight:"bold",
       color: "#27ae60"
    }, 
    row:{
        flexDirection:"row",alignItems:"center",
        marginBottom:5
    },
    index:{
          color:"#8e44ad"
    },

    right:{flex:9,flexDirection:"row",alignItems:"center"},

    label:{
      fontWeight:"bold",
      fontSize:16,
      color:"#7f8c8d",
      paddingHorizontal:10
    },
    value:{
      color:"#2980b9",
      flex:1
    },
    pending:{
        color:"#e74c3c"
    },
    done:{
      color:"#2ecc71"
    }
}); 