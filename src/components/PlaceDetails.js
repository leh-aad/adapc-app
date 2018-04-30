import React, { Component } from 'react';
import {
    Image,
    Linking
  } from 'react-native';
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
    Label
} from 'native-base';

import { connect } from 'react-redux';
import { getPlaceDetails, getPlaceImg } from '../store/actions/PlaceActions'; 

class PlaceDetails extends Component { 

    state = {
        place_details: null,
        image : ''
    }

    componentDidMount(){
        const place_id = this.props.item.item.place_id;
        this.props.getPlaceDetails({place_id});
        
        if(this.props.item.item.photos){
            const photo_reference = this.props.item.item.photos[0].photo_reference;
            this.props.getPlaceImg({photo_reference});
        }

    }
    
    componentWillReceiveProps(next){
        console.log(next);
        setTimeout(() => {
            this.setState({
                place_details: next.details.result,
            });
        }, 1000);    
    }

    openNow(openNow){
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
                    <Text style={{ fontSize: 10}}>Fechado</Text>
                </Badge>
                
            );
        }
    }

    render(){
        const { img_url, details } = this.props;
        return (
            
            <Container>
                {this.state && this.state.place_details &&
                    
                <Content>
                    <Card> 
                        <CardItem cardBody>
                            <Image
                                style={{height: 200, width: null, flex: 1}}
                                source={{uri: img_url }}
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
                                    <Text>0.0</Text>
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
        img_url : state.place.img_url
    };
};

export default connect(mapStateToProps,{
    getPlaceDetails,
    getPlaceImg
})(PlaceDetails);