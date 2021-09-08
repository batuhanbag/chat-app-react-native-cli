  
import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Formik} from "formik";
import * as Yup from "yup";
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';


export default class Index extends Component {
    

    
    _handleSubmit = (values) => {
        
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        const userName = user.displayName;
        
        var database = firebase.database().ref('/rooms');
       
        database.push({
            
           name:values.name,
           userId,
           userName
        }).then((result) =>{
            
            console.log(result)
           
        }).catch((error) => console.log(error));
        
    };
        
    render() {
        return(

            <SafeAreaView style={style.body}>

                <View style={style.header}>
                </View>
            <View>
                <Formik
                initialValues={{
                    name:'',
                    
                }}
                onSubmit={this._handleSubmit}
                validationSchema={Yup.object().shape({

                    name:Yup.string().required('Name is required'),
                   

                })}
                >
                
                {
                    ({
                        values, handleSubmit, isValid, isSubmitting, errors, handleChange
                    }) => (
                
                <View>

            
                    <View style={style.inputs}>

                        <TextInput 
                        placeholder="Create Chat Room"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        
                        style={style.item}>

                        </TextInput>
                        {(errors.name) && <Text style={style.alert}>{errors.name}</Text>}
                        
                    </View>

                    
                    <View style={style.button}>

                        <TouchableOpacity style={style.buttonItem} 
                        disabled={!isValid}
                        onPress={handleSubmit}>
                            <Text style={style.buttonText}>Create Room</Text>
                        </TouchableOpacity>

                    </View>

                    
                    
                </View>)
            }
                </Formik>

            </View>
        </SafeAreaView>
        )
    
    }
}




const style = StyleSheet.create({

    body:{
        padding:40,
        flex:1,
    },

    backgroundImage:{
        position:'absolute',
        width:800,
        height:780,
        right:0,
        left:0,
        top:0,
        bottom:0
    },

    header:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:40
    },

    welcomeText:{
        fontSize:33,
        fontWeight:"bold",
        marginBottom:30,
        color:"#68527e"
    },

    signText:{
        
        fontSize:15,
        color:'grey',
        fontWeight:"700"

    },

    inputs:{
        
        marginTop:150,
        padding:0,
        
        
        
    },

    item:{
        borderWidth:1,
        borderRadius:10,
        borderColor:"#B0B0C3",
        paddingLeft:20,
        backgroundColor:'#e9e9e9',
        fontWeight:"700",
        marginBottom:3
        
    },

    

    button:{
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:40,
        backgroundColor:'#68527e',
        borderColor:'white'

    },

    buttonItem:{
        padding:15
    },

    buttonText:{
        fontSize:17,
        fontWeight:"700",
        color:'#f0e7e8'
    },

   
    alert:{
        fontSize:14,
        fontWeight:"bold",
        color:'#68527e'
    }

})