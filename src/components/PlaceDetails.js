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
    Spinner
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
                <Badge success>
                    <Text>Aberto</Text>
                </Badge>
            );
        }else {
            return(
                <Badge danger>
                    <Text style={{fontSize: 10}}>Fechado</Text>
                </Badge>
                
            );
        }
    }

    render(){
        ///console.log(this.props);
        const { img_url, details, loading, rating } = this.props;
        return (
            
            <Container>
                {loading && <Spinner color='blue'/>}

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
                            <Left>
                                <Text style={{fontSize: 16, color: 'grey'}}>{details.result.name}</Text>   
                            </Left>
                            <Right> 
                                <Badge 
                                    info 
                                    style={{
                                        width: 50,  
                                        height: 50, 
                                        borderRadius: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        }}>
                                    <Text>{rating}</Text>
                                </Badge>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Text note>{details.result.formatted_address}</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                {
                                details.result.website &&        
                                <Button 
                                    iconLeft
                                    rounded
                                    info 
                                    onPress={() => Linking.openURL(details.result.website)}
                                >   
                                    <Icon type="MaterialIcons" name="web"  />
                                    <Text>Website</Text>
                                </Button>
                                }
                            </Left>
                            <Body>
                                {details.result.formatted_phone_number &&
                                <Button 
                                    iconLeft
                                    rounded
                                    success
                                >   
                                    <Icon type="MaterialIcons" name="phone"  />
                                    <Text>{details.result.formatted_phone_number}</Text>
                                </Button>
                                }
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Button
                                onPress={() => {Actions.push('rating', {rate: this.props.rating, id: details.result.id})}}
                            >
                                <Text>Avaliar</Text>
                            </Button>
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