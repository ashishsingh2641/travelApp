import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, Linking,ActivityIndicator } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
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
            loginMessage: ''
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
                                </Text>
                            </View>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                onSubmit={(values, actions) => {
                                   // console.log(values);
                                        debugger;
                                        actions.setSubmitting(true);
                                        setTimeout(() => {
                                            alert(JSON.stringify(values));
                                            actions.setSubmitting(false);
                                            this.props.navigation.navigate("Explore");
                                          }, 1000);
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
                                            <Button label="Login" buttonAction={formikProps.handleSubmit} />
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
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.facebook}
                                    onPress={() => Linking.openURL('http://www.facebook.com')} >
                                    <Icons name="facebook" size={32} />
                                </Text>
                                <Text style={styles.facebook}
                                    onPress={() => Linking.openURL('http://twitter.com')}>
                                    <Icons name="twitter" size={32} />
                                </Text>
                                <Text style={styles.facebook}
                                    onPress={() => Linking.openURL('http://google.com')}>
                                    <Icons name="google" size={32} />
                                </Text>
                            </View>
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
    facebook: {
        marginTop: 10,
        opacity: .3,
        color: '#186057'
    }
});

export default Login;
