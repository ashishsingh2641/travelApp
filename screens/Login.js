import React, { Component } from 'react';
import { View, Text, ScrollView,ActivityIndicator } from 'react-native';
import {connect} from 'react-redux';
import SocialShare from '../components/SocialShare';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import LoginStyle from '../theme/LoginStyle';
import {loginAction} from '../actions/LoginAction';

const validationSchema1 = yup.object().shape({
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
                                initialValues={{ email: '', password: '', phnNumber: '' }}
                                onSubmit={(values) => {
                                    alert('submitting Login form.....')
                                    const _data = values;
                                    const AddProperty = () => {
                                        this.props.navigation.navigate('AddProperty')
                                    };
                                    const Explore = () => { 
                                        this.props.navigation.navigate('Explore')
                                    };
                                    this.props.loginAction(_data, AddProperty, Explore)
                                }}
                                validationSchema={validationSchema1}
                               >
                                {formikProps => (
                                    <React.Fragment>
                                        {/* <FormInput
                                            style={{ borderWidth: 1, 
                                            borderColor: formikProps.touched.email && formikProps.errors.email ? 'red' : 'grey' }}
                                            formFieldLabel="Email"
                                            placeHolderText="mikysingh1986@gmail.com"
                                            handleChange={formikProps.handleChange('email')}
                                            onBlur={formikProps.handleBlur('email')}
                                            value={formikProps.values.email}
                                            required={true} 
                                            autoFocus
                                            validateText={formikProps.touched.email && formikProps.errors.email}
                                            /> */}
                                        <FormInput
                                            style={{borderWidth: 1, 
                                            borderColor: formikProps.touched.phnNumber && formikProps.errors.phnNumber ? 'red' : 'grey' }}
                                            formFieldLabel="Phone Number"
                                            placeHolderText="+91 XXXXXXXXXX"
                                            handleChange={formikProps.handleChange('phnNumber')}
                                            onBlur={formikProps.handleBlur('phnNumber')}
                                            value={formikProps.values.phnNumber}
                                            required={true} 
                                            autoFocus
                                            validateText={formikProps.touched.phnNumber && formikProps.errors.phnNumber}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1, 
                                            borderColor: formikProps.touched.password && formikProps.errors.password ? 'red' : 'grey' }}
                                            formFieldLabel="Password"
                                            secureTextEntry={false}
                                            onBlur={formikProps.handleBlur('password')}
                                            placeHolderText="Please enter password"
                                            handleChange={formikProps.handleChange('password')}
                                            value={formikProps.values.password} required={true} 
                                            validateText={formikProps.touched.password && formikProps.errors.password}
                                            />
                                        {this.props.isPending === true ? (
                                         <ActivityIndicator />
                                         ) : (
                                            <Button buttonAction={formikProps.handleSubmit} label="login-button" />
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
    debugger;
    const data = state.loginData;
    return {
        email: data.email,
        phnNumber: data.phnNumber,
        password: data.password,
        isPending: data.isPending,
        isError: data.isError
    }
} 

const mapDispatchToProps = (dispatch) => {
    //debugger;
    return {
        loginAction: (data, pagePath, newPagepath) => {
        dispatch(loginAction(data, pagePath, newPagepath))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
