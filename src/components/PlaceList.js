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
import { getNearPlaces } from '../store/actions';
import PlaceItem from './PlaceItem';
var _ = require('lodash');

class PlaceList extends Component {

  componentWillMount(){
    this.props.getNearPlaces();
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
    loading: state.place.loading
  };
};

export default connect(mapStateToProps,{
  getNearPlaces
})(PlaceList);