import React from 'react';
import { Scene, Router } from 'react-native-router-flux'; 
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';

const RouterComponent = () => {
    return(
        <Router>
            <Scene key="root">
                <Scene
                    key='login'
                    component={LoginScreen}
                    title='Login'
                    hideNavBar={true} 
                    initial
                />
                <Scene
                    key='home'
                    component={HomeScreen}
                    title='Home'
                    hideNavBar={true} 
                />
            </Scene>
        </Router>
    );
}

export default RouterComponent;