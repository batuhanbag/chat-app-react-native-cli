import React from 'react';
import {SafeAreaView, View, StyleSheet,ScrollView,Text,Image,ImageBackground,TextInput, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export default class Register extends React.Component{


    _handleSubmit = (values) => {
        auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                const user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName:values.fullName
                });
                this.props.navigation.navigate('App')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
               alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
                }

                console.error(error);
            });
    };
    
    constructor() {
        super();
        this.state = {
            checked:false
        }
    }

    render(){

        
        return(

            <SafeAreaView style={style.body}>
                <Image></Image>

                <View style={style.header}>
                    <Text style={style.headerText}>
                        Welcome!
                    </Text>
                    
                </View>
                <View style={style.headerDetail}>
                    <Text style={style.headerTextDetail}>
                        Please provide following
                        
                    </Text>
                    <Text style={style.headerTextDetail}>
                        details for your new account
                    </Text>
                </View>
            <View>
                <Formik
                    initialValues={{
                        fullName:'',
                        email:'',
                        password:''
                    }}
                    onSubmit={this._handleSubmit}
                    validationSchema={
                        Yup.object().shape({

                            fullName:Yup.string().min(4,'Too Short').required('Full Name is required'),
                            email:Yup.string().email('Email address is not valid').required('Email address is reqired'),
                            password:Yup.string().min(4,'Too Short').max(16,'Too Long').required('Password is reqired')
                        })
                    }
                >
                    {
                        ({
                            values,
                            handleSubmit,
                            isValid,
                            isSubmitting,
                            errors,
                            handleChange

                        }) => (
                    <View>
                    
                        <View style={style.inputs}>

                        <TextInput
                            placeholder="Full Name"
                            style={style.item}
                            value={values.fullName}
                            onChangeText={handleChange('fullName')}
                            >
                            </TextInput>
                            {(errors.fullName) && <Text style={style.alert}>{errors.fullName}</Text>}
                            <TextInput
                            placeholder="Email Adress"
                            style={style.item}
                            value={values.email}
                            keyboardType={"email-address"}
                            onChangeText={handleChange('email')}
                            >
                                
                            </TextInput>
                            {(errors.email) && <Text style={style.alert}>{errors.email}</Text>}
                            <TextInput
                            placeholder="Password"
                            style={style.item}
                            value={values.password}
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            >
                                
                            </TextInput>
                            {(errors.email) && <Text style={style.alert}>{errors.password}</Text>}
                        </View>

                        <View style={style.checkboxArea}>
                            <CheckBox 
                            value={this.state.checked}
                            onValueChange={() => this.setState({checked: !this.state.checked})}
                            style={style.checkBox}></CheckBox>
                            <View style={style.terms}>
                                    <Text style={style.termsText}>
                                    By creating your account you have to agree
                                    <TouchableOpacity>
                                        <Text style={style.termsText}>
                                            with our 
                                            <Text style={style.conditions}> Terms and Conditions</Text>
                                        </Text>
                                    </TouchableOpacity>
                                    </Text>
                                
                            </View>
                        </View>

                        <View style={style.buttons}>

                            <TouchableOpacity style={style.itemButton1} 
                            disabled={!isValid}
                            onPress={handleSubmit}>
                                <Text style={style.buttonText}>
                                    Sign up My Account
                                </Text>
                            </TouchableOpacity>
                            
                        </View>

                        <View style={style.footer}>


                            <TouchableOpacity style={style.acc} 
                            
                            onPress={() => this.props.navigation.navigate("Login")}>
                                <Text style={style.accText}>Already have an account? - <Text style={style.accTextSign}>Sign in</Text></Text>
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
        flex:1,
        padding:30
    },
    header:{
        justifyContent:'center',
        alignItems:'center'
    },
    headerText:{
        fontSize:33,
        fontWeight:"bold",
        color:"#68527e",
        marginTop:30
    },
    headerTextDetail:{
        
        fontSize:14,
        fontWeight:'bold',
        color:'grey',
        
    },
    headerDetail:{
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
    },

    inputs:{
        marginTop:50,

    },
    item:{
        marginBottom:3,
        borderWidth:1,
        borderRadius:10,
        paddingLeft:20,
        fontWeight:"700",
        borderColor:"#B0B0C3",
        backgroundColor:'#e9e9e9',
    },
    checkboxArea:{
        marginTop:15
    },

    terms:{
        
        
        marginTop:-25,
        marginLeft:30,
        
        
    },

    termsText:{
        fontSize:13,
        fontWeight:"700",
        color:'grey',
    },

    conditions:{
        color:'#68527e',
        fontWeight:"bold",
        fontSize:15
    },

    buttons:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
        
    },

    itemButton1:{
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:85,
        padding:15,
        backgroundColor:'#68527e',
        borderColor:'white'
        
    },
    itemButton2:{
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:57,
        padding:15,
        backgroundColor:'#4e1067',
        borderColor:'white'

        
    },
    buttonText:{
        color:'#f0e7e8',
        fontSize:16,
        fontWeight:"700"
    },

    acc:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:35,

    },
    accText:{
        fontSize:14,
        fontWeight:"700",
        color:'grey'
    },
    accTextSign:{
        fontSize:16,
        fontWeight:"700",
        color:'#68527e'
    },

    alert:{
        fontSize:14,
        fontWeight:"bold",
        color:'#68527e'
    }

});