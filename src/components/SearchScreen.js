import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions } from 'react-native-router-flux';

const windowSize = require('Dimensions').get('window')
const deviceWidth = windowSize.width
const deviceHeight = windowSize.height

class SearchScreen extends Component{

  render(){
    return(
      <GooglePlacesAutocomplete
      placeholder='Pesquisar local'
      minLength={2}
      autoFocus={false}
      fetchDetails={true}
      onPress={(data, details) => {
        console.log(details);
        Actions.push('details', { item : details});
      }}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyDXjSZ-gsHxG-WqacY_ufb52WZAF9_jdpo',
        language: 'pt-BR'
      }}
      
      styles={{
        container: {
          height: 70
        },
        textInputContainer: {
          width: '100%',
          height: 70
        },
        textInput:{
          height: 50
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
        listView: {
          top: 70,
          position: 'absolute',
          height: deviceHeight,
          width: deviceWidth
        },
        description: {
          height: 100
        }
      }}
    />
    );
  }
}

export default SearchScreen;