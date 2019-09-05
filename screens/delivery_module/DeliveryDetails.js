import React, { Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    CheckBox,
    ImageBackground,
    Alert,
    ScrollView
} from 'react-native'
import Wrapper from '../Home/Wrapper';
import Header from '../major_components/Header';
import { OrderItemsTable } from '../Home/ProfileScreens/OrderItemDetail';

import {connect} from "react-redux";
import { showMessage } from 'react-native-flash-message';
import Loader from '../major_components/Loader';


export class DeliveryDetails extends Component {
    constructor(props){
        super(props);
        let Morder=this.props.navigation.getParam('order');
        let index = this.props.navigation.getParam('index');
        console.log("\n\n\n",index);
        let billing_address=Morder.billing_address||{}
        let order =Morder.order;
        let products= Morder.products;
        this.state={
           billing_address,
           order,
           products,index
        }
        console.log(Morder);
    }
    confirmDelivery(){
       Alert.alert("confirmation", "the order will be marked as delivered, do you want to proceed?", [{
           text: 'Cancel',
           type: 'cancel'
       }, {
           text:"proceed",
           onPress: () => this.processOrder('Delivered')
       }]);
       /*
       {
           "order_id": 99,
           "status": "Delivered"
       }
       */
    }
    cancelDelivery(){
      Alert.alert("confirmation", "the order will be marked as delivered, do you want to proceed?", [{
           text: 'Cancel',
           type: 'cancel'
       }, {
           text:"proceed",
           onPress: () => this.processOrder('Cancelled')
       }]);
       
    }
    processOrder(status){
         console.log(status);

            let obj = {
                status: status,
                order_id: this.state.order.id
            }
            this.setState({
                loading: true
            });
            // fetch(`${this.props.baseUrl}/deliver_order`, {
            //     method: "POST",
            //     headers: {
            //         "AUTH_TOKEN": this.props.AUTH_TOKEN,
            //         "content-Type":"application/json"
            //      }, 
            //     body: JSON.stringify(obj)
            // }).then(res => res.json()).then(data => {
            //     console.log(data);
            //     if (data.success == true) {
                
            //         showMessage({
            //             type: "success",
            //             message: "success",
            //             description: `order ${status} successfully`,
            //             autoHide: true
            //         });
            //         this.props.modifyStatus(this.state.index,status);
            //         this.setState({
            //             order:{...this.state.order,status}
            //         });
            //     }else{
            //          showMessage({
            //             type:"danger",
            //             message: "failed",
            //             description: `order ${status} failed,try again later`,
            //             autoHide: true
            //         });
            //     }
            //     this.setState({
            //         loading:false
            //     })
            // }).catch(err=>{
            //     this.setState({
            //         loading:false
            //     });
            // });
          this.setState({
              loading:false 
          })
          this.props.modifyStatus(this.state.index, status);
            this.setState({
                order:{...this.state.order,status}
            });

    }
    render() {
        let first_name=this.state.billing_address.first_name||'';
        let last_name=this.state.billing_address.last_name||'';
        let mobile=this.state.billing_address.phone_number||'';
        let order = this.state.order
        let delivered = /delivered/i.test(order.status);
        let pending = /pending/i.test(order.status);
        let cancelled = /cancelled/i.test(order.status);
        let deliveredOn = order.updated_at.split('T')[0];
        return (
            this.state.loading?<Loader/>:
            
           <Wrapper>
             <Header title="delivery details"  backbutton backHandler={()=>this.props.navigation.goBack()}/>
             <ImageBackground source={require('../images/backgroundimage.jpg')} style={{width:"100%",height:"100%"}}>
              <View style={{flex:1}}>
              <ScrollView style={{flex:1}}>
              <View style={[styles.container,{paddingBottom:100}]}>
                <View style={{flexDirection:"row",paddingVertical:20,...styles.main}}>
                  <View style={{flex:1}}>
                        <View style={styles.frow}>
                            <Text style={styles.label}>Order ID:</Text>
                            <Text style={styles.text}>{this.state.order.id}</Text>
                        </View>
                        <View style={styles.frow}>
                            <Text style={styles.label}>Customer Name:</Text>
                            <Text style={styles.text}>{first_name+" "+last_name}</Text>
                        </View>
                        <View style={styles.frow}>
                            <Text style={styles.label}>Mobile Number:</Text>
                            <Text style={styles.text}>{mobile}</Text>
                        </View>
                        {
                        delivered &&
                        <View style={styles.frow}>
                            <Text style={styles.label}>Delivered On</Text>
                            <Text style={styles.text}>{deliveredOn}</Text>
                        </View>}
                    </View>
                    <View>
                        <View style={styles.amount}>
                            <Text style={{color:"#27ae60"}}>total Amount</Text>
                            <Text style={{color:"#27ae60",fontWeight:"bold",fontSize:16}}>{Number(this.state.order.total_price).toFixed(3)} KD</Text>
                        </View>
                       <View style={{alignItems:"center"}}>
                           <Text style={[{fontWeight:"bold",color:"#fff",paddingHorizontal:20,paddingVertical:10,marginTop:10},
                             delivered ? {backgroundColor:"#27ae60"} : pending ?{backgroundColor:"#e67e22"} : cancelled ? {backgroundColor:"#e74c3c"} : {}
                             ]}>{delivered?"Delivered":pending?"Pending":cancelled?"Cancelled":""}</Text>
                       </View>
                    </View> 
                </View>
                <View style={styles.address}>
                    <Text style={styles.title}>Address:</Text>
                    <View>
                       <View style={[styles.frow,styles.adrstyles]}>
                           <Text style={styles.label}>Area :</Text>
                           <Text style={styles.adrtext}>{this.state.billing_address.area||""}</Text>
                       </View>
                       <View style={[styles.frow,styles.adrstyles]}>
                           <Text style={styles.label}>Street :</Text>
                           <Text style={styles.adrtext}>{this.state.billing_address.street||""}</Text>
                       </View>
                       <View style={[styles.frow,styles.adrstyles]}>
                           <Text style={styles.label}>Block :</Text>
                           <Text style={styles.adrtext}>{this.state.billing_address.block||""}</Text>
                       </View>
                       <View style={[styles.frow,styles.adrstyles]}>
                           <Text style={styles.label}>Lane :</Text>
                           <Text style={styles.adrtext}>{this.state.billing_address.lane||""}</Text>
                       </View>
                    </View>
                </View>
                <View style={styles.itemtable}>
                    <Text style={styles.title}>Contents :</Text>
                    <OrderItemsTable items={this.state.products}/>
                </View>
                {
                  pending &&
                  <View>
                    <View style={styles.controls}>
                        <Text style={styles.label}>if order is successfully delivered to the customer.</Text>
                        <TouchableOpacity
                            style={[styles.customBtn,]}
                            onPress={this.confirmDelivery.bind(this)}
                            >
                            <Text 
                                style={[{color:"white",fontWeight:"bold"}]}>CONFIRM DELIVERY</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.controls,{marginVertical:10}]}>
                        <Text style={styles.label}>if Order is not Deliverable.</Text>
                        <TouchableOpacity
                            style={[styles.customBtn,{backgroundColor:"#e74c3c"}]}
                            onPress={this.cancelDelivery.bind(this)}
                            >
                            <Text 
                                style={[{color:"white",fontWeight:"bold"}]}>CANCEL DELIVERY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
              </View>
             </ScrollView>
            </View>
            </ImageBackground>
           </Wrapper>
        )
    }
}
const styles=StyleSheet.create({
    frow:{
        flexDirection:"row",
        padding:5
    },
    main:{
        backgroundColor:"#fff",
        marginVertical:10,
        borderRadius:5
    },
    
    container:{
        paddingVertical:20
    },
    itemtable:{
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 5,
    padding: 10

    },
    adrstyles:{
        borderBottomWidth:1,
        borderBottomColor: "#7f8c8d"
    },
    adrtext:{
        fontWeight:"bold",
        color: "#2980b9"
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
       color: "#7f8c8d",
       fontWeight:"bold"
    },
    text:{
        fontWeight:"bold",
        color: "#27ae60" 
    },
    title:{
        fontWeight:"bold",
        fontSize:18,
        color: "#2c3e50",
        padding:5
    },
    address:{
        fontSize:16,
        paddingHorizontal:10,
        paddingVertical:10,
        fontWeight:"bold",
        color: "#34495e",
        backgroundColor: "#fff",
        borderRadius:5
    },
     customBtn: {
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         borderRadius: 5,
         backgroundColor: "#2ecc71",
         paddingTop: 5,
         paddingBottom: 5,
         marginTop:20
     },
     controls:{
         backgroundColor:"#fff",
         marginTop:10,
         padding:10,
         borderRadius:5,
     }
})

mapState=state=>{
    return {
        baseUrl: state.Config.base_url,
        AUTH_TOKEN: state.Config.AUTH_TOKEN
    }
}
mapDispatch=dispatch=>{
    return {
        modifyStatus:(index,status)=>{dispatch({type:"MODIFY_STATUS",index,status})}
    }
}
export default connect(mapState,mapDispatch)(DeliveryDetails);
