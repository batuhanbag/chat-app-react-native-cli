import React from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';



export default class Index extends React.Component
{
    
    componentDidMount() {

        
        
        const user = firebase.auth().currentUser;
        if (user) {
            
            
            this.props.navigation.navigate('App')
            
           }
        else{
            this.props.navigation.navigate('Auth')
        }
    }
       

    render() {

        return <View></View>
    }
}