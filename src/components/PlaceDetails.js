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
import { getPlaceDetails } from '../store/actions/PlaceActions'; 

class PlaceDetails extends Component { 

    state = {
        place_details: null
    }

    componentDidMount(){
        const place_id = this.props.item.item.place_id;
        this.props.getPlaceDetails({place_id});

    }
    
    componentWillReceiveProps(next){
        console.log('props',next.details.result);
        
        setTimeout(() => {
            this.setState({
                place_details: next.details.result
            });
            console.log('state',this.state.place_details);
        }, 1000);
        
        
    }

    render(){
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
                </Card>

                }

            </Container>
        );
    }
}

const mapStateToProps = state => {
    return{
        details : state.place.details
    };
};

export default connect(mapStateToProps,{
    getPlaceDetails
})(PlaceDetails);