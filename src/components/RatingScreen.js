import React, { Component } from 'react';
import { Button,Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';

const questions = [
    {
        id: 1,
        title: 'Ambiente adequado para manobras da cadeira de rodas'
    },
    {
        id: 2,
        title: 'Banheiro acessivel'
    }
]

class RatingScreen extends Component{

    render(){
        return(
            <Container>
                <View>
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        dataSource={questions}
                        renderItem={item =>
                         <Card style={{ elevation: 3 }}>
                            <CardItem>
                              <Left>
                                <Body>
                                  <Text>{item.title}</Text>
                                </Body>
                              </Left>
                            </CardItem>
                          </Card>
                        }
                    
                    />
                </View>

                <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
                    <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
                        <Icon name="arrow-back" />
                        <Text>Swipe Left</Text>
                    </Button>
                    <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
                        <Icon name="arrow-forward" />
                        <Text>Swipe Right</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

export default RatingScreen;