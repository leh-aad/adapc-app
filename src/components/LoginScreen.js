import React, { Component } from 'react';
import { Content, Container } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import LoginForm from './LoginForm';
import Logo from './LoginLogo';


class LoginScreen extends Component {

    render() {
      return ( 
        <Container>
          <LinearGradient 
            colors={['#FFFFFF', '#B8C2E5', '#415ECC']} 
            locations={[0, 0.45, 1]}
            style={styles.linearGradient}
          >
            <Content >
                <Logo />
                <LoginForm />
            </Content>
          </LinearGradient>
        </Container>
      );
    }
  }
  
  export default LoginScreen;

  const styles = ({
    linearGradient: {
      flex: 1
    }
  });