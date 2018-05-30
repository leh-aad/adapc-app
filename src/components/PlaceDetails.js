import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { 
    Container, 
    Header, 
    Content, 
    Card, 
    CardItem, 
    Thumbnail, 
    Text, 
    Button, 
    Icon, 
    Left, 
    Body, 
    Right,
    Badge,
    Label,
    Spinner,
    Separator
} from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getPlaceDetails, getPlaceImg, getRating } from '../store/actions'; 

var _ = require('lodash');

class PlaceDetails extends Component { 

    state = {
        place_details: null,
        img: ''
    }
    componentWillMount(){
        const id = this.props.item.id;
        this.props.getRating(id);
        
        const place_id = this.props.item.place_id;
        this.props.getPlaceDetails({place_id});
        
        if(this.props.item.photos){
            const photo_reference = this.props.item.photos[0].photo_reference;
            this.props.getPlaceImg({photo_reference});
        }
    }
    
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                place_details: this.props.details,
                img: this.props.img_url
            });
        }, 1000);    
    }

    renderOpenNow(openNow){
        if(openNow===undefined){
            return ;
        }
        if(openNow){
            return(
                <Badge success >
                    <Text style={{fontSize: 10, marginBottom: 10}}>Aberto agora</Text>
                </Badge>
            );
        }else {
            return(
                <Badge danger style={{padding:10}}>
                    <Text style={{fontSize: 10}}>Fechado agora</Text>
                </Badge>
                
            );
        }
    }

    render(){
        ///console.log(this.props);
        const { img_url, details, loading, rating } = this.props;
        return (
            
            <Container>
                {loading && <Spinner color='#415ECC'/>}

                {this.state && this.state.place_details &&
                    
                <Content>
                    <Card> 
                        <CardItem cardBody>
                            <Image
                                style={{height: 200, width: null, flex: 1}}
                                source={{uri: this.state.img }}
                            />
                        </CardItem>
                        <CardItem> 
                            <Text style={{fontSize: 16, color: 'grey', fontWeight: 'bold'}}>{details.result.name}</Text>   
                        </CardItem>
                        <CardItem>
                            { rating == null 
                                ? <Text style={{color: '#807DFF'}}>n/a</Text>
                                : <Text style={{color: '#807DFF'}}>{rating}/3.00</Text>
                            } 
                        </CardItem>
                        <Separator></Separator>
                        <CardItem>
                            <Left>
                                <Icon style={{fontSize: 20, color: 'red'}} type="MaterialIcons" name="place"/>
                                <Text note style={{fontSize: 10}}>{details.result.formatted_address}</Text>
                            </Left>
                        </CardItem>
                        {
                            details.result.website &&   
                        <CardItem button onPress={() => Linking.openURL(details.result.website)}>
                            <Left>       
                                <Icon type="MaterialIcons" style={{fontSize: 20, color: 'blue'}} name="web"  />
                                <Text note style={{fontSize: 10}}>{details.result.website}</Text>
                            </Left>
                        </CardItem>
                        }
                        
                        {details.result.formatted_phone_number &&
                            <CardItem>
                                <Left
                                >   
                                    <Icon type="MaterialIcons" style={{fontSize: 20, color: 'green'}} name="phone"  />
                                    <Text note style={{fontSize: 10}}>{details.result.formatted_phone_number}</Text>
                                </Left>

                            </CardItem>
                        }
                        {
                            details.result.opening_hours && details.result.opening_hours.open_now &&
                            <CardItem>
                                {this.renderOpenNow(details.result.opening_hours.open_now)}
                            </CardItem>
                        }
                        <Separator></Separator>
                        <CardItem button bordered
                            onPress={() => {Actions.push('rating', {rate: this.props.rating, id: details.result.id, types: details.result.types})}}
                        >
                            <Body>
                                <Text style={{color: '#807DFF'}}>Avaliar acessibilidade</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>

                }

            </Container>
        );
    }
}

const mapStateToProps = state => {
    
    return{
        details : state.place.details,
        img_url : state.place.img_url,
        loading : state.place.loading,
        rating : state.rate.rating
    };
};

export default connect(mapStateToProps,{
    getPlaceDetails,
    getPlaceImg,
    getRating
})(PlaceDetails);