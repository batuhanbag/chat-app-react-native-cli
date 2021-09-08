import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5'
export default class index extends React.Component
{

    static navigationOptions = ({ navigation }) => {
        
        return {
            title:<Text>Home Page</Text>,
            headerTitleStyle: {alignSelf:'center'},
            headerRight:<TouchableOpacity 
            style={{marginRight:7,padding:5}}
            onPress={() => {auth()
                .signOut()
                .then(() => navigation.navigate('Auth'));}}><Icon name={"sign-out-alt"} size={20} ></Icon></TouchableOpacity>,

            headerLeft:<TouchableOpacity
            onPress={()=> {navigation.navigate('ChatRoomCreate')}}
            style={{marginLeft:5,padding:5}}
            ><Icon name={"plus"} size={20} /></TouchableOpacity>
        }
        }
    


    

   

    render(){
        return <View>
            
        </View>
    }
}