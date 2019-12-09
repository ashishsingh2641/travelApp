import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import states from '../modal/cities.json';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';
import { validateProperty } from './utils/AddPropertyValidation';
import Axios from 'axios';
const __cities = states;
var array = states;
var seenNames = {};
array = array.filter(function (currentObject) {
    if (currentObject.state in seenNames) {
        return false;
    } else {
        seenNames[currentObject.state] = true;
        return true;
    }
});

class AddProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedState: '',
            states: [],
            cities: [],
            selectedCities: '',
            photo: null
        }
    }
    componentDidMount() {
        this.setState({
            states: [...array]
        });
    }
    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            alert(JSON.stringify(response.path))
            console.log(response)
            if (response.uri) {
                this.setState({ photo: response })
            }
        });

    }
    render() {
        const { photo } = this.state;
        return (
            <ScrollView>
                <View>
                    <Text style={{ fontSize: 30, marginLeft: 20, marginTop: 20 }}>Add Property</Text>
                    <Formik initialValues={{
                        address1: '',
                        address2: '',
                        city: '',
                        pinCode: '123456',
                        imageUrl: '',
                        state: '',
                        landmark: '',
                        typeOfProperty: '',
                        ownerMobileNumber: '',
                        ownerName: ''

                    }}
                        onSubmit={(values) => {
                            const data = {
                                address1: values.AddressLine1,
                                address2: values.AddressLine2,
                                city: this.state.selectedCities,
                                state: this.state.selectedState,
                                pinCode: values.pincode,
                                imageUrl: this.state.photo.uri,
                                landmark: '',
                                typeOfProperty: '',
                                ownerMobileNumber: '',
                                ownerName: ''
                            }
                            console.log(this.state.photo.uri);
                            axios.post('http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/property/addProperty', {
                                address1: values.address1,
                                address2: values.address2,
                                city: this.state.selectedCities,
                                state: this.state.selectedState,
                                pinCode: values.pinCode,
                                imageUrl: this.state.photo.uri,
                                landmark: values.landmark,
                                typeOfProperty: '',
                                ownerMobileNumber: '',
                                isAvailable: '',
                                ownerName: ''
                            }).then(res => {
                                alert(JSON.stringify(res))
                                if (res.status === 200) {
                                    this.props.navigation.navigate("Explore")
                                }
                            })
                                .catch(err => alert(JSON.stringify(err)))
                        }}
                        validationSchema={validateProperty}>
                        {formikProps => (
                            <>
                                <FormInput
                                    style={{
                                        borderWidth: 1, fontSize: 20,
                                        borderColor: formikProps.touched.address1 && formikProps.errors.address1 ? 'red' : 'grey'
                                    }}
                                    formFieldLabel="AddressLine1"
                                    onBlur={formikProps.handleBlur('address1')}
                                    placeHolderText="Please enter AddressLine"
                                    handleChange={formikProps.handleChange('address1')}
                                    value={formikProps.values.address1} required={true}
                                    validateText={formikProps.touched.address1 && formikProps.errors.address1}
                                />
                                <FormInput
                                    style={{
                                        borderWidth: 1, fontSize: 20,
                                        borderColor: formikProps.touched.address1 && formikProps.errors.address1 ? 'red' : 'grey'
                                    }}
                                    formFieldLabel="address2"
                                    onBlur={formikProps.handleBlur('address2')}
                                    placeHolderText="Please enter address2"
                                    handleChange={formikProps.handleChange('address2')}
                                    value={formikProps.values.address2} required={true}
                                    validateText={formikProps.touched.address2 && formikProps.errors.address2}
                                />
                                <FormInput
                                    style={{
                                        borderWidth: 1, fontSize: 20,
                                        borderColor: formikProps.touched.landmark && formikProps.errors.landmark ? 'red' : 'grey'
                                    }}
                                    formFieldLabel="landmark"
                                    onBlur={formikProps.handleBlur('landmark')}
                                    placeHolderText="Please enter landmark"
                                    handleChange={formikProps.handleChange('landmark')}
                                    value={formikProps.values.landmark} required={true}
                                    validateText={formikProps.touched.landmark && formikProps.errors.landmark}
                                />
                                <View style={{ marginLeft: 20, marginRight: 20 }}>
                                    <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 15 }}>Select your state:-</Text>
                                    <Picker
                                        selectedValue={this.state.selectedState}
                                        style={{ height: 50, width: "100%", border: 1, borderColor: "black" }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            this.setState({ selectedState: itemValue }, () => {
                                                const cities = [];
                                                __cities.filter(function (item) {
                                                    return item.state === itemValue;
                                                }).map(function ({ id, name }) {
                                                    cities.push(name)
                                                });
                                                this.setState({
                                                    cities
                                                })
                                            })
                                        }}>
                                        <Picker.Item label={"--please select--"} value={"--please select--"} />
                                        {this.state.states.map((item) => {
                                            return (
                                                <Picker.Item label={item.state} value={item.state} key={item.state} />
                                            )
                                        })}
                                    </Picker>
                                </View>
                                <View style={{ marginLeft: 20, marginRight: 20 }}>
                                    <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 15 }}>Select your city:-</Text>
                                    <Picker selectedValue={this.state.selectedCities}
                                        style={{ height: 50, width: "100%", border: 1, borderColor: "black" }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            this.setState({ selectedCities: itemValue })
                                        }}>
                                        <Picker.Item label={"--please select--"} value={"--please select--"} />
                                        {this.state.cities.map((item) => {
                                            return (
                                                <Picker.Item label={item} value={item} key={item} />
                                            )
                                        })}
                                    </Picker>
                                </View>
                                <FormInput
                                    style={{
                                        borderWidth: 1, fontSize: 20,
                                        borderColor: formikProps.touched.pinCode && formikProps.errors.pinCode ? 'red' : 'grey'
                                    }}
                                    formFieldLabel="Pincode"
                                    onBlur={formikProps.handleBlur('pinCode')}
                                    placeHolderText="Please enter pinCode"
                                    handleChange={formikProps.handleChange('pinCode')}
                                    value={formikProps.values.pinCode} required={true}
                                    validateText={formikProps.touched.pinCode && formikProps.errors.pinCode}
                                />
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    {photo && (
                                        <Image
                                            source={{ uri: photo.uri }}
                                            style={{ width: 300, height: 300 }}
                                        />
                                    )}
                                    <Button buttonAction={this.handleChoosePhoto} label="Choose Photo" />
                                </View>
                                <Button label="Addproperty" buttonAction={formikProps.handleSubmit} />
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    ColoredText: {
        fontSize: 20,
        color: '#2c3e50',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
        textAlign: 'left',
        marginBottom: 40
    },
})

export default AddProperty;
