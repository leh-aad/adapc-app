import React, { Component } from 'react';
import {
    View,
    Image
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
    Badge
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
        
        const photo_reference = this.props.item.item.photos[0].photo_reference;
        this.props.getPlaceImg({photo_reference});
    }
    
    componentWillReceiveProps(next){
        console.log(next);
        setTimeout(() => {
            this.setState({
                place_details: next.details.result,
            });

        }, 1000);    
    }
    render(){
        const { img_url } = this.props;
        return (
            
            <Container>
                {this.state && this.state.place_details &&
                    
                <Card>
                    <CardItem style={{marginTop: 20}}>
                        <Left>
                            <Text>{this.state.place_details.name}</Text>   
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
                        <Image
                            style={{height: 200, width: null, flex: 1}}
                            
                        />
                    <CardItem>

                    </CardItem>
                </Card>

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