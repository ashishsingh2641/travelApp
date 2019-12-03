import React, { Component } from 'react';
import { View, Text, ScrollView,ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import SocialShare from '../components/SocialShare';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import LoginStyle from '../theme/LoginStyle';
import { login } from '../actions/LoginAction';

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
        const styles = LoginStyle;
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
                                onSubmit={(values) => {
                                        const _data = values; 
                                        this.props.login(_data, () => {
                                            this.props.navigation.navigate('Login')
                                        })
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
                                        {this.state.isPending === true ? (
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

const mapStateToProps = (state) => {
    const data = state.sinupdata;
    return {
        email: data.email,
        phnNumber: data.phnNumber,
        password: data.password,
        isPending: data.isPending,
        isError: data.isError
    }
} 

const mapDispatchToProps = (dispatch) => {
    debugger;
    return {
        login: (data) => {
        dispatch(login(data))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
