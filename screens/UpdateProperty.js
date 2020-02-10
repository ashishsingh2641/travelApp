import React, { Component } from 'react'
import {View, Text, ScrollView} from 'react-native';
import FormInput from "../components/FormInput";
import Button from '../components/Button';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
const pin =  new RegExp("[0-9]{5}(-[0-9]{4})?");
const pwd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
export const validateProperty = yup.object().shape({  
    ownerName: yup
    .string().label('name').required(),
    address1: yup
        .string().label('Address').required(),
    address2: yup
        .string().label('Adress second').required(),
    // City: yup
    //     .string().label('city').required(),
    pinCode: yup
        .string()
        .label('pincode')
        .required()
        .matches(pin, 'Pin number is not valid'),
    landmark: yup
        .string().label('landmark').required(),
   
    });
class UpdateProperty extends Component {
    render() {
       const props = this.props.navigation.getParam("obj");
       //console.log(typeof props.price);
        return (
            <ScrollView>
            <View>
            <Formik initialValues={{
                id: props.id,
                address1: props.address1,
                address2: props.address2,
                city: props.selectedCities,
                state: props.states,
                pinCode: props.pinCode,
                locality: props.selectedLocality,
                imageUrl: props.imageUrl,
                landmark: props.landmark,
                ownerMobileNumber: props.ownerMobileNumber,
                is_available: true,
                ownerName: props.ownerName,
                fullFurnished: props.fullFurnished,
                semiFurnished: props.semiFurnished,
                description: props.description,
                ac: props.ac,
                nonAc: props.nonAc,
                wifi: props.wifi,
                powerBackUp: props.powerBackUp,
                tv: props.tv,
                sell: props.sell,
                rent: props.rent,
                price: props.price.toString()
            }}
                onSubmit={(values) => {
                   // alert(this.state.selectedState + "asdjahsjdhajsdhjashd");
                    this.setState({
                        spinner: true,
                        textContent: 'Showing your property list please waits....'
                    })
                    //alert(values.price);
                    axios.put(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/updateProperty/${props.id}`, {
                        address1: values.address1,
                        address2: values.address2,
                        city: props.selectedCities,
                        state: props.states,
                        pinCode: props.pinCode,
                        locality: props.selectedLocality,
                        imageUrl: props.imageUrl,
                        landmark: values.landmark,
                        ownerMobileNo: values.ownerMobileNo,
                        is_available: true,
                        ownerName: values.ownerName,
                        fullFurnished: props.fullFurnished,
                        semiFurnished: props.semiFurnished,
                        description: values.description,
                        ac: props.ac,
                        nonAc: props.nonAc,
                        wifi: props.wifi,
                        powerBackUp: props.powerBackUp,
                        tv: props.tv,
                        sell: props.sell,
                        rent: props.rent,
                        price: parseInt(values.price)
                    }).then(res => this.props.navigation.navigate("Admin"))
                    .catch(err => console.log(err))
                }}
                validationSchema={validateProperty}>
                {formikProps => (
                    <>
                    <FormInput
                            style={{
                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                borderColor: formikProps.touched.ownerName && formikProps.errors.ownerName ? 'red' : 'grey'
                            }}
                            formFieldLabel="Owner Name"
                            onBlur={formikProps.handleBlur('ownerName')}
                            placeHolderText="Please enter ownerName"
                            handleChange={formikProps.handleChange('ownerName')}
                            value={formikProps.values.ownerName} required={true}
                            validateText={formikProps.touched.ownerName && formikProps.errors.ownerName}
                        />
                        <FormInput
                            style={{
                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                borderColor: formikProps.touched.ownerMobileNo && formikProps.errors.ownerMobileNo ? 'red' : 'grey'
                            }}
                            formFieldLabel="Owner Phone Number"
                            onBlur={formikProps.handleBlur('ownerMobileNo')}
                            placeHolderText="Please enter Number"
                            handleChange={formikProps.handleChange('ownerMobileNo')}
                            value={formikProps.values.ownerMobileNo} required={true}
                            validateText={formikProps.touched.ownerMobileNo && formikProps.errors.ownerMobileNo}
                        />
                        <FormInput
                            style={{
                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                borderColor: formikProps.touched.address1 && formikProps.errors.address1 ? 'red' : 'grey'
                            }}
                            formFieldLabel="Flat Number / Holding Number"
                            onBlur={formikProps.handleBlur('address1')}
                            placeHolderText="Please enter AddressLine"
                            handleChange={formikProps.handleChange('address1')}
                            value={formikProps.values.address1} required={true}
                            validateText={formikProps.touched.address1 && formikProps.errors.address1}
                        />
                        <FormInput
                            style={{
                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                borderColor: formikProps.touched.address1 && formikProps.errors.address1 ? 'red' : 'grey'
                            }}
                            formFieldLabel="Street / Area"
                            onBlur={formikProps.handleBlur('address2')}
                            placeHolderText="Please enter street name or area name..."
                            handleChange={formikProps.handleChange('address2')}
                            value={formikProps.values.address2} required={true}
                            validateText={formikProps.touched.address2 && formikProps.errors.address2}
                        />
                        <FormInput
                            style={{
                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                borderColor: formikProps.touched.landmark && formikProps.errors.landmark ? 'red' : 'grey'
                            }}
                            formFieldLabel="landmark"
                            onBlur={formikProps.handleBlur('landmark')}
                            placeHolderText="Please enter landmark"
                            handleChange={formikProps.handleChange('landmark')}
                            value={formikProps.values.landmark} required={true}
                            validateText={formikProps.touched.landmark && formikProps.errors.landmark}
                        />
                        <FormInput
                            style={{
                                borderWidth: 1, fontSize: 15, marginBottom: 10, borderRadius: 4,
                                borderColor: formikProps.touched.pinCode && formikProps.errors.pinCode ? 'red' : 'grey'
                            }}
                            formFieldLabel="Pincode"
                            onBlur={formikProps.handleBlur('pinCode')}
                            placeHolderText="Please enter pincode"
                            handleChange={formikProps.handleChange('pinCode')}
                            value={formikProps.values.pinCode} required={true}
                            validateText={formikProps.touched.pinCode && formikProps.errors.pinCode}
                        />
                        <View>
                            <FormInput
                                underlineColorAndroid="transparent"
                                placeholder="Type something"
                                placeholderTextColor="grey"
                                numberOfLines={20}
                                multiline={true}
                                style={{
                                    borderWidth: 1, fontSize: 15, marginBottom: 10, borderRadius: 4, height: 100, borderRadius: 4,
                                    borderColor: formikProps.touched.description && formikProps.errors.description ? 'red' : 'grey'
                                }}
                                formFieldLabel="Description"
                                onBlur={formikProps.handleBlur('description')}
                                placeHolderText="Please enter text...."
                                handleChange={formikProps.handleChange('description')}
                                value={formikProps.values.description} required={true}
                                validateText={formikProps.touched.description && formikProps.errors.description} />
                              
                        </View>
                        <View>
                            <FormInput
                            style={{
                                borderWidth: 1, fontSize: 15, borderRadius: 4,
                                borderColor: formikProps.touched.price && formikProps.errors.price ? 'red' : 'grey'
                            }}
                            formFieldLabel="Pricing"
                            onBlur={formikProps.handleBlur('price')}
                            placeHolderText="Please enter ...."
                            handleChange={formikProps.handleChange('price')}
                            value={formikProps.values.price}
                            required={true}
                            validateText={formikProps.touched.price && formikProps.errors.price}
                        />
                        </View>
                       <View style={{marginBottom: 20}}>
                            <Button label="Update" buttonAction={formikProps.handleSubmit} />
                       </View>
                    </>
                )}
            </Formik>
            </View>
            </ScrollView>
        )
    }
}

export default UpdateProperty;

