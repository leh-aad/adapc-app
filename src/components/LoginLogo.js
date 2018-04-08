import React, { Component } from 'react';
import { Content, Container, H1 } from 'native-base';

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
                <H1>[ LOGO ]</H1>
            </Content>
        </Container>
      );
    }
  }
  
  export default Logo;
