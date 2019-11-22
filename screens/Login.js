import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView,ActivityIndicator } from 'react-native';
import SocialShare from '../components/SocialShare';
import HeaderComponent from '../components/HeaderComponent';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object().shape({
    firstName: yup
    .string().label('firstName').required(),
    email: yup
        .string()
        .label('Email')
        .email()
        .required(),
    password: yup
        .string()
        .label('Password')
        .required()
        .min(2, 'Seems a bit short...')
        .max(15, 'We prefer insecure system, try a shorter password.'),
});

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginMessage: '',
            isLoading: false
        }
    }
    render() {
        return (
            <>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.contentContainer}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.ColoredText}> Login.
                                <Text>
                                    {this.state.loginMessage}
                                </Text>
                                </Text>
                            </View>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                onSubmit={(values, actions) => {
                                        this.setState({
                                            isLoading: true
                                        })
                                        //alert(JSON.stringify(values));
                                        axios.get('http://192.168.0.107:5001/api/v1/login') // Call the fetch function passing the url of the API as a parameter
                                        .then((res) => {
                                            if (res !== undefined) {
                                                this.setState({
                                                    isLoading: false
                                                })
                                            }
                                            this.props.navigation.navigate("Explore");
                                        })
                                        .catch(function(error) {
                                            console.log(":::::::::::::::::::hi:::::::::::::")
                                        console.log(error)
                                        });
                                }}
                                validationSchema={validationSchema}>
                                {formikProps => (
                                    <React.Fragment>
                                        <FormInput
                                            style={{ borderWidth: 1, 
                                            borderColor: formikProps.touched.email && formikProps.errors.email ? 'red' : 'grey' }}
                                            formFieldLabel="Email"
                                            placeHolderText="mikysingh1986@gmail.com"
                                            handleChange={formikProps.handleChange('email')}
                                            onVlur={formikProps.handleBlur('email')}
                                            value={formikProps.values.email}
                                            required={true} 
                                            autoFocus
                                            validateText={formikProps.touched.email && formikProps.errors.email}
                                            />

                                        <FormInput
                                            style={{ borderWidth: 1, 
                                            borderColor: formikProps.touched.password && formikProps.errors.password ? 'red' : 'grey' }}
                                            formFieldLabel="Password"
                                            secureTextEntry
                                            onBlur={formikProps.handleBlur('password')}
                                            placeHolderText="Please enter password"
                                            handleChange={formikProps.handleChange('password')}
                                            value={formikProps.values.password} required={true} 
                                            validateText={formikProps.touched.password && formikProps.errors.password}
                                            />
                                        {this.state.isLoading === true ? (
                                         <ActivityIndicator />
                                         ) : (
                                            <Button buttonAction={() => {
                                                formikProps.handleSubmit();
                                               
                                            }} label="login" />
                                         )}
                                    </React.Fragment>
                                )}
                            </Formik>
                        </View>
                        <View style={styles.orLoginUsing}>
                            <Text style={{
                                fontSize: 17,
                                opacity: .6,
                                color: '#2c3e50'
                            }}>or login with</Text>
                            <SocialShare />
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    titleWrapper: {
        marginLeft: 20,
        flexDirection: 'row',
        marginTop: 10
    },

    ColoredText: {
        fontSize: 30,
        color: '#2c3e50',
        fontWeight: 'bold',
        fontFamily: "'Roboto', sans-serif",
        textAlign: 'left',
        marginBottom: 40
    },
    orLoginUsing: {
        marginTop: 50,
        alignItems: 'center',
    },
    
});

export default Login;
