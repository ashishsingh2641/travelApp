import React, { Component } from 'react';
import {View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/SimpleLineIcons';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
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
                    borderBottomWidth: 2, fontSize: 20, }}/>
                
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
                </TouchableOpacity>
            </View>
        );
    }
}

export default ForgotPassword;