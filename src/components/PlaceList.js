import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Spinner, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { getNearPlaces, updateLoginCount } from '../store/actions';
import { FIRST_LOGIN, FIFTH_LOGIN, TENTH_LOGIN, POINTS_100 } from '../store/actions/types';
import Modal from "react-native-modal";
import PlaceItem from './PlaceItem';
var _ = require('lodash');
class PlaceList extends Component {

  state = {
    visibleModal: false,
    modalText : '',
    medalPath : '' 
  };

  componentWillMount(){
    this.props.getNearPlaces();
  }

  componentWillReceiveProps(next){
    if(this.props.medal == FIRST_LOGIN){
      this.setState({
        visibleModal: true, 
        modalText: 'Voce ganhou disahuahdau',
        medalPath: '../assets/key.jpg'
      });
    }
    if(this.props.medal == FIFTH_LOGIN){
      this.setState({visibleModal: true, modalText: 'Parabens! Voce ganhou uma medalha por logar pela quinta vez'});
    }
    if(this.props.medal == TENTH_LOGIN){
      this.setState({visibleModal: true, modalText: 'Parabens! Voce ganhou uma medalha por logar pela decima vez'});
    }
    if(this.props.medal == POINTS_100){
      this.setState({visibleModal: true, modalText: 'Parabens! MEDALHA 100'});
    }
  }

  _renderButton = (onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={{
            padding: 5,
            borderRadius: 50,
            borderColor: "rgba(0, 0, 0, 0.1)",
            alignSelf: "flex-end"
      }}>
        <Icon name="close" style={{fontSize: 20}}/>
      </View>
    </TouchableOpacity>
  );
  _renderModalContent = () => (
        <View style={{    
            backgroundColor: "white",
            padding: 10,
            paddingBottom: 20,
            borderRadius: 4,
            borderColor: "rgba(0, 0, 0, 0.1)"
          }}
        >
           {this._renderButton(() => this.setState({ visibleModal: false }))}
         
          <Text style={{fontSize: 15, textAlign: "center"}}>Parabens!</Text>
          <Text style={{fontSize: 15, textAlign: "center"}}>{this.state.modalText}</Text>
         
          <Image 
            style={{width: 100, height: 100, alignSelf: 'center', margin: 5}}
            source={require(this.state.medalPath)}>
          </Image>
      </View>
  );  
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

  render(){
    return (
      <View>
        <View>
          {this.props.loading && <Spinner color='blue'/> }
          {this.renderFlatList()}
        </View>
        <Modal isVisible={this.state.visibleModal}> 
          {this._renderModalContent()}
        </Modal>
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