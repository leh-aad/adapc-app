import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { getNearPlaces, updateLoginCount } from '../store/actions';
import PlaceItem from './PlaceItem';
import { FIRST_LOGIN, FIFTH_LOGIN } from '../store/actions/types';
var _ = require('lodash');

class PlaceList extends Component {

  componentWillMount(){
    this.props.getNearPlaces();   
  }

  medal(){
    const { medal } = this.props;
    switch(medal){
      case FIRST_LOGIN:
        console.log('1st login')
      case FIFTH_LOGIN:
        console.log('5th login')
      default:
        return;
    } 
  }
  
  renderFlatList = () => {
    if(this.props.place_list){
      return(
          <FlatList
            data={this.props.place_list}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>{
              return (
                <PlaceItem item={item}/>
              )
           }}
          />
      )
    }
  }

  render() {
    this.medal();
    return (
      <View>
          {this.props.loading &&
            <Spinner color='blue'/>
          }
          {this.renderFlatList()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    place_list: state.place.place_list,
    loading: state.place.loading,
    userData: state.auth.userData,
    medal: state.game.medal  
  };
};

export default connect(mapStateToProps,{
  getNearPlaces, updateLoginCount
})(PlaceList);