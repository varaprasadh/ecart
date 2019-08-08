//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,ScrollView } from 'react-native';
import Header from "../../major_components/Header";
import Wrapper from '../Wrapper';
import OrderItem from "./components/OrderItem";

class OrderHistory extends Component {
    constructor(props){
        super(props);
        this.state={
            historyItems:[
                {delivered:false,items:["beans","jacks"],productId:"122331",price:"20$"},
                {delivered:true,items:["beans","jacks"],productId:"122332",price:"20$"},
                {delivered:false,items:["beans","jacks"],productId:"122333",price:"20$"},
                {delivered:true,items:["beans","jacks"],productId:"122334",price:"20$"},
                {delivered:false,items:["beans","jacks"],productId:"122335",price:"20$"},
                {delivered:true,items:["beans","jacks"],productId:"122336",price:"20$"},
                {delivered:true,items:["beans","jacks"],productId:"122337",price:"20$"},
                {delivered:true,items:["beans","jacks"],productId:"122338",price:"20$"},
            ]
        }
    }
    onClick(productId){
         console.log(productId);
         this.props.navigation.push('OrderItemDetail');
    }

    render() {
        return (
            <Wrapper>
                  <View style={[styles.container,{marginTop:-10}]}>
                     <Header backbutton title="Order History" backHandler={this.props.navigation.goBack} />
                  <View>
                  <View >
                   <ScrollView>
                      <FlatList 
                          style={{marginBottom:40}}
                          data={this.state.historyItems}
                          keyExtractor={(item)=>item.productId} 
                          renderItem={({item,index})=>(
                          <OrderItem data={{index:index+1,...item}}
                              onClick={this.onClick.bind(this)}
                          />
                          )}
                      /> 
                    </ScrollView>  
                  </View>
                    
                     
                  </View>
                </View>
            </Wrapper>

        );  
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    
    },
}); 

export default OrderHistory;
