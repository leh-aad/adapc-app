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

    componentDidMount(){
        //this.props.getRating('3d56239981aea90d5ab3c63c05cd8fa75ff033b6');
    }

    renderRating = () => {
        if(this.props.rating){
            return(
                <Text>{this.props.rating}</Text>
            )
        }else{
            return(
                <Text>n/a</Text>
            )
        }
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
                {/* <CardItem cardBody>
                    <Image source={"http://support.yumpu.com/en/wp-content/themes/qaengine/img/default-thumbnail.jpg"} style={{height: 200, width: null, flex: 1}}/>
                </CardItem> */}
                <CardItem>
                <Left>
                    <Icon active type="MaterialIcons" name="accessible" />
                    {this.renderRating()}
                </Left>
                <Right>
                    <Button transparent onPress={this.onButtonPress}>
                    <Text>Avaliar</Text>
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