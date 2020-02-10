import React, { Component } from 'react';
import {View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity,Alert, TouchableHighlight,ScrollView,Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { emailId: '', 
        secureTextEntry: true,
        icons: "eye-off-outline",
        count: 0,
        secureTextEntry1: true,
        icons1: "eye-off-outline",
        count1: 0,
        modalVisible: false,
        password: null, confirmPassword: null, userId: '' };
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    
    onSubmitEditing = () => {
        axios.get(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/user/getEmail/${this.state.emailId}`)
        .then(res => {
            console.log(res.data);
            this.setState({
                userId: res.data 
            })
            if(res.data) {
                this.setModalVisible(true);
            }
        })
        .catch(err => alert('Email is not valid'))
    }
    handlePasswordChange = () => {
        if (this.state.password === this.state.confirmPassword) {
            axios.put(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/user/changePassword/${this.state.userId}?latestPassword=${this.state.password}`)
            .then(res => {
                Alert.alert(
                    'Alert Title',
                    `${res.data}`,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => this.props.navigation.navigate("Login", {refresh: res})},
                    ],
                    {cancelable: false},
                  );
                this.setModalVisible(false)
            })
            .catch(err => alert(JSON.stringify(err)))
        } else {
            alert("Password is not matched");
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
    toggleIcon1 = (e) => {
        this.setState({
            count1: this.state.count1+1
        });
        if (this.state.count1 % 2 === 0) {
            this.setState({
                icons1: "eye-outline",
                secureTextEntry1: false

            })
        }else {
            this.setState({
                icons1: "eye-off-outline",
                secureTextEntry1: true
            })
        }
    }
    render() {
        return (
            <View style={{position: 'relative', height: '100%'}}>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
            colors={['#2c3e50', '#5691c8']} style={{ width: '100%', height: '100%', }}>
            <KeyboardAvoidingView style={{width: '90%', marginLeft: 15, marginRight: 15, marginTop: 20}}>
                <Text style={{color:"white", fontSize: 25}}>Forgot Your Password ?</Text>
                <Text style={{color:"white", marginBottom: 70}}>Enter your email id to find your account.</Text>
                <Text style={{color:"white", textTransform: 'uppercase'}}>Email address</Text>
                <TextInput
                    selectionColor={'white'}
                    style={{borderBottomColor: 'white', color: 'white',
                    borderBottomWidth: 2, fontSize: 20, }}
                    onChangeText={(value) => this.setState({emailId: value})}
                    />
                <Button label="Submit" buttonAction={this.onSubmitEditing} />
            </KeyboardAvoidingView>
            </LinearGradient>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={this.onRequestClose}>
                        <View style={{marginTop: 22}}>
                        <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <Text style={{marginTop: 10, marginBottom: 10 ,paddingLeft: 20, fontSize: 15,color: 'black'}}>Password</Text>
                        <View style={{ width: '100%',justifyContent:'center', alignSelf:'center',
                            position: 'relative', paddingLeft: 20, paddingRight: 20}}>
                                <TextInput
                                    secureTextEntry={this.state.secureTextEntry}
                                    style={{borderWidth:2 ,borderColor: "#999999"}}
                                    placeholder={"Please enter new password"}
                                    onChangeText={(value) => this.setState({
                                        password: value
                                    })}/>
                                    <Icon name={this.state.icons} size={28} style={{position: 'absolute',right:30, top: 10, color: '#2c3e50',}}
                                    onPress={(e) => {
                                        if (this.state.password === "" || this.state.password === undefined) {
                                            e.preventDefault()
                                        } else {
                                            this.toggleIcon()
                                        }
                                    }} />
                            </View>
                        <View style={{ width: '100%',justifyContent:'center', alignSelf:'center',
                            position: 'relative', paddingLeft: 20, paddingRight: 20}}>
                            <Text style={{marginTop: 10, marginBottom: 10 , fontSize: 15,color: 'black'}}>Confirm Password</Text>
                            <TextInput
                                secureTextEntry={this.state.secureTextEntry1}
                                style={{borderWidth:2 ,borderColor: "#999999"}}
                                placeholder={"Please enter confirm password"}
                                onChangeText={(value) => this.setState({
                                    confirmPassword: value
                                })} />
                                <Icon name={this.state.icons1} size={28} style={{position: 'absolute',right:30, top: 50, color: '#2c3e50',}}
                                    onPress={(e) => {
                                        if (this.state.confirmPassword === "" || this.state.confirmPassword === undefined) {
                                            e.preventDefault()
                                        } else {
                                            this.toggleIcon1()
                                        }
                                    }} />
                        </View>            
                        <Button buttonAction={this.handlePasswordChange} label="Submit" />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default ForgotPassword;