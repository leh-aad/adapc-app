import React from 'react';
import { Scene, Router } from 'react-native-router-flux'; 
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import PlaceDetails from './components/PlaceDetails';
const RouterComponent = () => {
    return(
        <Router>
            <Scene key="root">
                <Scene
                    key='login'
                    component={LoginScreen}
                    title='Login'
                    hideNavBar={true} 

                />
                <Scene key="main" initial>
                    <Scene
                        key='homeScreen'
                        component={HomeScreen}
                        title='Home'
                        hideNavBar={true}
                        
                    />
                    <Scene
                        key='details'
                        component={PlaceDetails}
                        title='Details'
                        hideNavBar={true}
                    />
                </Scene>
            </Scene>
        </Router>
    );
}

export default RouterComponent;