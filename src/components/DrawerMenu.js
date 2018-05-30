import React, { Component } from 'react';
import { Image, View, TouchableOpacity } from "react-native";
import { Container, Content, Text, List, ListItem, Left, Icon, Body, Right, Separator, Button } from "native-base";
import { logoutUser, getUserData } from '../store/actions';
import { connect } from 'react-redux';

import Modal from "react-native-modal";

class DrawerMenu extends Component {

  state = {
    visibleModal: false
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
     
      <Text note style={{fontSize: 12, fontWeight: "bold",textAlign: "center", color: '#807DFF'}}>Sobre o aplicativo {"\n"}</Text>
      <Text note style={{fontSize: 10}}>
      O aplicativo Adapc (Avaliação de Acessibilidade para Cadeirantes)
      faz parte de um Trabalho de Conclusão de Curso de graduação, no qual
      propõe a avaliação da acessibilidade para cadeirantes, de diversos locais da sua cidade, 
      levando em consideração aspectos e critérios* de importancia para a locomoção e comodidade necessária a um cadeirante.
      {"\n"}
      </Text>
      <Text note style={{fontSize: 5}}>*Todos os critérios abordados são baseados no Guia prático acessibilidade
            de acordo com a Norma  Brasileira NBR  9050/2004  –  
            Acessibilidade  a  edificações,  
            mobiliário,  espaços  e  equipamentos  urbanos
      </Text>
      </View>
); 
  onLogout = () => {
      this.props.logoutUser();
  }


  render() {
    return (
        <Container style={{backgroundColor: '#807DFF'}}>
            <Content padder >
                <List style={{marginTop: 30}}>
                    <ListItem icon>
                        <Body>
                            {this.props.userData && <Text  style={{color: '#FFFFFF'}}>{this.props.userData.name}</Text> }
                        </Body>
                    </ListItem>
                    <ListItem button icon onPress={() => {this.setState({visibleModal: true})}}>
                        <Left>
                            <Icon name="ios-information-circle-outline" style={{fontSize: 25, color: '#FFFFFF'}}/>
                        </Left>
                        <Body>
                            <Text style={{color: '#FFFFFF'}}>Sobre</Text>
                        </Body>
                        <Modal isVisible={this.state.visibleModal}> 
                            {this._renderModalContent()}
                        </Modal>
                    </ListItem>
                    <ListItem button icon onPress={this.onLogout}>
                        <Left>
                            <Icon name="ios-log-out" style={{fontSize: 25,color: '#FFFFFF'}}/>
                        </Left>
                        <Body>
                            <Text style={{color: '#FFFFFF'}}>Sair</Text>
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
    logoutUser, 
  })(DrawerMenu);