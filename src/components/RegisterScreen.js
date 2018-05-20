import React, { Component } from 'react';
import { Content, Container } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import RegisterForm from './RegisterForm';


class RegisterScreen extends Component {

    render() {
      return ( 
        <Container>
          {/* <LinearGradient 
            colors={['#B8C2E5','#415ECC']} 
            locations={[0, 1]}
            style={{flex:1}}
          > */}
            <Content contentContainerStyle={{marginTop: 20}}>
                <RegisterForm/>
            </Content>
          {/* </LinearGradient> */}
        </Container>
      );
    }
  }
  
export default RegisterScreen;