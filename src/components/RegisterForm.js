import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, nameChanged, registerUser } from '../store/actions';
import firebase from 'firebase';
import { Content, 
  Form, 
  Item, 
  Input,
  Button,
  Spinner, 
  Text,
  Toast, 
  Container
} from 'native-base';

class RegisterForm extends Component {
  
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text){
    this.props.passwordChanged(text);
  }

  onNameChange(text){
    this.props.nameChanged(text);
  }
  onButtonPress() {
    const { email, password, name } = this.props;
    this.props.registerUser({email,password,name});
  }
  
  renderButtonOrSpinner() {
    if (this.props.loading) {
      return <Spinner color='blue' />;
    }
    
    return (
      <Button
        
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
        <Text> Cadastrar </Text>
      </Button>
    );
  }

  renderSuccessAlert(){
    if(this.props.success){
      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Faça seu login',
        [
          {text: 'OK', onPress: () => {Actions.login()}},
        ]
      )
    }
  }

  renderErrorAlert(){
    if(this.props.error){
        alert(this.props.error);
    }
  }

  render() {
    return (
      <Container style={{ alignItems: 'center' }}> 
        <Content style={{width : '80%', marginTop: 10}}> 
          {this.renderSuccessAlert()}
          {this.renderErrorAlert()}
          <Form>
            <Item 
              last
              style={{ backgroundColor: 'rgb(255,255,255)', marginTop: 10, borderRadius: 10, height: 40 }}
            >
              <Input
                placeholder="Nome"
                value={this.props.name}
                onChangeText={this.onNameChange.bind(this)}
              />
            </Item> 
            <Item 
              last
              style={{ backgroundColor: 'rgb(255,255,255)', marginTop: 10, borderRadius: 10, height: 40 }}
            >
              <Input
                placeholder="Email"
                autoCorrect={false}
                value={this.props.email}
                onChangeText={this.onEmailChange.bind(this)}
                keyboardType='email-address'
              />
            </Item> 
            <Item
              last 
              style={{ backgroundColor: 'rgb(255,255,255)', marginTop: 10, borderRadius: 10, height: 40 }}
            >
              <Input 
                placeholder="Senha"
                secureTextEntry
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </Item>
            {this.renderButtonOrSpinner()} 
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    name: state.auth.name,
    error: state.auth.error,
    loading: state.auth.loading,
    success: state.auth.success
  };
};
export default connect(mapStateToProps, {
  emailChanged, passwordChanged, nameChanged, registerUser
})(RegisterForm);