import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, TextInput, RefreshControl } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';

class AddProperty extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <View>
            <Text style={{fontSize: 30, marginLeft: 20, marginTop: 20}}>Add Property</Text>     
            <Formik initialValues={{
                AddressLine1: '',
                AddressLine2: ''
            }}>
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
                    borderColor: formikProps.touched.City && formikProps.errors.City ? 'red' : 'grey'
                }}
                formFieldLabel="City"
                onBlur={formikProps.handleBlur('City')}
                placeHolderText="Please enter City"
                handleChange={formikProps.handleChange('City')}
                value={formikProps.values.City} required={true}
                validateText={formikProps.touched.City && formikProps.errors.City}
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
            <FormInput
                style={{
                    borderWidth: 1, fontSize: 20,
                    borderColor: formikProps.touched.State && formikProps.errors.State ? 'red' : 'grey'
                }}
                formFieldLabel="State"
                onBlur={formikProps.handleBlur('State')}
                placeHolderText="Please enter State"
                handleChange={formikProps.handleChange('State')}
                value={formikProps.values.State} required={true}
                validateText={formikProps.touched.State && formikProps.errors.State}
            />
            <Button label="Addproperty" />
            </>
                 )}
        </Formik>
        </View>

        )
    }
}

export default AddProperty;
