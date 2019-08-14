import React, { Component } from 'react';
import { View, Text,Animated,Image,
  ScrollView,StyleSheet,Easing,
  TouchableOpacity,TouchableWithoutFeedback
    } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Wrapper from "./Wrapper";


class ProductMain extends Component {
  constructor(props) {
    super(props);
    this.state={
      product:this.props.navigation.getParam('product'),
      Favourite:true

    }
    this.imgOpacity=new Animated.Value(0);
  } 
 
 componentDidMount(){
  Animated.timing(this.imgOpacity,{
        duration:600,
        toValue:1,
        easing:Easing.ease
      }).start(); 
 }

 
toggleFavourite(){
  this.setState({
    Favourite:!this.state.Favourite
  })
}

  render() {
    return (
      <Wrapper>
        <View style={[styles.container,{marginTop:-10,marginBottom:40}]}>
          <TouchableWithoutFeedback  onPress={()=>this.props.navigation.goBack()}>
          <View style={styles.backBtn}>
              <Ionicons name="ios-arrow-back" size={30}/>
              <Text style={{paddingHorizontal:10}}>Back</Text>
          </View>
          </TouchableWithoutFeedback>
          <ScrollView scrollEventThrottle={16}>
            <Animated.View style={[styles.imageWrapper,{opacity:this.imgOpacity}]}>
               <Image source={this.state.product.img} style={styles.image}/>
               <TouchableWithoutFeedback onPress={this.toggleFavourite.bind(this)}>
                <View style={styles.Favourite}>
                 <Text 
                   style={{paddingHorizontal:10,color:"#e74c3c",fontWeight:"bold"}}>
                   {this.state.Favourite?"Added to Favorite":" Add To Favourite"}
                 </Text>
                 <Ionicons color="#e74c3c" name={this.state.Favourite?"ios-heart":"ios-heart-empty"} size={30} />
                </View>
               </TouchableWithoutFeedback>
            </Animated.View>
            <View style={styles.details}>
               <Text style={styles.pName}>{this.state.product.title}</Text>
               <Text style={styles.pCat}>{this.state.product.category}</Text>
               <Text style={styles.pPrice} >{this.state.product.price}</Text>
               <View style={styles.description}>
                  <Text style={[styles.pCat,{color:"#e74c3c",fontSize:20}]}>Description</Text>
                  <Text style={styles.descText}>{this.state.product.description} </Text>
               </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity><Text style={[styles.btn,styles.action_cart]}>Add to Cart</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.btn}>Buy</Text></TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Wrapper>
    );
  }
}
const styles=StyleSheet.create({
  imageWrapper:{
    height:300,
    position:"relative"
  },
  backBtn:{
   position:"absolute",
   top:20,
   left:10,
   zIndex:10,
   paddingHorizontal:10,
   backgroundColor:"#fff",
   height:50,
   justifyContent:"space-around",
   alignItems:"center",
   borderRadius:50,
   flexDirection:"row"
  },
  Favourite:{
     position:"absolute",
     bottom:20,
     right:10,
     flexDirection:"row",
     alignItems:"center",
     backgroundColor:"#fff",
     borderRadius:10,
     paddingVertical:5,
     paddingHorizontal:10
  },
  image:{
    width:null,
    height:null,
    flex:1,
  },
  pName:{fontSize:22,fontWeight:"bold",color:"#2980b9",textTransform:"capitalize"},
  pCat:{fontWeight:"bold",fontSize:18,color:"#7f8c8d"},
  pPrice:{fontWeight:"bold",color:"green",fontSize:20},
  details:{
    flex:1,
    paddingHorizontal:10,
    paddingVertical:10,
  },
  description:{
      borderTopWidth:1,
      borderTopColor:"#7f8c8d",
      marginVertical:10,
  }, 
  descText:{
     fontSize:18,
     color:"#34495e"
  },
  actions:{flex:1,
         paddingHorizontal:10,paddingVertical:10,
         flexDirection:"row",justifyContent:"space-around",},
  action_cart:{
    borderWidth:1,
    borderColor:"#27ae60",
    backgroundColor:"#fff",
    color:"#27ae60"
  },
  btn:{
    paddingHorizontal:10,
    paddingVertical:10,
    backgroundColor:"#27ae60",
    fontSize:18,
    fontWeight:"bold",
    color:"#fff",
    textAlign:"center",
    borderRadius:5,
    width:150
  }
})

export default ProductMain;
