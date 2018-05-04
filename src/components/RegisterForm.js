import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, registerUser } from '../store/actions';
import firebase from 'firebase';
import { Content, 
  Form, 
  Item, 
  Input,
  Button,
  Spinner, 
  Text,
  Toast 
} from 'native-base';

class RegisterForm extends Component {
  
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text){
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.registerUser({email,password});
  }
  
  renderButtonOrSpinner() {
    if (this.props.loading) {
      return <Spinner color='white' />;
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
        <Text> Cadastrar </Text>
      </Button>
    );
  }

  renderError(){
    if(this.props.error){
      return(
        <Text>{this.props.error}</Text>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}> 
        <Content> 
          <Form>
            <Item 
              last 
              rounded 
              style={{ backgroundColor: 'rgb(255,255,255)', marginTop: 10, borderRadius: 20 }}
            >
              <Input
                placeholder="Email"
                autoCorrect={false}
                value={this.props.email}
                onChangeText={this.onEmailChange.bind(this)}
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
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </Item>
            {this.renderButtonOrSpinner()}  
          </Form>
        </Content>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};
export default connect(mapStateToProps, {
  emailChanged, passwordChanged,registerUser
})(RegisterForm);