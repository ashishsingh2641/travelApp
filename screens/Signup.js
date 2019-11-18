import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView,ActivityIndicator } from 'react-native';
import Login from './Login';
import HeaderComponent from '../components/HeaderComponent';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik, FastField } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
        phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid')
});

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginMessage: '',
            isLoading: false,
            icons: 'eye-off-outline',
            count: 0,
            secureTextEntry: true
        }
    }
    toggleIcon = (e) => {
        this.setState({
            count: this.state.count+1
        });
        if (this.state.count % 2 === 0) {
            this.setState({
                icons: "eye-outline",
                secureTextEntry: false

            })
        }else {
            this.setState({
                icons: "eye-off-outline",
                secureTextEntry: true
            })
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
                                <Text style={styles.ColoredText}> Signup.
                                <Text>
                                    {this.state.loginMessage}
                                </Text>
                                </Text>
                            </View>
                            <Formik
                                initialValues={{ firstName: '', email: '', password: '', phoneNumber: '' }}
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
                                            this.props.navigation.navigate("Login");
                                        })
                                        .catch(function(error) {
                                            //console.log(":::::::::::::::::::hi:::::::::::::")
                                        console.log(error)
                                        });
                                }}
                                validationSchema={validationSchema}>
                                {formikProps => (
                                    <React.Fragment>
                                        <FormInput
                                            style={{ borderWidth: 1, 
                                            borderColor: formikProps.touched.firstName && formikProps.errors.firstName ? 'red' : 'grey' }}
                                            formFieldLabel="FirstName"
                                            placeHolderText="Jhon Doe"
                                            handleChange={formikProps.handleChange('firstName')}
                                            onVlur={formikProps.handleBlur('firstName')}
                                            value={formikProps.values.firstName}
                                            required={true} 
                                            autoFocus
                                            validateText={formikProps.touched.firstName && formikProps.errors.firstName}
                                            />
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
                                            secureTextEntry={this.state.secureTextEntry}
                                            toggleIcon={(e) => {
                                                if (formikProps.values.password === "" || formikProps.values.password === undefined) {
                                                    e.preventDefault()
                                                } else {
                                                    this.toggleIcon()
                                                }
                                            }}
                                            onBlur={formikProps.handleBlur('password')}
                                            placeHolderText="Please enter password"
                                            icons={this.state.icons}
                                            handleChange={formikProps.handleChange('password')}
                                            value={formikProps.values.password} required={true} 
                                            validateText={formikProps.touched.password && formikProps.errors.password}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1, 
                                            borderColor: formikProps.touched.PhoneNumber && formikProps.errors.PhoneNumber ? 'red' : 'grey' }}
                                            formFieldLabel="Phone"
                                            onBlur={formikProps.handleBlur('phoneNumber')}
                                            placeHolderText="Please enter PhoneNumber"
                                            handleChange={formikProps.handleChange('phoneNumber')}
                                            value={formikProps.values.PhoneNumber} required={true} 
                                            validateText={formikProps.touched.PhoneNumber && formikProps.errors.PhoneNumber}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1, 
                                            borderColor: formikProps.touched.AddressLine1 && formikProps.errors.AddressLine1 ? 'red' : 'grey' }}
                                            formFieldLabel="AddressLine1"
                                            onBlur={formikProps.handleBlur('AddressLine1')}
                                            placeHolderText="Please enter AddressLine1"
                                            handleChange={formikProps.handleChange('AddressLine1')}
                                            value={formikProps.values.AddressLine1} required={true} 
                                            validateText={formikProps.touched.AddressLine1 && formikProps.errors.AddressLine1}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1, 
                                            borderColor: formikProps.touched.AddressLine2 && formikProps.errors.AddressLine2 ? 'red' : 'grey' }}
                                            formFieldLabel="AddressLine2"
                                            onBlur={formikProps.handleBlur('AddressLine2')}
                                            placeHolderText="Please enter AddressLine2"
                                            handleChange={formikProps.handleChange('AddressLine2')}
                                            value={formikProps.values.AddressLine2} required={true} 
                                            validateText={formikProps.touched.AddressLine2 && formikProps.errors.AddressLine2}
                                            />
                                        {this.state.isLoading === true ? (
                                         <ActivityIndicator />
                                         ) : (
                                            <Button buttonAction={() => {
                                                formikProps.handleSubmit();
                                               
                                            }} label="Signup" />
                                         )}
                                    </React.Fragment>
                                )}
                            </Formik>
                        </View>
                        <View style={styles.orLoginUsing}>
                            <Text 
                                onPress={() => this.props.navigation.navigate("Login")} style={{
                                fontSize: 17,
                                opacity: .6,
                                color: '#186057',
                                marginBottom: 30
                            }}>Already a user please login</Text>
                            
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

export default Signup;
