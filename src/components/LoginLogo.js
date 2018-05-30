import React, { Component } from 'react';
import { Content, Container, H1, Text } from 'native-base';
import {
  Image
} from 'react-native';
class Logo extends Component {
 
    render() {
      return ( 
        <Container 
          style={{ 
                  maxHeight: '30%',
                  padding: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20 
                }}
        >
            <Content>
                {/* <Image
                  source={require('../assets/logo2.png')}
                  style={{height: 100, width: 100, alignSelf: 'center'}}
                /> */}
                <H1 style={{color: '#FFFFFF', fontSize: 30, fontWeight: 'bold'}}>Adapc</H1>
                {/* <Text style={{color: '#FFFFFF', fontSize: 16}}>Avaliação de acessibilidade para cadeirantes</Text> */}
            </Content>
        </Container>
      );
    }
  }
  
  export default Logo;
