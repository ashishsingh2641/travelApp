import React, { Component } from 'react';
import {View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity,Alert, TouchableHighlight,ScrollView,Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { emailId: '',  modalVisible: false,password: '', confirmPassword: '', userId: '' };
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    
    onSubmitEditing = () => {
        axios.get(`http://192.168.0.103:5000/api/user/getEmail/${this.state.emailId}`)
        .then(res => {
            console.log(res.data);
            this.setState({
                userId: res.data
            })
            if(res.data) {
                this.setModalVisible(true);
            }
        })
        .catch(err => console.log(err))
    }
    handlePasswordChange = () => {
        if (this.state.password === this.state.confirmPassword) {
            axios.put(`http://192.168.0.103:5000/api/user/changePassword/${this.state.userId}?latestPassword=${this.state.password}`)
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
                      {text: 'OK', onPress: () => this.props.navigation.navigate("Login")},
                    ],
                    {cancelable: false},
                  );
                this.setModalVisible(false)
            })
            .catch(err => alert(JSON.stringify(err)))
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
                    onSubmitEditing={this.onSubmitEditing}/>
            </KeyboardAvoidingView>
            </LinearGradient>
                <TouchableOpacity style={{zIndex: 9999, elevation: 5, position: 'absolute',right: 10, textAlign: 'center', elevation: 5,
                    width: 80, height: 80, bottom: 10, borderRadius: 50}} onPress={() => alert('an email is sent to your mail id ')}>
                <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0, y: 1 }}
                    colors={['#2c3e50', '#5691c8']} style={{ zIndex: 0}}>
                        <Icons name="arrow-right" style={{color: "white", fontSize: 30, 
                        fontWeight: 'bolder', position: 'absolute', 
                            textAlign: 'center', top:30, left: 25}}/>
                    </LinearGradient>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={this.onRequestClose}>
                        <View style={{marginTop: 22}}>
                        <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <Text style={{marginTop: 10, marginBottom: 10 , fontSize: 15,color: 'black'}}>Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={{borderWidth:2 ,borderColor: "#999999"}}
                            placeholder={"Please enter new password"}
                            handleChange={(value) => this.setState({
                                password: value
                            })} />
                        <Text style={{marginTop: 10, marginBottom: 10 , fontSize: 15,color: 'black'}}>Confirm Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={{borderWidth:2 ,borderColor: "#999999"}}
                            placeholder={"Please enter confirm password"}
                            handleChange={(value) => this.setState({
                                confirmPassword: value
                            })} />
                        <Button buttonAction={this.handlePasswordChange} label="Submit" />
                        </View>
          </View>
        </Modal>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ForgotPassword;