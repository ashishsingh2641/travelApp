import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, Picker, TextInput } from 'react-native';
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
import Icons from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',          
            phnNumber: '',
            password: '',
            role: '',         
            dob: '',
            address: '',           
            gender: '',
            id: '', 
            isLoading: false, 
            obj: this.props.navigation.getParam('obj')
        }
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    componentDidMount() {
         
        this.setState({
            firstName: this.state.obj.firstName,
            lastName: this.state.obj.lastName,
            email: this.state.obj.email,
            phnNumber: this.state.obj.phnNumber,
            password: this.state.obj.password,
            role: this.state.obj.role,
            dob: this.state.obj.dob,
            address: this.state.obj.address,
            gender: this.state.obj.gender,
            id: this.state.obj.id
        })
    }
    handleUpdate = () => {
        this.setState({
            isLoading: true
        })
        if (this.state.firstName && this.state.lastName && this.state.address && (this.state.gender === "Male" || this.state.gender === "Female")) {
            axios.put('http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/user/update', {
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                phnNumber: this.state.phnNumber,
                role: this.state.role,
                gender: this.state.gender,
                address: this.state.address,
                dob: this.state.obj.dob,
                id: this.state.id,
            })
            .then(res => {
                this.setState({
                    isLoading: false
                }, () => {
                    Alert.alert(
                        'Your profile has been updated',
                        '',
                        [
                          {
                            text: 'Cancel',
                             style: 'cancel',
                          },
                          {text: 'OK', onPress: () => this.props.navigation.navigate('Welcome')},
                        ],
                        {cancelable: false},
                    ); 
                })
                
            })
            .catch(err => alert('Something went wrong'))
        }else  {
            this.setState({
                isLoading: false
            })
            Alert.alert(
                'Somthing went wrong',
                '',
                [
                  {text: 'Ask me later',
                  style: 'cancel',
                    },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK',
                  style: 'cancel'},
                ],
                {cancelable: false},
            );
        }
    }
    render () {
        //alert(this.state.obj.dob);
        
        let buttonLable = new Date(this.state.obj.dob);
        buttonLable = this.state.obj.dob.substring(0, this.state.obj.dob.indexOf('T'));
        buttonLable = buttonLable.split("-").join("/")
        //alert(buttonLable)
        
        return(
            <ScrollView>
            <View>
                <Text style={{paddingLeft: 20,paddingRight: 20, marginVertical: 10}}>FirstName</Text>
                <View style={{ width: "90%",justifyContent:'center',borderWidth: 1, borderRadius: 6,borderColor: '#999999',
                alignSelf:'center',
                paddingLeft: 20,
                paddingRight: 20}}>
                    <TextInput
                        style={{fontSize: 15}}
                        value={this.state.firstName}
                        onChangeText={(text) => this.setState({firstName: text})} />
                </View>
            </View>
            <View>
                <Text style={{paddingLeft: 20,paddingRight: 20, marginVertical: 10}}>LastName</Text>
                <View style={{ width: "90%",justifyContent:'center',borderWidth: 1, borderRadius: 6,borderColor: '#999999',
                alignSelf:'center',
                paddingLeft: 20,
                paddingRight: 20}}>
                    <TextInput
                         style={{fontSize: 15}}
                        value={this.state.lastName}
                        onChangeText={(text) => this.setState({lastName: text})} />
                </View>
            </View>
            <View>
                <Text style={{paddingLeft: 20,paddingRight: 20, marginVertical: 10}}>Email</Text>
                <View style={{ width: "90%",justifyContent:'center',borderWidth: 1, borderRadius: 6,borderColor: '#999999',
                alignSelf:'center',
                paddingLeft: 20,
                paddingRight: 20}}>
                    <TextInput
                         style={{fontSize: 15}}
                        editable={false}
                        value={this.state.email} />
                </View>
            </View>
            <View>
                <Text style={{paddingLeft: 20,paddingRight: 20, marginVertical: 10}}>Phone Number</Text>
                <View style={{ width: "90%",justifyContent:'center',borderWidth: 1, borderRadius: 6,borderColor: '#999999',
                alignSelf:'center',
                paddingLeft: 20,
                paddingRight: 20}}>
                    <TextInput
                         style={{fontSize: 15}}
                        editable={false}
                        value={this.state.phnNumber} />
                </View>
            </View>
            <View>
                <Text style={{paddingLeft: 20,paddingRight: 20, marginVertical: 10}}>Phone Number</Text>
                <View style={{ width: "90%",justifyContent:'center',borderWidth: 1, borderRadius: 6,borderColor: '#999999',
                alignSelf:'center',
                paddingLeft: 20,
                paddingRight: 20}}>
                     <Picker
                        selectedValue={this.state.gender}
                        style={{height: 50, width: "100%",}}
                        onValueChange={(itemValue, itemIndex) =>
                        this.setState({gender: itemValue})}>
                        <Picker.Item label="--please select--" value="--please select--" />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                </View>
            </View>
            <View>
                <Text style={{paddingLeft: 20,paddingRight: 20, marginVertical: 10}}>Date of birth</Text>
                <View style={{ width: "90%",justifyContent:'center',borderWidth: 1, borderRadius: 6,borderColor: '#999999',
                alignSelf:'center',
                paddingLeft: 20,
                paddingRight: 20}}>
                    <TextInput
                         style={{fontSize: 15}}
                        editable={false}
                        value={buttonLable} />
                </View>
            </View>
            <View>
                <Text style={{paddingLeft: 20,paddingRight: 20, marginVertical: 10}}>Address</Text>
                <View style={{ width: "90%",justifyContent:'center',borderWidth: 1, borderRadius: 6,borderColor: '#999999',
                alignSelf:'center',
                paddingLeft: 20,
                paddingRight: 20}}>
                    <TextInput
                        onChangeText={(text) => this.setState({address: text})}
                        style={{fontSize: 15}}
                        value={this.state.address} />
                </View>
            </View>
                {this.props.isLoading === true ? (
                    <ActivityIndicator size="large" color="#3498db" />
                ) : (
                <Button label="Update Profile" buttonAction={this.handleUpdate} />
                )}
            </ScrollView>
            
        )
    }
}
    