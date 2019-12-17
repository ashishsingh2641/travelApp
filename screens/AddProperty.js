import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, StyleSheet, Image, Dimensions, CheckBox, TextInput } from 'react-native';
import axios from 'axios';
import states from '../modal/cities.json';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';
import Recmonded from '../components/Recmonded';
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { validateProperty } from './utils/AddPropertyValidation';
import Spinner from 'react-native-loading-spinner-overlay';
import Svg, {Path} from 'react-native-svg';

const width = Dimensions.get('window').width;

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
            imageUrl: [],
            spinner: false,
            textContent: 'Loading your items...',
            sell: false,
            rent: false,
            disabled: false,
            sellDisabled: false
        }
    }
    componentDidMount() {
        this.setState({
            states: [...array]
        });
    }
    handleChoosePhoto = (event) => {
        ImagePicker.openPicker({
            width: width-20,
            height: 200,
            cropping: true,
            multiple: true,
            includeBase64: true,
            compressImageQuality: 0
          }).then(image => {
              const imageData = [];
              imageData.push(image);
                if (image.length <= 3) {
                    this.setState({imageUrl: image});
                }
                else {
                    event.preventDefault();
                    alert("You show not select more then 3 images")
                }
          });
    }
    render() {
        const { photo } = this.state;
        return (
            <ScrollView>
                <View>
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
                            this.setState({
                                spinner: true,
                                textContent: 'Redirecting you to explore page....'
                            })
                            const appconfig = {
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    'Content-Type': 'application/json; charset=UTF-8'
                                }
                            }
                            debugger;
                            axios.post('http://192.168.0.103:5000/api/property/addProperty', {
                                address1: values.address1,
                                address2: values.address2,
                                city: this.state.selectedCities,
                                state: this.state.selectedState,
                                pinCode: values.pinCode,
                                imageUrl: JSON.stringify(this.state.imageUrl),
                                landmark: values.landmark,
                                typeOfProperty: '',
                                ownerMobileNumber: '',
                                is_available: false,
                                ownerName: '',
                                fullFurnished: false,
                                semiFurnished: true,
                                description: 'asdhjashdjahsdjahsdj',
                                ac: true,
                                nonAc: false
                            }, appconfig).then(res => {
                                this.setState({
                                    spinner: false
                                })
                                alert("Upload successfull")
                                if (res.status === 200) {
                                   
                                    this.props.navigation.navigate("Explore");
                                    this.setState({ imageUrl: [] });
                                }
                            }).catch(err =>{console.log(JSON.stringify(err))} )
                        }}
                        validationSchema={validateProperty}>
                        {formikProps => (
                            <>
                                <FormInput
                                    style={{
                                        borderWidth: 1, fontSize: 20,borderRadius: 4,
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
                                        borderWidth: 1, fontSize: 20,borderRadius: 4,
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
                                        borderWidth: 1, fontSize: 20,borderRadius: 4,
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
                                        borderWidth: 1, fontSize: 20, marginBottom: 40,borderRadius: 4,
                                        borderColor: formikProps.touched.pinCode && formikProps.errors.pinCode ? 'red' : 'grey'
                                    }}
                                    formFieldLabel="Pincode"
                                    onBlur={formikProps.handleBlur('pinCode')}
                                    placeHolderText="Please enter pinCode"
                                    handleChange={formikProps.handleChange('pinCode')}
                                    value={formikProps.values.pinCode} required={true}
                                    validateText={formikProps.touched.pinCode && formikProps.errors.pinCode}
                                />
                                <View style={{ flexDirection: 'column', marginLeft: 15, marginRight: 15 }}>
                                            <Text style={{fontWeight: 'bold', fontSize: 18}}>Property Type *</Text>
                                            <View style={{flexDirection: "row"}}>
                                                <CheckBox
                                                 disabled={this.state.sellDisabled}
                                                value={this.state.sell}
                                                onValueChange={() => {
                                                    this.setState({ sell: !this.state.sell }, () => {
                                                        if (this.state.sell === true) {
                                                            this.setState({
                                                                disabled: true
                                                            })
                                                        } else {
                                                            this.setState({
                                                                disabled: false
                                                            })
                                                        }
                                                    })
                                                }}
                                                />
                                                <Text style={{marginTop: 5, fontSize: 18}}>Sell</Text>
                                            </View>
                                            <View style={{flexDirection: "row"}}>
                                                <CheckBox
                                                    value={this.state.rent}
                                                    disabled={this.state.disabled}
                                                    onValueChange={(event) => this.setState({ rent: !this.state.rent }, () => {
                                                        if (this.state.sell === true) {
                                                            this.setState({
                                                                sellDisabled: true
                                                            })
                                                        } else {
                                                            this.setState({
                                                                sellDisabled: false
                                                            })
                                                        }
                                                    })}/>
                                                <Text style={{marginTop: 5, fontSize: 18}}>Rent</Text>
                                            </View>
                                        </View>
                                 
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.imageUrl <= 0 ? 
                                            <Text>{"please uplaod images"}</Text>
                                            :
                                            <>
                                                <Text style={{textAlign: 'left'}}>uploded images</Text>
                                                {this.state.imageUrl.map((item) => {
                                                   return (
                                                        <View key={Math.random()}>
                                                             <Recmonded imagrUri={`data:${item.mime};base64,${item.data}`} />
                                                        </View>
                                                   )
                                                })}
                                            </>
                                        }
                                    {this.state.imageUrl.length > 0 ? <Text /> : 
                                    <Button buttonAction={this.handleChoosePhoto} icon={"download"} color={"white"} style={{fontSize: 20, fontWeight: "bold"}} />}
                                </View>
                                <Text style={{margin: 20}}>Description *</Text>
                                <View style={{ borderColor: "grey", marginLeft: 20, marginRight: 20,
                                        borderWidth: 1,
                                        padding: 5}}>
                                       
                                        <TextInput
                                        style={{height: 50, borderRadius: 4,
                                            justifyContent: "flex-start"}}
                                        underlineColorAndroid="transparent"
                                        placeholder="Type something"
                                        placeholderTextColor="grey"
                                        numberOfLines={10}
                                        multiline={true}
                                        />
                                    </View>
                                <Spinner
                                    textStyle={{ color: "white" }}
                                    visible={this.state.spinner}
                                    textContent={this.state.textContent} />
                                <Button label="Addproperty" buttonAction={formikProps.handleSubmit} />
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        )
    }
}

export default AddProperty;
