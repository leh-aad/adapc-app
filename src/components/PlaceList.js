import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import Modal from "react-native-modal";
import { Spinner, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { getNearPlaces, updateLoginCount } from '../store/actions';
import { FIRST_LOGIN, FIFTH_LOGIN, TENTH_LOGIN, POINTS_100, POINTS_250, POINTS_500,POINTS_750, POINTS_1000 } from '../store/actions/types';
import PlaceItem from './PlaceItem';
import Badges from '../assets/index';

class PlaceList extends Component {

  state = {
    visibleModal: false,
    modalText : '',
    badgePath : null
  };

  componentWillMount(){
    this.props.getNearPlaces();
  }

  componentWillReceiveProps(next){
    if(this.props.medal == FIRST_LOGIN){
      
      this.setState({
        visibleModal: true, 
        modalText: 'Você ganhou um prêmio pelo o seu primeiro acesso!',
        badgePath: Badges.key
      });
    }
    if(this.props.medal == POINTS_100){
      this.setState({
        visibleModal: true, 
        modalText: 'Você adquiriu 100 pontos!',
        badgePath: Badges.p100
      });
    }
    if(this.props.medal == POINTS_250){
      this.setState({
        visibleModal: true, 
        modalText: 'Você adquiriu 250 pontos!',
        badgePath: Badges.p250
      });
    }
    if(this.props.medal == POINTS_500){
      this.setState({
        visibleModal: true, 
        modalText: 'Você adquiriu 500 pontos!',
        badgePath: Badges.p500
      });
    }
    if(this.props.medal == POINTS_750){
      this.setState({
        visibleModal: true, 
        modalText: 'Você adquiriu 750 pontos!',
        badgePath: Badges.p750
      });
    }
    if(this.props.medal == POINTS_1000){
      this.setState({
        visibleModal: true, 
        modalText: 'Você adquiriu 1000 pontos!',
        badgePath: Badges.p1000
      });
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
         
          <Text style={{fontSize: 18, fontWeight: "bold",textAlign: "center"}}>Parabéns!</Text>
          <Text style={{fontSize: 15, textAlign: "center"}}>{this.state.modalText}</Text>
         
          <Image 
            style={{width: 120, height: 120, alignSelf: 'center', margin: 10}}
            source={this.state.badgePath}>
          </Image>
          <Text style={{fontSize: 15, textAlign: "center"}}>Uma nova medalha foi desbloqueada.</Text>
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