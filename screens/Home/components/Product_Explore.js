import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableWithoutFeedback,Dimensions} from 'react-native';

const WINDOW_WIDTH=Dimensions.get('window').width;
const ITEM_WIDTH=Math.floor(WINDOW_WIDTH/2)-15;
class Product_Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product:props.product,
    }; 

  } 

  render() { 
    currency = Number(this.state.product.price)<1?"Fils":"KD"

    return (
    <TouchableWithoutFeedback onPress={()=>this.props.onProductSelect(this.props.product)}>
        <View style={styles.container}>
            <View style={styles.imagewrapper}>
                <Image style={styles.image} 
                    source= {this.state.product.img} 
                    />
            </View>
            <View style={styles.details}>
                <Text style={{fontWeight:"bold",fontSize:18}}>{this.state.product.title}</Text>
                <Text style={{color:"#7f8c8d"}}>{this.state.product.category}</Text>
                <Text style={{color:"#2ecc71",fontSize:20,alignSelf:"flex-end"}}>{Number(this.state.product.price).toFixed(3)} {currency}</Text>
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
      width: ITEM_WIDTH,
      // flex:1,
      marginVertical:5,
      marginHorizontal:5,
      borderRadius:15,
      overflow:"hidden",
      elevation:3
    },
    image:{
       width: ITEM_WIDTH,
       height:250,
       resizeMode:"cover"
    },
    details:{
        paddingHorizontal:10
    }
})

export default Product_Explore;
