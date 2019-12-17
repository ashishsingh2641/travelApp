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
import Svg, {Path} from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const validationSchema1 = yup.object().shape({
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
            isLoading: false,
            icons: 'eye-off-outline',
            count: 0,
            secureTextEntry: true,
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
        const styles = LoginStyle;
        return (
            <>
                <ScrollView>
                    <View style={styles.container}>
                    <Svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;">
                <Path d="M0.00,49.98 C290.63,266.94 207.67,-110.03 502.25,71.53 L500.00,0.00 L0.00,0.00 Z" stroke="#3498db" fill="#3498db" />
                    <Text />
                    <Text />
                    <Text />
                    <Text />
                    <Text />
                    <Text /><Text />
                    <Text />
            </Svg>
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
                                        <FormInput
                                            style={{ borderWidth: 1,  fontSize: 20, borderRadius: 4,
                                            borderColor: formikProps.touched.email && formikProps.errors.email ? 'red' : '#999999' }}
                                            formFieldLabel="Email"
                                            placeHolderText="mikysingh1986@gmail.com"
                                            handleChange={formikProps.handleChange('email')}
                                            onBlur={formikProps.handleBlur('email')}
                                            value={formikProps.values.email}
                                            required={true} 
                                            autoFocus
                                            validateText={formikProps.touched.email && formikProps.errors.email}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1,  fontSize: 20, borderRadius: 4,
                                            borderColor: formikProps.touched.password && formikProps.errors.password ? 'red' : '#999999' }}
                                            formFieldLabel="Password"
                                            secureTextEntry={false}
                                            onBlur={formikProps.handleBlur('password')}
                                            placeHolderText="Please enter password"
                                            placeholderTextColor="#999999"
                                            handleChange={formikProps.handleChange('password')}
                                            value={formikProps.values.password} required={true} 
                                            validateText={formikProps.touched.password && formikProps.errors.password}
                                            secureTextEntry={this.state.secureTextEntry}
                                            icons={this.state.icons}
                                            toggleIcon={(e) => {
                                                if (formikProps.values.password === "" || formikProps.values.password === undefined) {
                                                    e.preventDefault()
                                                } else {
                                                    this.toggleIcon()
                                                }
                                            }}/>
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
                                            <Button buttonAction={formikProps.handleSubmit} label="Login" />
                                         )}
                                    </React.Fragment>
                                )}
                            </Formik>
                        </View>
                        <View style={styles.orLoginUsing}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("SprSignUp")}>
                            <Text style={{
                                fontSize: 17,
                                opacity: .8,
                                marginBottom: 20,
                                fontWeight: "bold",
                                color: '#2c3e50'
                            }}>or Sign up</Text>
                            </TouchableOpacity>
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
