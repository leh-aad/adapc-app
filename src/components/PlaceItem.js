import React, { Component } from 'react';
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
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text>{name}</Text>
                            <Text note>{vicinity}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                <Left>
                    <Icon active type="MaterialIcons" name="accessible" />
                </Left>
                <Right>
                    <Button transparent onPress={this.onButtonPress}>
                    <Text>Detalhes</Text>
                    </Button>
                </Right>
                </CardItem>
            </Card>
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