import React, { Component } from 'react';
import { Image, View, TouchableOpacity } from "react-native";
import { Container, Content, Text, List, ListItem, Left, Icon, Body, Right, Separator } from "native-base";
import { logoutUser, getUserData } from '../store/actions';
import { connect } from 'react-redux';

class DrawerMenu extends Component {

  onPressAction(route){
      if(route == "Sair"){
          return this.props.logoutUser();
      }
  }

  componentWillMount(){
    this.props.getUserData();
  }
    
  render() {
    return (
        <Container>
            <Content padder>
                <List style={{marginTop: 30}}>
                    <TouchableOpacity>
                        <ListItem icon>
                            <Body>
                                {this.props.userData && <Text>{this.props.userData.name}</Text> }
                            </Body>
                        </ListItem>
                    </TouchableOpacity>
                    <ListItem icon>
                        <Left>
                            <Icon name="ios-log-out" style={{fontSize: 25}}/>
                        </Left>
                        <Body>
                            <Text>Sair</Text>
                        </Body>
                    </ListItem>       
                </List>
            </Content>
        </Container>
    );
  }
}

const mapStateToProps = state => {
    return {
        userData: state.auth.userData        
   }
}

export default connect(mapStateToProps,{
    logoutUser, getUserData,
  })(DrawerMenu);