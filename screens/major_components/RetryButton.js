import React, { Component } from 'react';
import { View, Text,TouchableOpacity ,StyleSheet} from 'react-native';

class RetryButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
     <TouchableOpacity
        onPress={()=>this.props.onRetry()}
    >
        <Text style={styles.retry}>Retry</Text>
    </TouchableOpacity> 
    );
  }
}
const styles=StyleSheet.create({
    retry: {
        margin: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: "#e74c3c",
        color: "#fff"
    }
})

export default RetryButton;
