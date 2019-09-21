import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,ScrollView } from 'react-native';
import Header from "../../major_components/Header";
import Wrapper from '../Wrapper';
import OrderItem from "./components/OrderItem";

import {connect} from "react-redux";
import Loader from '../../major_components/Loader';
import EmptyItems from '../../major_components/EmptyItems';
import RetryButton from '../../major_components/RetryButton';
class OrderHistory extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            orders:[],
            refreshing:false
        }
        this.onStatusChange = this.onStatusChange.bind(this);
        this.loadData=this.loadData.bind(this);
    }
    onClick(index){
         this.props.navigation.push('OrderItemDetail',{order:this.props.orders[index],index,
            onStatusChange: this.onStatusChange
        },
         );
    }
    componentWillMount(){
    
     this.loadData();
     
    }
    loadData(){
         this.setState({
             loading: true && !this.state.refreshing
         });
         fetch(`${this.props.baseUrl}/orders`, {
             method: "GET",
             headers: {
                 "AUTH-TOKEN": this.props.AUTH_TOKEN
             }
         }).then(res => res.json()).then(data => {
             if (data.success == true) {
                 myOrders = data.my_orders;
                 myOrders = myOrders.map((orderArray, index) => {
                     return orderArray[0];
                 });
                 this.props.setOrders(myOrders);
                 this.setState({
                     loading: false,
                     error: false,
                     refreshing: false
                 });
             }
             this.setState({
                 loading:false
             });

         }).catch(err => {
             this.setState({
                 error: true,
                 loading: false,
                 refreshing: false
             })
         });
    }
    refresh(){
        this.setState({
            refreshing:true
        },()=>{
          this.loadData();
        });
    }
    onStatusChange(index,status){
       let orders=this.state.orders;
       orders=orders.map((order,i)=>{
           if(i==index){
               order.order.status=status;
           }
           return order;
       });
       this.setState({
           orders
       });

    }
 
   retry(){
          this.loadData();
   }

    render() {
        let orders=this.props.orders;
        return (
           this.state.loading?<Loader/>:
           this.state.error?<EmptyItems message="something went wrong,try again">
               <RetryButton onRetry={this.retry.bind(this)}/>
           </EmptyItems>:
           <Wrapper>
                  <View style={[styles.container]}>
                     <Header backbutton title="My Orders" backHandler={this.props.navigation.goBack} />
                  <View>
                  <View >
                   {
                    orders.length>0?
                   <ScrollView>
                      <FlatList 
                          style={{marginBottom:40}}
                          data={orders}
                          extraData={orders}
                          keyExtractor={(item,index)=>index+''}
                          refreshing={this.state.refreshing} 
                          onRefresh={this.refresh.bind(this)}
                          renderItem={({item,index})=>(
                          <OrderItem data={{index:index,...item}}
                              onClick={this.onClick.bind(this)}
                          /> 
                          )}
                      /> 
                    </ScrollView> 
                    :<EmptyItems message="No Orders Are Made Yet!"/>
                    }
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
mapState=state=>{
    return {
        orders: state.MyOrders.orders,
        baseUrl: state.Config.base_url,
        AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{
    return {
        setOrders:(orders)=>{dispatch({type:"SET_ORDERS",orders})}
    }
}

export default connect(mapState,mapDispatch)(OrderHistory);

