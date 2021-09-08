import React from 'react';
import {SafeAreaView, View, StyleSheet,ScrollView,Text,Image,ImageBackground,TextInput, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Formik } from "formik";
import * as Yup from "yup";
import auth from '@react-native-firebase/auth';
export default class Login extends React.Component{


    _handleSubmit = (values) => {
        auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                this.props.navigation.navigate('App');
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong Password');
                    return;
                }

                if (error.code === 'auth/user-not-found') {
                    alert('User Not Found')
                    return;
                }

                console.log(error)
  });
    }
    render(){

        return(

            <SafeAreaView style={style.body}>
                <Image style={style.backgroundImage} source={require('../../../assets/images/backgroundImage.png')}></Image>

                <View style={style.header}>
                    
                    <Text style={style.welcomeText}>
                        Welcome Back!
                    </Text>
                    <Text style={style.signText}>
                        Sign in to continue
                    </Text>

                </View>
            <View>
                <Formik
                initialValues={{
                    email:'',
                    password:''
                }}
                onSubmit={this._handleSubmit}
                validationSchema={Yup.object().shape({

                    email:Yup.string().email('Email address is not valid').required('Email address is required'),
                    password:Yup.string().required('Password is required')

                })}
                >
                
                {
                    ({
                        values, handleSubmit, isValid, isSubmitting, errors, handleChange
                    }) => (
                
                <View>

            
                    <View style={style.inputs}>

                        <TextInput 
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        keyboardType={"email-address"}
                        style={style.item}>

                        </TextInput>
                        {(errors.email) && <Text style={style.alert}>{errors.email}</Text>}
                        <TextInput 
                        placeholder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        secureTextEntry={true}
                        style={style.item}>

                        </TextInput>
                        {(errors.password) && <Text style={style.alert}>{errors.password}</Text>}
                        
                    </View>

                    <View style={style.forgotPass}>
                    <Text style={style.forgotPassText}>
                            Forgot Password?
                        </Text>
                    </View>
                    
                    <View style={style.button}>

                        <TouchableOpacity style={style.buttonItem} 
                        disabled={!isValid}
                        onPress={handleSubmit}>
                            <Text style={style.buttonText}>Sign in My Account</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={style.forgot}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={{fontWeight:"700",color:'grey'}}>
                                Don't have an account? - <Text style={{fontWeight:"700",color:'#68527e'}}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.footerImage}>

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
        padding:30,
        flex:1
    },

    backgroundImage:{
        position:'absolute',
        width:800,
        height:880,
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
        
        marginTop:75,
        padding:0
        
        
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

    forgotPass:{
        marginTop:10,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },

    forgotPassText:{

        fontWeight:"bold",
        fontSize:14,
        color:'grey',
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
        padding:20
    },

    buttonText:{
        fontSize:17,
        fontWeight:"700",
        color:'#f0e7e8'
    },

    forgot:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    alert:{
        fontSize:14,
        fontWeight:"bold",
        color:'#68527e'
    }

})