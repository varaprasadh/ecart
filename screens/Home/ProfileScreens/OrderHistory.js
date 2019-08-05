//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import Header from "../../major_components/Header";
import Wrapper from '../Wrapper';
import OrderItem from "./components/OrderItem";

class OrderHistory extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }

    render() {
        return (
            <Wrapper>
                <View style={[styles.container,{marginTop:-10}]}>
                  <Header backbutton title="Order History" goBack={this.props.navigation.goBack.bind(this)} />
                  <View>
                
                    <View className="list-item" >
                        <OrderItem data={{delivered:true,index:1,items:["beans","jacks"],productId:"122333"}}/>
                     
                     
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
