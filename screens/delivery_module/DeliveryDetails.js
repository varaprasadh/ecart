import React, { Component} from 'react'
import { Text, View ,StyleSheet,TouchableOpacity,CheckBox} from 'react-native'
import Wrapper from '../Home/Wrapper';
import Header from '../major_components/Header';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export class DeliveryDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            checked:false,
            paid:false,
            name:"john doe",
            mobile:"9988776655",
            orderId:"99887766",
            amount:"340$"
        }
    }
    confirmDelivery(){
        //update deliver status
    }
    render() {
        return (
           <Wrapper>
              <View style={{marginTop:-10}}>
                  <Header title="delivery details"  backbutton backHandler={()=>this.props.navigation.goBack()}/>
              </View>
              <View style={{paddingHorizontal:10,flex:1}}>
                <View style={{flexDirection:"row",paddingVertical:20,}}>
                  <View style={{flex:1}}>
                        <View style={styles.frow}>
                            <Text style={styles.label}>order Id:</Text>
                            <Text style={styles.text}>{this.state.orderId}</Text>
                        </View>
                        <View style={styles.frow}>
                            <Text style={styles.label}>customer name:</Text>
                            <Text style={styles.text}>{this.state.name}</Text>
                        </View>
                        <View style={styles.frow}>
                            <Text style={styles.label}>mobile number:</Text>
                            <Text style={styles.text}>{this.state.mobile}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.amount}>
                            <Text style={{color:"#27ae60"}}>total Amount</Text>
                            <Text style={{color:"#27ae60",fontWeight:"bold",fontSize:16}}>{this.state.amount}</Text>
                        </View>
                        <View style={{alignItems:"center",marginTop:10}}>
                            <Text 
                                style={[styles.paid,{
                                backgroundColor:this.state.paid?"#27ae60":"#e74c3c"}]}>
                              {this.state.paid?"paid":"not paid yet"}
                            </Text>
                        </View>
                    </View> 
                </View>
                <View>
                    <Text style={styles.title}>Address:</Text>
                    <Text style={styles.address} >
                        lorem ipsum lorem ipsum
                    </Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center"}}> 
                    <CheckBox 
                        value={this.state.checked} 
                        label="check if the product is delivered"
                        onChange={()=>{this.setState({checked:!this.state.checked})}}/>
                        <TouchableWithoutFeedback onPress={()=>{this.setState({checked:!this.state.checked})}}>
                            <Text style={{color:"#e74c3c"}}>check this if product is delivered</Text>
                        </TouchableWithoutFeedback>
                </View>
                 <TouchableOpacity
                     style={[styles.customBtn,
                        !this.state.checked?{backgroundColor:"#7f8c8d"}:{}]}
                     disabled={!this.state.checked}
                     onPress={this.confirmDelivery.bind(this)}
                     >
                    <Text 
                         style={[{color:"white",fontWeight:"bold"}]}>confirm delivery</Text>
                </TouchableOpacity>
              </View>
           </Wrapper>
        )
    }
}
const styles=StyleSheet.create({
    frow:{
        flexDirection:"row"
    },
    amount:{
            alignItems: "center",
            alignSelf: "flex-start",
            paddingHorizontal: 20,
            marginHorizontal: 20,
            paddingVertical:10,
            borderRadius:10,
            borderWidth:1,
            borderColor:"#27ae60"

    },
    label:{
       flex:1,
       color: "#2c3e50"
    },
    text:{
        fontWeight:"bold",
        color: "#2980b9"
    },
    title:{
        fontWeight:"bold",
        fontSize:18,
    },
    address:{
        fontSize:16,
        paddingHorizontal:10,
        paddingVertical:10,
        fontWeight:"bold",
        color: "#34495e",
        
    },
     customBtn: {
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         borderWidth: 2,
         borderRadius: 5,
         borderColor: "#2ecc71",
         backgroundColor: "#2ecc71",
         paddingTop: 5,
         paddingBottom: 5,
         marginTop:20
     },
     paid:{
          paddingHorizontal: 20,
          paddingVertical: 5, 
          borderRadius: 5, 
          color: "#fff",
     }
})

export default DeliveryDetails
