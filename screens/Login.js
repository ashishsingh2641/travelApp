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
        }
    }
    render() {
       
        return (
            <>
                <ScrollView>
                    <HeaderComponent
                        icon={require('../assets/Doner.png')}
                        avatar={require('../assets/icon.png')}
                        onNavigate={() => {
                            this.props.navigation.openDrawer()
                        }} />
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
                                        //alert(JSON.stringify(values));
                                        fetch('http://172.16.163.172:5001/api/v1/login') // Call the fetch function passing the url of the API as a parameter
                                        .then((resp) =>  {
                                            resp.json()
                                        }) // Transform the data into json
                                        .then((data) => {
                                           
                                            if (data === undefined) {
                                                actions.isSubmitting(false);
                                                    this.props.navigation.navigate("Explore");
                                                //console.log(JSON.stringify(data))
                                            } else {
                                                actions.setSubmitting(true);
                                            }
                                            
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
                                        {formikProps.isSubmitting ? (
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
                                color: '#186057'
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
        marginTop: 50
    },

    ColoredText: {
        fontSize: 30,
        color: '#186057',
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
