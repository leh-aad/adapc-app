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
                            <Left style={{marginLeft: 0, paddingLeft: 0}}>
                                <Text style={{fontSize: 16, color: 'grey', fontWeight: 'bold'}}>{details.result.name}</Text>   
                            </Left>
                            <Right> 
                                <Badge
                                    style={{
                                        width: 50,  
                                        height: 50, 
                                        borderRadius: 50,
                                        borderColor: '#807DFF',
                                        borderWidth: 1.1,
                                        borderStyle: 'solid',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'white'
                                        }}
                                    >
                                    <Text style={{color: '#807DFF'}}>{rating}</Text>
                                </Badge>
                            </Right>
                        </CardItem>
                        <Separator></Separator>
                        <CardItem>
                            <Left>
                                <Icon style={{fontSize: 20, color: 'red'}} type="MaterialIcons" name="place"/>
                                <Text note>{details.result.formatted_address}</Text>
                            </Left>
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
                        <Separator></Separator>
                        <CardItem button bordered
                            onPress={() => {Actions.push('rating', {rate: this.props.rating, id: details.result.id})}}
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