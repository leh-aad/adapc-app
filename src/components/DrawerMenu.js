import React, { Component } from 'react';
import { Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import { Actions } from 'react-native-router-flux';

const routes = ["Perfil", "Sair"];

class DrawerMenu extends Component {

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
                        button>
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

export default DrawerMenu;