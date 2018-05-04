import React, { Component } from 'react';
import { Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import { logoutUser } from '../store/actions';
import { connect } from 'react-redux';
const routes = ["Perfil", "Sair"];

class DrawerMenu extends Component {

  onPressAction(route){
      if(route == "Sair"){
          return this.props.logoutUser();
      }
  }    

  render() {
    return (
        <Container>
            <Content>
            <Image
                source={{
                uri: "./drawer_cover"
                }}
                style={{
                height: 120,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center"
                }}>
            </Image>
            <List
                dataArray={routes}
                renderRow={data => {
                return (
                    <ListItem
                        button
                        onPress={()=>this.onPressAction(data)}
                    >
                        <Text>{data}</Text>
                    </ListItem>
                );
                }}
            />
            </Content>
        </Container>
    );
  }
}
export default connect(null, {
    logoutUser
  })(DrawerMenu);