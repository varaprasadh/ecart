import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Wrapper from '../Wrapper';
import Header from '../../major_components/Header';

class OrderItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
       id:"1234",
       status:true,
       items:[
           {
               name:"prayer beads",
               price:"40",
           },
           {
                name:"prayer beads",
                price:"40",
          },
           {
               name:"prayer beads",
               price:"40",
           },
           {
                name:"prayer beads",
                price:"40",
          },
           {
               name:"prayer beads",
               price:"40",
           },
           {
                name:"prayer beads",
                price:"40",
          },
       ]
      }
  }


  render() {
     

    return (
      <Wrapper>
        <View style={{marginTop:-10}}> 
          <Header title="order information" backbutton backHandler={this.props.navigation.goBack}/>
        </View>
        <View style={{paddingHorizontal:10}}>
            <View>
                <View style={styles.jrow}>
                    <Text style={styles.label}>Order ID:</Text><Text>123455555</Text>
                </View>
                <View style={styles.jrow} >
                    <Text style={styles.label}>delivery status:</Text>
                    <Text style={[styles.status,this.state.status?styles.done:styles.pending,]}>
                    {this.state.status?"Delivered":"Pending"}
                    </Text>
                </View>
            </View>
            <View>
                <Text style={[styles.label,{color:"#c0392b"}]}>Order contents:</Text>
            </View>
             <OrderItemsTable/>
        </View>
        
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
                <View style={styles.col}><Text style={[styles.colHead]}>SL No</Text></View>
                <View style={styles.col}><Text style={[styles.colHead]}>title</Text></View>
                <View style={styles.col}><Text style={[styles.colHead]}>quantity</Text></View>
                <View style={styles.col}><Text style={[styles.colHead]}>price</Text></View>
                </View>
                { this.state.items.map((item,index)=>{
                    totalPrice+=item.price*item.quantity
                return (
                    <View style={styles.row} key={index}>  
                        <View style={styles.col}><Text style={[styles.colData]}>{index+1}</Text></View>
                        <View style={styles.col}><Text style={[styles.colData]}>{item.title}</Text></View>
                        <View style={styles.col}><Text style={[styles.colData]}>{item.quantity}</Text></View>
                        <View style={styles.col}><Text style={[styles.colData,{color:"#27ae60"}]}>{item.quantity} X {item.price}</Text></View>
                    </View>
                )   
                })
            
                }
                <View style={styles.row}>  
                    <View style={styles.col}><Text style={[styles.colData]}></Text></View>
                    <View style={styles.col}><Text style={[styles.colData]}></Text></View>
                    <View style={styles.col}><Text style={[styles.colData,{fontWeight:"bold"}]}>Total</Text></View>
                    <View style={styles.col}><Text style={[styles.colData,{color:"#27ae60",fontWeight:"bold"}]}>{totalPrice}$</Text></View>
                </View> 

                <View>
                </View>
            </View>
        )
    }
}