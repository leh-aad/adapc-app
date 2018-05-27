import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image
} from 'react-native';
import { 
  Container, 
  Header, 
  Content, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Button, 
  Icon, 
  Left, 
  Body, 
  Right,
  Badge,
  Label,
  Spinner,
  Separator
} from 'native-base';
import { connect } from 'react-redux';
import Badges from '../assets/index';
class BadgesScreen extends Component{
  
  state = {
    badges: []
  }

  componentWillReceiveProps(next){
    this.setState({badges: next.userData.badges})
  }
  
  render(){
    const { userData, leaderboard } = this.props;
    return(
      <Container>
        <Content>
          <Card style={{flex:0}}>
            <CardItem bordered>
              <Text note>Pontuação atual: </Text>
              {userData && <Text>{userData.points}</Text>}
            </CardItem >
            <CardItem bordered style={{flexWrap: 'wrap'}}>
            <Text note style={{width: '100%'}}>Sua coleção:</Text>
              {
                this.state.badges.map((b,i) => {
                  return(
                    <Image  key={i} style={{width: 60, height: 60, margin: 5}}
                    source={Badges[b.path]}/>  
                  )
                })
              }
            </CardItem>
          </Card>
          <Separator/>
          <Card>
            <CardItem bordered>
              <Text note>Posição no ranking de avaliações: </Text>
            </CardItem>
            <CardItem bordered>
              <Text note>TOP 5: </Text>
              {
                leaderboard && 
                leaderboard.map((rank,i) => {
                  return(
                    <Text key={i}>{i} {rank.name} {rank.points}</Text>
                  )
                })
              }
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return{
    userData: state.auth.userData,  
    leaderboard: state.game.leaderboard
  };
};

export default connect(mapStateToProps,{})(BadgesScreen);