import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { View, Alert, Text } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Icon, Toast } from 'native-base'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ratingChanged, sendRating, updatePointsRating, checkRateType, checkRatingCount } from '../store/actions';

const questions = [
    {
        id: 1,
        title: 'Caso haja estacionamento, o mesmo possui vagas reservadas devidamente sinalizadas e de rota acessível?'
    },
    {
        id: 2,
        title: 'A área dos ponto de entrada e saída do local possui rotas acessíveis? (Rampas, calçamento rebaixado, deslocamento sem obstáculos, seguro)'
    },
    {
        id: 3,
        title: 'O espaço possui áreas de circulação que permitem a movimentação segura e confortável do cadeirante?'
    },
    {
        id: 4,
        title: 'O local dispõe de sanitários adaptados, contendo barras de apoio (e outras medidas de segurança) e lavatório em altura ideal para o cadeirante?'
    },
    {
        id: 5,
        title: 'No caso de edificações, o acesso a outros andares pode ser feito por meio de rampas e ou elevadores?'
    }
]

const rate = 0;

class RatingScreen extends Component{

    constructor (props) {
        super(props)
        this.state = {
            totalRating: 0,
            count: 0,
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
      //this.props.checkRateType(this.props.types, this.props.userData.badges);
       
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
            totalRating: this.state.totalRating + rate,
            count: this.state.count  + 1
        })
        rate = 0;
    }

    render(){
        return(
            <View style={{ flex:1 }}>
                <Text style={{alignSelf: 'flex-end',alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'column'}}>{this.state.count}/5 perguntas</Text>
                
                <Text style={{alignSelf: 'center', justifyContent: 'center', flexDirection: 'column', fontSize: 6}}>
                     {"\n"}Arraste o cartão para os lados para ver as próximas perguntas 
                </Text>
                <Swiper
                    marginTop={60}
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

                               <Icon  name='ios-arrow-forward' 
                                style={{fontSize: 25,alignSelf: 'flex-end',alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'column',marginTop:100}}
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
    ratingChanged, sendRating, updatePointsRating, checkRateType, checkRatingCount
})(RatingScreen);