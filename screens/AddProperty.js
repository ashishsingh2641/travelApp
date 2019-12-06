import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, StyleSheet } from 'react-native';
import states from '../modal/cities.json';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';
import { validateProperty } from './utils/AddPropertyValidation';
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
            selectedCities: ''
        }
    }
    componentDidMount() {
        this.setState({
            states: [...array]
        });
    }
    render() {
        return (
            <ScrollView
                scrollEventThrottle={16}>
                <View>
                    <Text style={{ fontSize: 30, marginLeft: 20, marginTop: 20 }}>Add Property</Text>
                    <Formik initialValues={{
                        AddressLine1: '',
                        AddressLine2: '',
                        City: '',
                        pincode: '123456'
                    }}
                        onSubmit={(values) => {
                            const data = {
                                AddressLine1: values.AddressLine1,
                                AddressLine2: values.AddressLine2,
                                City: this.state.selectedCities,
                                pincode: values.pincode
                            }
                            alert(JSON.stringify(data))
                        }}
                        validationSchema={validateProperty}>
                        {formikProps => (
                            <>
                                <FormInput
                                    style={{
                                        borderWidth: 1, fontSize: 20,
                                        borderColor: formikProps.touched.AddressLine1 && formikProps.errors.AddressLine1 ? 'red' : 'grey'
                                    }}
                                    formFieldLabel="AddressLine1"
                                    onBlur={formikProps.handleBlur('AddressLine1')}
                                    placeHolderText="Please enter AddressLine1"
                                    handleChange={formikProps.handleChange('AddressLine1')}
                                    value={formikProps.values.AddressLine1} required={true}
                                    validateText={formikProps.touched.AddressLine1 && formikProps.errors.AddressLine1}
                                />
                                <FormInput
                                    style={{
                                        borderWidth: 1, fontSize: 20,
                                        borderColor: formikProps.touched.AddressLine2 && formikProps.errors.AddressLine2 ? 'red' : 'grey'
                                    }}
                                    formFieldLabel="AddressLine2"
                                    onBlur={formikProps.handleBlur('AddressLine2')}
                                    placeHolderText="Please enter AddressLine2"
                                    handleChange={formikProps.handleChange('AddressLine2')}
                                    value={formikProps.values.AddressLine2} required={true}
                                    validateText={formikProps.touched.AddressLine2 && formikProps.errors.AddressLine2}
                                />
                                <FormInput
                                    style={{
                                        borderWidth: 1, fontSize: 20,
                                        borderColor: formikProps.touched.pincode && formikProps.errors.pincode ? 'red' : 'grey'
                                    }}
                                    formFieldLabel="Pincode"
                                    onBlur={formikProps.handleBlur('pincode')}
                                    placeHolderText="Please enter pincode"
                                    handleChange={formikProps.handleChange('pincode')}
                                    value={formikProps.values.pincode} required={true}
                                    validateText={formikProps.touched.pincode && formikProps.errors.pincode}
                                />
                                <View style={{ marginLeft: 20, marginRight: 20 }}>
                                    <Text style={{ marginTop: 10, marginBottom: 10 , fontSize: 15}}>Select your state:-</Text>
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
                                    <Text style={{ marginTop: 10, marginBottom: 10 , fontSize: 15}}>Select your state:-</Text>
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
