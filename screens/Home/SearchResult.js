import React, { Component } from 'react';
import { View, Text,StyleSheet,ScrollView } from 'react-native';
import Wrapper from './Wrapper';
import Products from './components/Products';
import Header from '../major_components/Header';

import {connect} from 'react-redux';
class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
        query:props.navigation.getParam('query'),
    };
  }
  componentWillMount(){
   this.props.loadResults();
  }
 componentDidMount(){
    this.props.toggleGlobalIntent(false);
 }
 componentWillUnmount(){
    this.props.toggleGlobalIntent(true);
    this.props.emptyResultSet();
 }
  onProductSelect(product){
      
      this.props.setCurrentProduct(product);
      this.props.navigation.push('ProductResult');
  }
  render() {
    return ( 
      <Wrapper>
        <View style={{marginTop:-10,marginBottom:40}}>
            <Header title="results" backbutton backHandler={this.props.navigation.goBack}/>
              <ScrollView>
                <Products notitle
                    products={this.props.items}
                    onProductSelect={this.onProductSelect.bind(this)}
                />
              </ScrollView>
        </View>
      </Wrapper>
    );
  }
}

mapState=state=>{
    let {Search} = state; 
    return {
       items:Search.products,
       loading:Search.loading
    }
}
mapDispatch=dispatch=>{
    return {
      toggleLoading:()=>{dispatch({type:"TOGGLE_SEARCH_LOADING"})},
      loadResults:()=>{dispatch({type:"LOAD_RESULTS"})},
      toggleGlobalIntent:(value)=>{dispatch({type:"CHANGE_CURRENT",value})},
      emptyResultSet:()=>{dispatch({type:"EMPTY_THE_RESULTS"})},
      setCurrentProduct:(product)=>{dispatch({type:"SET_CURRENT_PRODUCT",product})}
    }
}
export default connect(mapState,mapDispatch)(SearchResult);
