import React, { Component } from 'react';
import { Content, Container, H1, Text } from 'native-base';

class Logo extends Component {
 
    render() {
      return ( 
        <Container 
          style={{ 
                  height: 250,
                  padding: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20 
                }}
        >
            <Content>
                <H1 style={{color: '#807DFF', fontSize: 30, fontWeight: 'bold'}}>Adapc</H1>
                <Text style={{color: '#807DFF', fontSize: 16}}>Avaliação de acessibilidade para cadeirantes</Text>
            </Content>
        </Container>
      );
    }
  }
  
  export default Logo;
