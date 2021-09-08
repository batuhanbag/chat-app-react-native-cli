import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import { createBottomTabNavigator} from "react-navigation-tabs";
import { createDrawerNavigator} from "react-navigation-drawer";
import Icon from "react-native-vector-icons/FontAwesome5";



import HomeIndex from './Screens/Home'
import ChatRoomCreate from './Screens/Chat/Create/index';


import Login from './Screens/Login';
import Register from './Screens/Register';
import App from '../App';

import AuthRedirect from './Screens/AuthRedirect'


const AuthenticateStack = createStackNavigator({

    
    Login: {
        screen:Login,
        navigationOptions:{
            header:null
        }
    },
   

    Register: {
        screen:Register,
        navigationOptions:{
            header:null
        }
    }
});

const AppStack = createStackNavigator({
    
    HomeIndex:{
        screen:HomeIndex,
        
    },
    ChatRoomCreate:{
        screen:ChatRoomCreate,
        navigationOptions:{
            title:'New Chat Room',
            headerTitleStyle:{marginLeft:55,color:'grey'}
        }
    }
})

const SwitchNavigator = createSwitchNavigator({
    App:AppStack,
    AuthRedirect,
    Auth:AuthenticateStack
},{
    initialRouteName:'AuthRedirect'
})


export  default createAppContainer(SwitchNavigator);