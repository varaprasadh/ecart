import React, { Component } from 'react';
import { View, Text ,TouchableOpacity} from 'react-native';
import Categories from "./Categories";
import Wrapper from './Wrapper';
import {Ionicons} from "@expo/vector-icons";

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Wrapper noBackground>
            <View style={{flex:1}}>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:20}}>
                    <View>
                        <Text style={{fontWeight:"bold",fontSize:20,color:"#fff"}}>BazarKam</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.closeDrawer()}>
                        <View >
                            <Ionicons name="ios-close" size={50} color="#c0392b"/>
                        </View>
                    </TouchableOpacity>
              </View>
              <Categories/>
            </View>
      </Wrapper>
    );
  }
}

export default Drawer;
