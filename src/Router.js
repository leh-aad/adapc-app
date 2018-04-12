import React from 'react';
import { Scene, Router } from 'react-native-router-flux'; 
import LoginScreen from './components/LoginScreen';

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
            </Scene>
        </Router>
    );
}

export default RouterComponent;