import React, { Component } from 'react';
import {  TouchableOpacity } from "react-native";
import { 
    Card, 
    CardItem, 
    Thumbnail, 
    Text, 
    Button, 
    Icon, 
    Left, 
    Body, 
    Right,
    Image
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getRating } from '../store/actions';

class PlaceItem extends Component {
   
    constructor (props) {
        super(props)
    }

    onButtonPress = () => {
        Actions.push('details', this.props )
        
    }

    render(){
        const { name, photos, vicinity} = this.props.item;
        return(
            <TouchableOpacity onPress={this.onButtonPress}>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text> {name}</Text>
                                <Text note style={{fontSize: 10}}><Icon style={{fontSize: 8, color: '#807DFF'}} type="MaterialIcons" name="place"/> {vicinity}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </TouchableOpacity>

        );
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

export default connect(mapStateToProps,{
    getRating
})(PlaceItem);