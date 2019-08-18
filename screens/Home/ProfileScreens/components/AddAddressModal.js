//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Modal,TextInput,TouchableOpacity,Alert} from 'react-native';
// create a component
class AddAddressModal extends Component {

   constructor(props){
       super(props);  
       this.state={
          title:'',
          content:''   
       }
   }
   

   onAddAddress(){    
      if(this.state.title!=''&& this.state.content!=''){
        this.props.onAddAddress(this.state)
      }else{
        Alert.alert("Warning","please enter valid details");
      }
  }
    render() {
      
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.visible}>
                <View style={styles.container}>
                  <Text style={styles.label}>Enter a Address To save</Text>
                  <View style={{paddingHorizontal: 20,paddingVertical:10}}>
                    <View style={styles.inputstyle}>
                      <TextInput 
                        placeholder="enter address type..e.g home " 
                        style={styles.add_type}
                        returnKeyType="next"
                        onChangeText={(text)=>this.setState({title:text})}
                        />
                    </View>  
                    <View style={styles.inputstyle} >
                        <TextInput placeholder="enter address " 
                        multiline={true} 
                        editable={true} 
                        returnKeyType="done"
                        style={[styles.add_type,{height:100,textAlignVertical:"top"}]}
                        onChangeText={text=>this.setState({content:text})}
                        />
                    </View>
                    <View 
                      style={{display:"flex",flexDirection:"row",height:30,marginTop:30}}>
                      <TouchableOpacity 
                          style={[styles.addnew_btn,{backgroundColor:"#e74c3c",flex:1}]}
                          onPress={this.props.onCancel.bind(this)}
                           >
                        <View>
                          <Text style={styles.text} >CANCEL</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={this.onAddAddress.bind(this)}
                        style={[styles.addnew_btn,{flex:1}]} >
                        <View> 
                          <Text style={styles.text}>ADD</Text>
                        </View>   
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
            </Modal> 
        );
    }  

} 



const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#34495e',
    },
    add_type:{
        height:50,
        backgroundColor:"#fff",
        paddingHorizontal:20,
        paddingVertical:5 , 
    },
    inputstyle:{
        borderWidth:2,
        borderColor:"#000",
        marginTop:10,
        borderRadius:2
    },
    addnew_btn:{
        alignItems:"center",
        paddingHorizontal:30,
        paddingVertical:10,
        justifyContent:"center",
        backgroundColor:"#27ae60",
        borderRadius:5,
        elevation:3,
    },
    text:{
      color:"#fff"
    },  
    label:{
      paddingHorizontal:10,
      paddingVertical:5,
      backgroundColor: "#3498db",
      borderRadius:10,
      color:"#fff",
     }
});



export default AddAddressModal;
