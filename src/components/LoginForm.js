import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Content, 
  Form, 
  Item, 
  Input,
  Button,
  Spinner, 
  Text } from 'native-base';

import { Col, Grid } from 'react-native-easy-grid';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', loading: false };
  } 
  
  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });  
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onLoginSucess() {
    this.setState({
      email: '',
      password: '',
      error: 'Logado!',
      loading: false
    });
  }

  onLoginFail() {
    this.setState({ 
      error: 'Erro de autenticação', 
      loading: false 
    });
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <Spinner color='blue' />;
    }
    
    return (
      <Button
        rounded
        onPress={this.onButtonPress.bind(this)}
        full  
        style={{ 
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: '#807DFF',
          marginTop: 10
        }}
      >
        <Text> Enviar </Text>
      </Button>
    );
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}> 
        <Content style={{ maxWidth: '80%' }}> 
          <Form>
            <Item 
              last 
              rounded 
              style={{ backgroundColor: 'rgb(255,255,255)', marginTop: 10, borderRadius: 20 }}
            >
              <Input
                placeholder="Email"
                autoCorrect={false}
                value={this.state.email} 
                onChangeText={email => this.setState({ email })}
              />
            </Item> 
            <Item 
              rounded 
              last 
              style={{ 
                backgroundColor: 'rgb(255,255,255)', 
                marginTop: 10, 
                borderRadius: 20 
              }}
            >
              <Input 
                placeholder="Senha"
                secureTextEntry
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            {this.renderButtonOrSpinner()}  
          </Form>
          
          <Grid>
            <Col style={{ width: '50%' }}>
              <Button transparent light style={{ alignItems: 'flex-start' }}>
               <Text style={{ fontSize: 11 }}>Cadastre-se aqui!</Text>
              </Button> 
            </Col>
            <Col style={{ width: '60%' }}>
              <Button transparent light style={{ alignItems: 'flex-start' }}>
               <Text style={{ fontSize: 10 }}>Esqueceu sua senha?</Text>
              </Button> 
            </Col>
          </Grid>
        </Content>
      </View>
    );
  }
}
