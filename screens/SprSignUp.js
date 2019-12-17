import React, { Component } from 'react';
import { View, Text, ScrollView,ActivityIndicator, Image, TextInput, RefreshControl } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';
import {connect} from 'react-redux';
import {Signup} from '../actions/SignUpAction'; 
// import Check from '../components/Check';
// import ImagePicker from 'react-native-image-picker';
import validation from './utils/validationSchema';
import SprSignUpStyle from '../theme/SprSignUpStyle';
import Svg, {Path} from 'react-native-svg';

// const  checkProperty= ["sell", "buy"];

class SprSignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginMessage: '',
            isLoading: false,
            icons: 'eye-off-outline',
            count: 0,
            secureTextEntry: true,
            photo: null,
            sell: false,
            rent: false,
            disabled: false,
            sellDisabled: false
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
        const styles = SprSignUpStyle;
        // const {photo} = this.state;
        const receivedValue = this.props.navigation.getParam('role');
        //alert(receivedValue);
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
                                <Text style={styles.ColoredText}> {receivedValue +  ' Sign Up'}
                                </Text>
                            </View>
                            <Formik
                                initialValues={{
                                    firstName: this.props.firstName, 
                                    lastName: this.props.lastName, 
                                    email: this.props.email, 
                                    password: this.props.password, 
                                    phnNumber: this.props.phnNumber,
                                    role: receivedValue,
                                   }}
                                onSubmit={(values) => {
                                    var data = {
                                        email: values.email,
                                        firstName: this.props.firstName, 
                                        lastName: this.props.lastName, 
                                        email: this.props.email, 
                                        password: this.props.password, 
                                        phnNumber: this.props.phnNumber,
                                        role: receivedValue,
                                    }
                                    const _data = values;
                                    this.props.Signup(_data, () => {
                                        this.props.navigation.navigate('Login')
                                    })
                                }}
                                validationSchema={validation}>
                                {formikProps => (
                                    <React.Fragment  >
                                        <FormInput
                                            style={{ borderWidth: 1, fontSize: 20, borderRadius: 4,
                                            borderColor: formikProps.touched.firstName && formikProps.errors.firstName ? 'red' : '#999999' }}
                                            formFieldLabel="first Name"
                                            placeHolderText="Jhon Doe"
                                            handleChange={formikProps.handleChange('firstName')}
                                            onVlur={formikProps.handleBlur('firstName')}
                                            value={formikProps.values.firstName}
                                            required={true} 
                                            autoFocus={true}
                                            validateText={formikProps.touched.firstName && formikProps.errors.firstName}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1, fontSize: 20,borderRadius: 4,
                                            borderColor: formikProps.touched.lastName && formikProps.errors.lastName ? 'red' : '#999999' }}
                                            formFieldLabel="last Name"
                                            placeHolderText="Jhon Doe"
                                            handleChange={formikProps.handleChange('lastName')}
                                            onVlur={formikProps.handleBlur('lastName')}
                                            value={formikProps.values.lastName}
                                            required={true} 
                                            autoFocus={true}
                                            validateText={formikProps.touched.lastName && formikProps.errors.lastName}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1,  fontSize: 20,borderRadius: 4,
                                            borderColor: formikProps.touched.email && formikProps.errors.email ? 'red' : '#999999' }}
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
                                            style={{ borderWidth: 1,  fontSize: 20,borderRadius: 4,
                                            borderColor: formikProps.touched.password && formikProps.errors.password ? 'red' : '#999999' }}
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
                                            style={{ borderWidth: 1,  fontSize: 20,borderRadius: 4,
                                            borderColor: formikProps.touched.phnNumber && formikProps.errors.phnNumber ? 'red' : '#999999' }}
                                            formFieldLabel="Phone Number"
                                            onBlur={formikProps.handleBlur('phnNumber')}
                                            placeHolderText="Please enter PhoneNumber"
                                            handleChange={formikProps.handleChange('phnNumber')}
                                            value={formikProps.values.phnNumber} required={true} 
                                            validateText={formikProps.touched.phnNumber && formikProps.errors.phnNumber}
                                            />
                                        <View>
                                        
                                    </View>
                                        {this.props.isPending === true ? (
                                         <ActivityIndicator size="large" color="#3498db" />
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
                                onPress={() => {
                                    this.props.authSwitch;
                                     this.props.navigation.navigate("Login")
                                    }} style={{
                                fontSize: 18,
                                opacity: .7,
                                fontWeight: "bold",
                                color: '#2c3e50',
                                marginBottom: 30
                            }}>Already a user please login</Text>
                            
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
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phnNumber: data.phnNumber,
        role: data.role,
        password: data.password,
        isPending: data.isPending
    }
} 

const mapDispatchToProps = (dispatch) => {
    //debugger;
    return {
        Signup: (data, pagePath) => {
        dispatch(Signup(data, pagePath))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SprSignUp);
