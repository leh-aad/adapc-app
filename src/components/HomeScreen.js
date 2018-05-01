import React, { Component } from 'react';
import { Container, 
    Header, 
    Title, 
    Content, 
    Footer, 
    FooterTab, 
    Button, 
    Left, 
    Right, 
    Body, 
    Icon, 
    Text 
} from 'native-base';
import PlaceList from './PlaceList';

class HomeScreen extends Component {

    render() {
      return ( 
        <Container>
            <Content>
                {/* <Header style={{backgroundColor: '#807DFF'}}>
                    <Left>
                        <Button transparent><Icon name='menu' /></Button>
                    </Left>
                    <Body>
                        <Title>Nas proximidades</Title>
                    </Body>
                </Header> */}
                <PlaceList/>
            </Content>
        </Container>
      );
    }
  }
  
  export default HomeScreen;
