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
import LinearGradient from 'react-native-linear-gradient';

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
                    <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}
                    colors={['#2c3e50', '#5691c8']} style={{ zIndex: 0}}>
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
                                validationSchema={validationSchema1}>
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
                                            color={'white'}
                                            style={{borderBottomWidth: 2, color: 'white', 
                                            borderBottomColor: formikProps.touched.phnNumber && formikProps.errors.phnNumber ? 'red' : 'white' }}
                                            formFieldLabel="Phone Number"
                                            placeHolderText="+91 XXXXXXXXXX"
                                            handleChange={formikProps.handleChange('phnNumber')}
                                            onBlur={formikProps.handleBlur('phnNumber')}
                                            value={formikProps.values.phnNumber}
                                            required={true} 
                                            placeholderTextColor="white"
                                            autoFocus
                                            validateText={formikProps.touched.phnNumber && formikProps.errors.phnNumber}
                                            />
                                        <FormInput
                                            style={{ borderBottomWidth: 2, color: 'white',
                                            borderBottomColor: formikProps.touched.password && formikProps.errors.password ? 'red' : 'white' }}
                                            formFieldLabel="Password"
                                            secureTextEntry={false}
                                            onBlur={formikProps.handleBlur('password')}
                                            placeHolderText="Please enter password"
                                            placeholderTextColor="white"
                                            handleChange={formikProps.handleChange('password')}
                                            value={formikProps.values.password} required={true} 
                                            validateText={formikProps.touched.password && formikProps.errors.password}
                                            />
                                        <View>
                                        <Text style={{color: 'blue', textAlign: 'right', marginRight: 20}}
                                                onPress={() =>{
                                                    const {navigate} = this.props.navigation;
                                                    navigate("ForgotPassword")
                                                }}>
                                            Forgot your Password
                                            </Text>
                                        </View>
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
                        
                    </LinearGradient>
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
