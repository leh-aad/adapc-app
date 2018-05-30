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

class ListScreen extends Component {

    render() {
      return ( 
        <Container>
            <Content>
                <PlaceList/>
            </Content>
        </Container>
      );
    }
  }
  
  export default ListScreen;
