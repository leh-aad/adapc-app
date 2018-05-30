import React from 'react';
import { Scene, Router, Tabs, Lightbox, Drawer, Stack } from 'react-native-router-flux'; 
import { Icon, Text } from 'native-base';
import { View } from 'react-native';
import LoginScreen from './components/LoginScreen';
import ListScreen from './components/ListScreen';
import HomeScreen from './components/HomeScreen';
import PlaceDetails from './components/PlaceDetails';
import SearchScreen from './components/SearchScreen';
import BadgeScreen from './components/BadgesScreen';
import DrawerMenu from './components/DrawerMenu';
import RegisterScreen from './components/RegisterScreen';
import RatingScreen from './components/RatingScreen';

const TabIcon = ({title}) => {
    // let color = selected ? '#807DFF' : 'black';
    let label = '';
    let iconName = '';


    if(title == 'Proximidades'){
        iconName = 'ios-navigate';
        label = 'Proximidades';
    }
    else if(title == 'Pesquisar'){
        iconName = 'search';
        label = 'Pesquisar';
    }
    else if( title == 'Medalhas'){
        iconName = 'trophy'
        label = 'Medalhas';
    }
    else if( title == ''){
        iconName = 'home'
        label = 'Home';
    }

    return(
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Icon name={iconName} style={{fontSize: 24, color:'#807DFF'}}/>
       </View>
    );
}

const MenuIcon = () => {
    return(
        <Icon name='ios-menu' style={{color: 'white'}}></Icon>
    );
}

const RouterComponent = () => {
    return(
        <Router>
            <Scene 
                key="root" 
                navBarButtonColor='white'
                navigationBarStyle={{backgroundColor: '#807DFF', elevation: 0}}
            >
                <Stack
                    key='auth'
                    hideNavBar
                    initial
                >
                    <Scene
                        key='login'
                        component={LoginScreen}
                        title='Login'
                        hideNavBar={true}
                    />
                    <Scene
                        key='register'
                        component={RegisterScreen}
                        title='Cadastro'
                        hideNavBar={false}
                    />
                </Stack>
                
                <Lightbox key="lightbox" >
                    <Drawer
                        key="drawer"
                        contentComponent={DrawerMenu}
                        drawerIcon={MenuIcon}
                        hideNavBar
                    >   
                        <Scene key="main">
                            <Tabs                                
                                key="tabbar"
                                tabBarPosition='bottom' 
                                default="inicialScreen"
                                showLabel={false}
                                activeBackgroundColor="#DDD"
                            > 
                                <Scene
                                    key="inicialScreen"
                                    title=""
                                    component={HomeScreen}
                                    icon={TabIcon}
                                />
                                <Scene
                                    key="listScreen"
                                    component={ListScreen}
                                    title="Proximidades"
                                    icon={TabIcon}
                                    
                                />
                                <Scene
                                    key="searchScreen"
                                    component={SearchScreen}
                                    title="Pesquisar"
                                    icon={TabIcon}
                                />
                                <Scene
                                    key="badgeScreen"
                                    component={BadgeScreen}
                                    title="Medalhas"
                                    icon={TabIcon}
                                />
                            </Tabs>
                        </Scene>
                    </Drawer>
                </Lightbox>
                <Scene
                    key='details'
                    component={PlaceDetails}
                    title='Detalhes'
                />
                <Scene
                    key='rating'
                    component={RatingScreen}
                    title='Avaliação'
                />
            </Scene>
        </Router>
    );
}

export default RouterComponent;
