//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView} from 'react-native';
import Header from "../../major_components/Header";
import Ship_AdressComponent from "./components/Ship_AddressComponent";
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddAddressModal from "./components/AddAddressModal";
import EmptyItems from "../../major_components/EmptyItems";
import {connect} from "react-redux";

// create a component
class ShippingAddress extends Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible:false
        }
        this.closeDialog=this.closeDialog.bind(this);
        this.openDialog=this.openDialog.bind(this);
    } 

    openDialog(){    
             this.setState({
                 modalVisible:true
             })
    }
    closeDialog(){
             this.setState({
                 modalVisible:false
             });
    }  
    onAddAddress({title,content}){
        addresses = this.state.addresses;
        if(title.trim()!='' && content.trim()!=''){
             this.props.addNewAddress(title, content);
             this.closeDialog()
        }else{
          alert("fill proper details");   
        }
    }
    onDelete(index){
        this.props.deleteSavedAddress(index);
    }

     render() {
        
        modalVisible=this.state.modalVisible;
        console.log(this.props.savedAddress);
        return (
            <View style={styles.container}>
            <Header backbutton title="Shipping Address" backHandler={this.props.navigation.goBack.bind(this)} />
            <ScrollView style={{flex:1}}>
               { this.props.savedAddress.length>0?
                 <View>
                    {this.props.savedAddress.map((obj,index)=>{
                        return (<Ship_AdressComponent label={obj.title} 
                            content={obj.address} 
                            key={index}  
                            id={index} 
                            onDelete={this.onDelete.bind(this)}
                            />)}) 
                   }
                </View>: 
                 <View style={{flex:1,justifyContent:"center"}}>
                     <EmptyItems message="no address added yet! try adding"/>
                </View> } 
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

mapState=state=>{
    let {Addition}=state;
    return {
      savedAddress: Addition.savedAddress
    }
}
mapDispatch=dispatch=>{
    return {
       addNewAddress:(title,address)=>{dispatch({type:"ADD_NEW_ADDRESS",title,address})},
       deleteSavedAddress:(index)=>{dispatch({type:"DELETE_SAVED_ADDRESS",index})}
    }
}
export default connect(mapState,mapDispatch)(ShippingAddress);
