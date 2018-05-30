import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/store/reducers';
import firebase from 'firebase';
import Router from './src/Router';

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
    console.ignoredYellowBox = ['Setting a timer', 'source.uri', 'Remote debugger'];    
    return ( 
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Router />
      </Provider>
    );
  }
}

export default App;
