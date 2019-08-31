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

