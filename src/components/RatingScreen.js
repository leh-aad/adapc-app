import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper'
import { View, Alert, Text } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Actions } from 'react-native-router-flux';

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

    renderFinish(){
        Alert.alert(
            'Avaliação concluida!',
            'Agradecemos sua participação',
            [
              {text: 'OK', onPress: () => {Actions.main()}},
            ]
          )
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <Swiper
                    cards={questions}
                    renderCard={(item) => {
                        return (
                            <View style={{
                                flex: 1,
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: "#E8E8E8",
                                backgroundColor: "white",
                                padding: 20
                            }}>
                                <Text style={{textAlign: 'center'}}>
                                    {item.title}
                                </Text>
                                <AirbnbRating
                                    count={3}
                                    size={35}
                                />
                            </View>
                        )
                    }}
                    verticalSwipe={false}
                    onSwiped={(cardIndex) => {console.log(cardIndex)}}
                    onSwipedAll={() => {this.renderFinish()}}
                    cardIndex={0}
                    stackSize= {3}
                    stackSeparation={20}
                    animateCardOpacity
                    backgroundColor='transparent'
                    cardVerticalMargin={10}
                    cardStyle={{height: '80%'}}
                >
                </Swiper>
            </View>
        );
    }
}

export default RatingScreen;