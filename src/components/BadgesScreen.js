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
import { Col, Grid, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { getUsersByPoints } from '../store/actions';
import Badges from '../assets/index';
class BadgesScreen extends Component{
  
  state = {
    badges: [],
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
                { this.state.badges != 0
                  ?
                  this.state.badges.map((b,i) => {
                    return(
                      <Image  key={i} style={{width: 60, height: 60, margin: 5}}
                      source={Badges[b.path]}/>  
                    )
                  })
                  :
                  <Text>vazio</Text>
                }
            </CardItem>
          </Card>
          <Separator/>
          <Card>
            <CardItem bordered>
              <Text note>Placar de Pontuação</Text>
              
              <Right>
                <TouchableOpacity onPress={() => {this.props.getUsersByPoints()}}>
                  <Icon style={{ fontSize: 18}} name='refresh'/>
                </TouchableOpacity>
              </Right>
              
            </CardItem>
            <CardItem bordered>
               
              <Grid>
              <Row>
                <Col size={15}><Text note style={{fontWeight: 'bold'}}>Pos.</Text></Col>
                <Col size={50}><Text note style={{fontWeight: 'bold'}}>Nome</Text></Col>
                <Col size={30}><Text note style={{fontWeight: 'bold'}}>Pontos</Text></Col>
              </Row>
              {
                leaderboard && 
                leaderboard.map((rank,i) => {
                  if(i<5){
                    return(
                      <Row key={i}>
                        <Col size={15} style={{alignItems: 'center'}}>
                          {i==0 && <Icon name="medal" style={{color:'#FFD700', fontSize: 22}}/>}
                          {i==1 && <Icon name="medal" style={{color:'#C0C0C0', fontSize: 18}}/>}
                          {i==2 && <Icon name="medal" style={{color:'#CD7F32', fontSize: 18}}/>}
                          {i >2 && <Text note style={{textAlign:'center'}}>{i+1}</Text> }
                        </Col>
                        <Col size={50}><Text note>{rank.name}</Text></Col>
                        <Col size={30}><Text note>{rank.points}</Text></Col>
                      </Row>
                    )
                  }
                }) 
              }
              </Grid>
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

export default connect(mapStateToProps,{
  getUsersByPoints
})(BadgesScreen);