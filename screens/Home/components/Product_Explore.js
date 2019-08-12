import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableWithoutFeedback} from 'react-native';

class Product_Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <TouchableWithoutFeedback onPress={()=>this.props.onProductSelect()}>
        <View style={styles.container}>
            <View style={styles.imagewrapper}>
                <Image style={styles.image} source={require("../product_images/prayerbeads.jpg")}/>
            </View>
            <View style={styles.details}>
                <Text style={{fontWeight:"bold",fontSize:18}}>Awesome Name</Text>
                <Text style={{color:"#7f8c8d"}}>Category</Text>
                <Text style={{color:"#2ecc71",fontSize:20,alignSelf:"flex-end"}}>$10</Text>
            </View>
        </View>
    </TouchableWithoutFeedback> 
    );
  }
}
const styles=StyleSheet.create({
    container:{
      paddingBottom:5,
      backgroundColor:"#fff",
      width:180,
      marginVertical:5,
      marginHorizontal:5,
      borderRadius:15,
      overflow:"hidden",
      elevation:3
    },
    image:{
       width:180,
       height:250,
       resizeMode:"cover"
    },
    details:{
        paddingHorizontal:10
    }
})

export default Product_Explore;
