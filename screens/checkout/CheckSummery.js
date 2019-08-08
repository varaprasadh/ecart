import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity} from 'react-native'
import Wrapper from '../Home/Wrapper';
import Header from '../major_components/Header';
import {OrderItemsTable} from "../Home/ProfileScreens/OrderItemDetail"
export class CheckSummery extends Component {
    constructor(props){
        super(props);
        this.state={
            payType:"cod",
            address:"lorem ipsum intonssdsssgggwg sgknsg sgsgs sgsg sgsgg sgsg",
            cardNum:"1234567890123456",
            cardName:"john doe"
        }
    }
    render() {
        return (
            <Wrapper>
                <View style={{marginTop:-10,flex:1}}>
                 <Header title="summery" backbutton backHandler={this.props.navigation.goBack}/>
                 <View style={{paddingVertical:20,paddingHorizontal:10}}>
                     <View style={styles.row}>
                         <Text style={styles.label}>payment type:</Text>
                         <Text style={styles.styledlabel}>{this.state.payType!="cod"?"card":"cash on delivey"}</Text>
                     </View>
                    { this.state.payType!="cod"?(
                        <View style={{borderBottomWidth:1,borderBottomColor:"#7f8c8d"}}>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}} >
                           <Text style={styles.label}>card number:</Text>
                           <Text>{"****".repeat(3)+this.state.cardNum.substr(-4)}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                           <Text style={styles.label}>name on card:</Text>
                           <Text>{this.state.cardName}</Text>
                        </View>
                     </View>
                    ):null
                    }
                     <View style={styles.row}>
                         <Text style={styles.label}>Address:</Text>
                         <Text style={styles.address}>{this.state.address}</Text>
                     </View>
                 </View>
                 <View>
                     <OrderItemsTable/>
                 </View>
                 <View className="bottombar" style={styles.checkouttab}>
                       <TouchableOpacity 
                            style={[styles.btn,{backgroundColor:"#fff",borderWidth:1,borderColor:"#2ecc71"}]} 
                            onPress={()=>this.props.navigation.goBack()}
                           >
                               <Text style={{color:"#2ecc71",fontWeight:"bold"}}>BACK</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={[styles.btn,]} 
                            >
                               <Text style={{color:"white",fontWeight:"bold"}}>CONFIRM</Text>
                        </TouchableOpacity>   
                    </View>
                </View>
            </Wrapper>
        )
    }
}

 const styles=StyleSheet.create({
        row:{
            flexDirection:'row',
            justifyContent:"space-between",
            borderBottomColor:"#95a5a6",
            borderBottomWidth:1,
            paddingVertical:5
        },
        label:{
          fontWeight:"bold",
          fontSize:16,
          paddingVertical:5,
          color:"#2980b9"
        },
        address:{
          paddingHorizontal:20,
          paddingVertical:5,
          color:"#2c3e50",
          textTransform:"capitalize"
        },
        styledlabel:{
          paddingHorizontal:10,
          backgroundColor:"#2980b9",
          paddingVertical:4,
          borderRadius:5,
          color:"#fff",
          fontWeight:"bold"
        },
        btn:{
         backgroundColor:"#27ae60",
         justifyContent:"center",
         paddingTop:5,
         paddingBottom:5,
         paddingLeft:40,
         paddingRight:40,
         borderRadius:5,  
         marginRight:20,
         marginLeft:20
        },
         btn_disabled:{
          backgroundColor:"#bdc3c7"
         },
         checkouttab:{
             display:"flex",
             backgroundColor:"#fff",
             height:70,
             flexDirection:"row",
             paddingTop:10,
             paddingBottom:10,
             justifyContent:"space-between",
             elevation:3,
             position:"absolute",
             bottom:0,
             left:0,
             right:0
         },
   
         text:{
             fontWeight:"bold",
             color:"#27ae60",
             paddingHorizontal:5,
     
         }
     })

export default CheckSummery
