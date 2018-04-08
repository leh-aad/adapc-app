import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/store/reducers';
import firebase from 'firebase';
import PlaceList from './src/components/PlaceList';
import LoginScreen from './src/components/LoginScreen';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(
      {
        apiKey: 'AIzaSyDXjSZ-gsHxG-WqacY_ufb52WZAF9_jdpo',
        authDomain: 'app-adapc.firebaseapp.com',
        databaseURL: 'https://app-adapc.firebaseio.com',
        projectId: 'app-adapc',
        storageBucket: 'app-adapc.appspot.com',
        messagingSenderId: '786985438099'
      }
    );
  }

  render() {
    return ( 
      <Provider store={createStore(reducers)}>
          <LoginScreen />
      </Provider>
    );
  }
}

export default App;
