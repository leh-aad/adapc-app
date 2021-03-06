import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { emailChanged, passwordChanged, loginUser } from '../store/actions';
import firebase from 'firebase';
import { Content, 
  Form, 
  Item, 
  Input,
  Button,
  Spinner, 
  Text,
  Toast, 
  Icon
} from 'native-base';

import { Col, Grid } from 'react-native-easy-grid';

class LoginForm extends Component {
  
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text){
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({email,password});
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
          backgroundColor: '#FFFFFF',
          marginTop: 10
        }}
      >
        <Text style={{color: '#807DFF'}}> Logar </Text>
      </Button>
    );
  }

  renderError(){
    if(this.props.error){
      return(
      <Text style={{color: 'red', textAlign: 'center', fontSize: 15}}><Icon style={{color: 'red', fontSize: 15}}name="exclamation-triangle" type="FontAwesome"/> {this.props.error}</Text>);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}> 
        <Content style={{ maxWidth: '80%' }}> 
          <Form>
            {this.renderError()}
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
          
          <Grid style={{marginTop:10}}>
            <Col style={{ width: '100%' }}>
              <Button 
                transparent 
                light   
                style={{ alignItems: 'flex-start' }}
                onPress={()=>{
                  Actions.register();
                }}
              >
                  <Text style={{ fontSize: 11 }}>Cadastre-se aqui!</Text>
              </Button> 
            </Col>
            <Col>
              {/* <Button transparent light style={{ alignItems: 'flex-start' }}>
               <Text style={{ fontSize: 10 }}>Esqueceu sua senha?</Text>
              </Button>  */}
            </Col>
          </Grid>
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
  emailChanged, passwordChanged,loginUser
})(LoginForm);