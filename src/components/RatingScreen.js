import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { View, Alert, Text } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ratingChanged, sendRating, updatePointsRating, checkRateType } from '../store/actions';

const questions = [
    {
        id: 1,
        title: 'Caso haja estacionamento, o mesmo possui vagas reservadas devidamente sinalizadas e de rota acessível'
    },
    {
        id: 2,
        title: 'A área dos ponto de entrada e saída do local fornece rotas acessíveis (Rampas, calçamento rebaixado, deslocamento sem obstáculos, seguro)'
    },
    {
        id: 3,
        title: 'As áreas de circulação do espaço permitem a movimentação segura e confortável, e a execução de manobras equilibradas de pessoas em cadeira de rodas.'
    },
    {
        id: 4,
        title: 'O local dispõe de sanitários adaptados, contendo barras de apoio (e outras medidas de segurança) e lavatório em altura ideal para o cadeirante.'
    },
    {
        id: 5,
        title: 'Caso de  edificações, o acesso a outros andares pode ser feito por meio de rampas e ou elevadores'
    },
    {
        id: 6,
        title: 'Os mobiliários do local, como mesa, balcões, telefones, entre outros, estão em altura acessível para o cadeirante'
    }
]

const rate = 0;

class RatingScreen extends Component{

    constructor (props) {
        super(props)
        this.state = {
            totalRating: 0
        }
    }

    onFinish(){
        const id = this.props.id;
        let rating = (this.state.totalRating / questions.length).toFixed(2);

        if(this.props.rate){
            let newRate = ((Number(this.props.rate) + Number(rating))/2).toFixed(2);
            this.props.sendRating(newRate,id);
        }else{
            this.props.sendRating(rating,id);
        }
        
      this.props.updatePointsRating(this.props.userData.points,this.props.userData.ratingCount);
      this.props.checkRateType(this.props.types, this.props.userData.badges);
       
    }

    renderFinish(){
        Alert.alert(
            'Avaliação concluida!',
            'Agradecemos sua participação',
            [
              {text: 'OK', onPress: () => {Actions.pop()}},
            ]
          )
        this.onFinish();
    }

    ratingCompleted(rating){
        rate = rating;
    }  

    onSwipe = () => {
        this.setState({
            totalRating: this.state.totalRating + rate
        })
        rate = 0;
    }

    render(){
        return(
            <View style={{flex: 1 }}>
                <Swiper
                    cards={questions}
                    renderCard={(item) => {
                        return (
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: "#E8E8E8",
                                backgroundColor: "white",
                                padding: 20,
                                height: 80
                            }}>
                                <Text style={{textAlign: 'center'}}>
                                    {item.title}
                                </Text>

                                <AirbnbRating
                                    count={3}
                                    size={30}
                                    defaultRating={0}
                                    reviews={["Não possui", "Parcialmente", "Possui"]}
                                    onFinishRating={this.ratingCompleted}  
                                    style={{marginTop: 100}} 
                                />
                            </View>
                        )
                    }}
                    verticalSwipe={false}
                    cardIndex={0}
                    onSwiped={this.onSwipe}
                    onSwipedAll={() => {this.renderFinish()}}
                    stackSize= {3}
                    stackSeparation={15}
                    backgroundColor='transparent'
                    cardVerticalMargin={10}
                    cardStyle={{height: '80%'}}
                >
                </Swiper>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        rating: state.place.rating,
        userData: state.auth.userData
    }
}

export default connect(mapStateToProps,{
    ratingChanged, sendRating, updatePointsRating, checkRateType
})(RatingScreen);