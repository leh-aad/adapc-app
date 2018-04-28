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

const PlaceItem = (props) => {
    const { name, photos, vicinity} = props.item;
    //console.log(photos);
    let image = 'http://support.yumpu.com/en/wp-content/themes/qaengine/img/default-thumbnail.jpg';

    // if (typeof photos==undefined){
    //     image = 'http://support.yumpu.com/en/wp-content/themes/qaengine/img/default-thumbnail.jpg';
    // }else{
    //     image = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photos[0].photo_reference}&sensor=false&maxheight=400&maxwidth=400&key=AIzaSyDXjSZ-gsHxG-WqacY_ufb52WZAF9_jdpo`;
    
    // }

    onButtonPress = () => {
        Actions.push('details', {item: props} )
    }

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
                <Text>n/a</Text> 
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

export default PlaceItem;