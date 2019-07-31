//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView} from 'react-native';
import Header from "../../major_components/Header";
import Ship_AdressComponent from "./components/Ship_AddressComponent";
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddAddressModal from "./components/AddAddressModal";


// create a component
class ShippingAddress extends Component {
    constructor(props){
        super(props);
        this.state={
            addresses:[
                {
                    title:"home Address",
                    selected:true
                },{
                    title:"Office Address"
                }
            ],
            modalVisible:false
        }
        this.closeDialog=this.closeDialog.bind(this);
        this.openDialog=this.openDialog.bind(this);
    } 


    onSelect(index){
       newAddress=this.state.addresses.map((address,i)=>{
          if(i==index){
              address.selected=true;
          }
          else{
            address.selected=false;
          }
          return address
       });
       console.log(newAddress);
      this.setState({
          addresses:newAddress
      })
    }

    content="21, Alex Davidson Avenue,Opposite Omegatron, Vicent Smith Quarters, Victoria Island, Lagos, Nigeria"
    
    openDialog(){
    
             this.setState({
                 modalVisible:true
             })
    }
    closeDialog(){
             this.setState({
                 modalVisible:false
             })
    }  
    onAddAddress({title,content}){
        addresses = this.state.addresses;
        addresses.push({title,content});

        this.setState({
             addresses
        });

        console.log("founs",title,content)
        this.closeDialog()
    }

     render() {
        
        modalVisible=this.state.modalVisible;
       
        return (
            <View style={styles.container}>
            <Header backbutton title="Shipping Address" goBack={this.props.navigation.goBack.bind(this)} />
            <ScrollView style={{flex:1}}>
            { this.state.addresses.map((obj,index)=>{
            // console.log("update",obj,index)
            return (<Ship_AdressComponent label={obj.title} 
                content={this.content} 
                key={index}  
                id={index} 
                selected={obj.selected?true:false}
                onSelect={this.onSelect.bind(this)}/>)}) 
            }
            </ScrollView> 
            <View style={{alignItems:"center",justifyContent:"center",paddingVertical:10}}>
              <TouchableOpacity  style={styles.addnew_btn} onPress={this.openDialog}>
                  <Text style={{fontSize:18,color:"#fff"}}>ADD NEW</Text>
              </TouchableOpacity>
            </View>
            <AddAddressModal onAddAddress={this.onAddAddress.bind(this)} visible={modalVisible} onCancel={this.closeDialog}/>
            </View>
          
        );
    }
}

 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:20
    },
    addnew_btn:{
        alignItems:"center",
        paddingHorizontal:30,
        paddingVertical:10,
        justifyContent:"center",
        backgroundColor:"#27ae60",
        borderRadius:10,
        elevation:3,
    }
});

//make this component available to the app
export default ShippingAddress;
