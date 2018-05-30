import React, { Component } from 'react';
import { View , TouchableOpacity } from "react-native";
import { 
    Card, 
    CardItem, 
    Thumbnail, 
    Text, 
    Button, 
    Icon, 
    Left, 
    Body, 
    Right,
    Image,
    Container,
    Content,
    Spinner,
    Separator,
    List,
    ListItem
} from 'native-base';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class HomeScreen extends Component {



    render(){
        return(
            <Container>
                {this.props.userData &&
                    <View style={{height: 100, width: '100%', backgroundColor: '#807DFF'}}>
                        <Text note style={{color: '#FFFFFF', textAlign:'center', fontSize: 18}}>Bem vindo(a),{'\n'}</Text>
                        <Text note style={{color: '#FFFFFF', textAlign:'center', fontSize: 18}}>{this.props.userData.name}</Text>
                    </View>
                }
                <Content style={{backgroundColor: '#FFFFFF'}}>
                    {this.props.userData == null
                        ? <Spinner color="#415ECC"/>
                        : 
                        <Grid style={{padding:20}}>
                            <Row>
                                <Col>
                                    <Text note style={{textAlign:'center', fontSize: 30, fontWeight: 'bold', color: '#807DFF'}}>{this.props.userData.points}</Text>
                                    <Text note style={{textAlign:'center', fontSize: 12}}>pontos</Text>
                                </Col>
                                <Col>
                                    <Text note style={{textAlign:'center', fontSize: 30, fontWeight: 'bold', color: '#807DFF'}}>{this.props.userData.ratingCount}</Text>
                                    <Text note style={{textAlign:'center', fontSize: 12}}>avaliações</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Text note style={{textAlign:'center', fontSize: 30, fontWeight: 'bold', color: '#807DFF'}}>{this.props.userData.loginCount}</Text>
                                    <Text note style={{textAlign:'center', fontSize: 12}}>logins</Text>
                                </Col>
                                <Col>
                                    <Text note style={{textAlign:'center', fontSize: 30, fontWeight: 'bold', color: '#807DFF'}}>{this.props.userData.badges.length}</Text>
                                    <Text note style={{textAlign:'center', fontSize: 12}}>medalhas</Text>
                                </Col>
                            </Row>
                        </Grid>
                    }
                    <Separator/>
                    <List>
                        <ListItem button onPress={() => {Actions.listScreen()}}>
                            <Left>
                                <Text note style={{fontSize: 11}}>Avalie a acessibilidade de locais.{"\n"}Ganhe pontos!</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button onPress={() => {Actions.searchScreen()}}>
                            <Left>
                                <Text note style={{fontSize: 11}}>Pesquise novos locais.</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem button onPress={() => {Actions.badgeScreen()}}>
                            <Left>
                                <Text note style={{fontSize: 11}}>Descubra recompensas.{"\n"}Aumente sua coleção.</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
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
export default connect(mapStateToProps,{})(HomeScreen);