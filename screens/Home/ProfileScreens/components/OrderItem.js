import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableWithoutFeedback } from 'react-native';
import {Ionicons} from "@expo/vector-icons";

export default class OrderItem extends Component{
    constructor(props){
        super(props);
        this.state={
         delivered:props.data.delivered,
         index:props.data.index,
         id:props.data.productId,
         items:props.data.items.join(),
        }
    }
    render(){
        return (
        <TouchableWithoutFeedback
        >
            <View style={styles.listContainer}>
                <View style={{flex:1,alignItems:"center"}}>
                <Text style={styles.index}>{this.state.index}</Text>
                </View>
                <View style={styles.right}>
                    <View style={{flex:6}}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Order ID:</Text>
                            <Text style={styles.value}>{this.state.id}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Ordered Items:</Text>  
                            <Text style={styles.value} numberOfLines={1}>{this.state.items}</Text>  
                        </View>
                    </View>
                    <View style={{flex:2,marginRight:10,alignItems:"center"}}>
                    {this.state.delivered?(
                        <Ionicons name="ios-done-all" color="#2ecc71" size={25}/>)
                        :(<Ionicons name="ios-airplane" color="#e74c3c" size={25}/>)
                    }  
                    <Text style={this.state.delivered?styles.done:styles.pending}>{this.state.delivered?"Delivered":"Pending"}</Text>
                    </View>
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
      color:"#7f8c8d"
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