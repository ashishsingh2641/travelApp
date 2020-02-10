import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Picker, TextInput } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Signup } from '../actions/SignUpAction';
import validation from './utils/validationSchema';
import SprSignUpStyle from '../theme/SprSignUpStyle';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icons from 'react-native-vector-icons/AntDesign'

class SprSignUp extends Component {
    constructor(props) {
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
            sellDisabled: false,
            gender: '',
            date: new Date(),
            mode: 'date',
            show: false,
            address: ''
        }
    }
    toggleIcon = (e) => {
        this.setState({
            count: this.state.count + 1
        });
        if (this.state.count % 2 === 0) {
            this.setState({
                icons: "eye-outline",
                secureTextEntry: false

            })
        } else {
            this.setState({
                icons: "eye-off-outline",
                secureTextEntry: true
            })
        }
    }
    setDate = (event, date) => {
        date = date || this.state.date;
    
        this.setState({
          show: Platform.OS === 'ios' ? true : false,
          date,
        });
      }
    
    show = mode => {
        this.setState({
          show: true,
          mode,
        });
      }
    
     datepicker = () => {
        this.show('date');
    }
    
    render() {
        const { show, date, mode } = this.state;
        let buttonLable = JSON.stringify(this.state.date);
        buttonLable = buttonLable.split('"').join('');
        buttonLable = new Date(buttonLable);
        buttonLable = ((buttonLable.getDate() > 9) ? buttonLable.getDate() : ('0' + buttonLable.getDate())) + '/' + ((buttonLable.getMonth() > 8) ? (buttonLable.getMonth() + 1) : ('0' + (buttonLable.getMonth() + 1))) + '/'+ buttonLable.getFullYear();
        const styles = SprSignUpStyle;
        const receivedValue = this.props.navigation.getParam('role');
        const ProvidelRole = this.props.navigation.getParam('prviderRole')
        //alert(receivedValue);
        //alert(ProvidelRole + " service provider role from login to signup page")
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
                                <Text style={styles.ColoredText}> {'Sign Up'}
                                </Text>
                            </View>
                            <Formik
                                initialValues={{
                                    firstName: this.props.firstName,
                                    lastName: this.props.lastName,
                                    email: this.props.email,
                                    password: this.props.password,
                                    phnNumber: this.props.phnNumber,
                                    role: receivedValue ? receivedValue : ProvidelRole,
                                    gender: this.state.gender,
                                    address: this.state.address,
                                    dob: this.state.date
                                }}
                                onSubmit={(values) => {
                                    //alert(this.state.date + this.state.gender + this.state.address);
                                    var data = {
                                        email: values.email,
                                        firstName: values.firstName,
                                        lastName: values.lastName,
                                        password: values.password,
                                        phnNumber: values.phnNumber,
                                        role: receivedValue ? receivedValue : ProvidelRole,
                                        gender: this.state.gender,
                                        address: this.state.address,
                                        dob: this.state.date
                                    }
                                    const _data = data;
                                    var myDate = new Date(this.state.date);
                                    var today = new Date();
                                    if (myDate < today) {
                                        this.props.Signup(_data, () => {
                                            this.props.navigation.navigate('Login')
                                        })
                                    }else {
                                        alert("Selected date is not valid")
                                    }
                                }}
                                validationSchema={validation}>
                                {formikProps => (
                                    <React.Fragment  >
                                        <FormInput
                                            style={{
                                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                                fontSize: 20,
                                                borderColor: formikProps.touched.firstName && formikProps.errors.firstName ? 'red' : '#999999'
                                            }}
                                            formFieldLabel="First Name"
                                            placeHolderText=""
                                            handleChange={formikProps.handleChange('firstName')}
                                            onVlur={formikProps.handleBlur('firstName')}
                                            value={formikProps.values.firstName}
                                            required={true}
                                            autoFocus={true}
                                            validateText={formikProps.touched.firstName && formikProps.errors.firstName}
                                        />
                                        <FormInput
                                            style={{
                                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                                fontSize: 20,
                                                borderColor: formikProps.touched.lastName && formikProps.errors.lastName ? 'red' : '#999999'
                                            }}
                                            formFieldLabel="Last Name"
                                            placeHolderText=""
                                            handleChange={formikProps.handleChange('lastName')}
                                            onVlur={formikProps.handleBlur('lastName')}
                                            value={formikProps.values.lastName}
                                            required={true}
                                            autoFocus={true}
                                            validateText={formikProps.touched.lastName && formikProps.errors.lastName}
                                        />
                                        <FormInput
                                            style={{
                                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                                fontSize: 20,
                                                borderColor: formikProps.touched.email && formikProps.errors.email ? 'red' : '#999999'
                                            }}
                                            formFieldLabel="Email"
                                            placeHolderText=""
                                            handleChange={formikProps.handleChange('email')}
                                            onVlur={formikProps.handleBlur('email')}
                                            value={formikProps.values.email}
                                            required={true}
                                            autoCapitalize='none'
                                            autoFocus
                                            validateText={formikProps.touched.email && formikProps.errors.email}
                                        />
                                        <FormInput
                                            style={{
                                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                                fontSize: 20,
                                                borderColor: formikProps.touched.password && formikProps.errors.password ? 'red' : '#999999'
                                            }}
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
                                            placeHolderText=""
                                            icons={this.state.icons}
                                            handleChange={formikProps.handleChange('password')}
                                            value={formikProps.values.password} required={true}
                                            validateText={formikProps.touched.password && formikProps.errors.password}
                                        />
                                        <FormInput
                                            style={{
                                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                                fontSize: 20,
                                                borderColor: formikProps.touched.phnNumber && formikProps.errors.phnNumber ? 'red' : '#999999'
                                            }}
                                            formFieldLabel="Phone Number"
                                            onBlur={formikProps.handleBlur('phnNumber')}
                                            placeHolderText=""
                                            handleChange={formikProps.handleChange('phnNumber')}
                                            value={formikProps.values.phnNumber} required={true}
                                            validateText={formikProps.touched.phnNumber && formikProps.errors.phnNumber}
                                        />
                                        <View>

                                        </View>
                                        <View style={{flex: 1, }}>
                                            <Text style={{width: "90%", marginHorizontal: 20, }}>Select Gender</Text>
                                            <View style={{width: "90%", borderWidth: 1, marginHorizontal: 20,marginVertical: 10, borderRadius: 4}}>
                                                <Picker
                                                    selectedValue={this.state.gender}
                                                    style={{height: 50, width: "100%",}}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        this.setState({gender: itemValue})
                                                    }>
                                                <Picker.Item label="--please select--" value="--please select--" />
                                                <Picker.Item label="Male" value="Male" />
                                                <Picker.Item label="Female" value="Female" />
                                                </Picker>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{paddingLeft: 20,paddingRight: 20, marginVertical: 10}}>{'Please select Date'}</Text>
                                        <View style={{position:'relative', width: '90%',
                                                justifyContent:'center',borderWidth: 1, borderRadius: 6,borderColor: '#999999',
                                                alignSelf:'center',
                                                paddingLeft: 20,
                                                paddingRight: 20}}>
                                            <TextInput
                                                style={{width: '100%', }}
                                                placeholder=""
                                                defaultValue={buttonLable}
                                                />
                                            <Icons
                                                name='calendar'
                                                color='#000'
                                                style={{position: 'absolute', right: 25, fontSize: 20}}
                                                size={28}
                                                onPress={this.datepicker}
                                            />
                                        </View>
                                        { show && <DateTimePicker value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.setDate} />
                            }
                                        </View>
                                        <FormInput
                                            style={{
                                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                                fontSize: 20,
                                                borderColor: '#999999'
                                            }}
                                            formFieldLabel="Address"
                                            placeHolderText=""
                                            handleChange={(value) => {
                                                this.setState({
                                                    address: value
                                                })
                                            }}
                                            value={this.state.address}
                                        />
                                        {this.props.isPending === true ? (
                                            <ActivityIndicator size="large" color="#3498db" />
                                        ) : (
                                                <Button buttonAction={() => {
                                                    formikProps.handleSubmit();
                                                }} label="Sign Up" />
                                            )}
                                    </React.Fragment>
                                )}
                            </Formik>
                        </View>
                        <View style={styles.orLoginUsing}>
                            <View
                                 style={{
                                    fontSize: 18,
                                    opacity: .7,
                                    marginBottom: 30,
                                    flexDirection: 'row'
                                }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    color: '#2c3e50'}}>
                                    Already a User ? 
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.authSwitch;
                                    this.props.navigation.navigate("Login", {role: receivedValue})
                                }}>
                                <Text style={{textDecorationLine: 'underline',
                                    fontWeight: "bold",
                                    color: '#2c3e50'}}> Please Login</Text>
                                </TouchableOpacity>
                            </View>

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
    return {
        Signup: (data, pagePath) => {
            dispatch(Signup(data, pagePath))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SprSignUp);
