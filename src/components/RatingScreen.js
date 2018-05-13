import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { View, Alert, Text } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ratingChanged, sendRating } from '../store/actions';

const questions = [
    {
        id: 1,
        title: 'question 01'
    },
    {
        id: 2,
        title: 'question 02'
    },
    {
        id: 3,
        title: 'question 03'
    },
    {
        id: 4,
        title: 'question 04'
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
    
    componentDidMount(){
        console.log('props',this.props);
    }

    onFinish(){
        console.log('finish')
        const id = this.props.data;
        const rating = this.state.totalRating / questions.length;
        this.props.sendRating({rating,id});
    }

    renderFinish(){
        console.log('end',this.state.totalRating)
        Alert.alert(
            'Avaliação concluida!',
            'Agradecemos sua participação',
            [
              {text: 'OK', onPress: () => {Actions.main()}},
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
        console.log(this.state.totalRating);
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
                                    size={30}
                                    defaultRating={0}
                                    onFinishRating={this.ratingCompleted}  
                                    style={{marginTop: 20}} 
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
        rating: state.place.rating
    }
}

export default connect(mapStateToProps,{
    ratingChanged, sendRating
})(RatingScreen);