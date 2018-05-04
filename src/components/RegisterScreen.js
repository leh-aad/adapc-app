import React, { Component } from 'react';
import { Content, Container } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import RegisterForm from './RegisterForm';


class RegisterScreen extends Component {

    render() {
      return ( 
        <Container style={{backgroundColor : 'white', flex: 1}}>
            <Content>
                <RegisterForm />
            </Content>
        </Container>
      );
    }
  }
  
export default RegisterScreen;