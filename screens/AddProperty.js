import React, { Component } from 'react';
import { View, Text, ScrollView, Picker,Dimensions, CheckBox, Image, Alert } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios';
import states from '../modal/cities.json';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';
import Recmonded from '../components/Recmonded';
import ImagePicker from 'react-native-image-crop-picker';
import { validateProperty } from './utils/AddPropertyValidation';
import Spinner from 'react-native-loading-spinner-overlay';
import Svg, { Path } from 'react-native-svg';
import {connect} from 'react-redux';
import LucknowData from '../modal/lucknow.json';
import kanpurData from '../modal/kanpurData.json';
import GhaziabadData from '../modal/ghazibad.json';
import Icons from 'react-native-vector-icons/AntDesign'

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
            states: '',
            cities: [],
            selectedCities: '',
            imageUrl: [],
            spinner: false,
            textContent: 'Loading your items...',
            rangeLow: '' ,
            rangeHigh: '',
            localityData: [],
            selectedLocality: ''
        }
        this.removeTodo = this.removeTodo.bind(this);
    }
    componentDidMount() {
        const cities = [];
            __cities.filter(function (item) {
                return item.state === array[8].state;
        }).map(function ({ id, name }) {
            cities.push(name)
        });
        this.setState({
            states: array[8].state,
            cities: cities
        });
    }
    removeTodo(name, i){
        let imageUrl = this.state.imageUrl.slice();
        imageUrl.splice(i, 1);
        this.setState({
            imageUrl
        })
    }
    handleChoosePhoto = (event) => {
        ImagePicker.openPicker({
            width: width - 20,
            height: 200,
            cropping: false,
            multiple: true,
            includeBase64: true,
            cropperCircleOverlay: true,
            freeStyleCropEnabled: true,
            avoidEmptySpaceAroundImage: true,
            compressImageQuality: 1
        }).then(image => {
            const imageData = [];
            imageData.push(image);
            if (image.length <= 3) {
                this.setState({ imageUrl: image });
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
                    <Svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{zIndex:0}}>
                        <View style={{width: "100%", zIndex: 1}}>  
                        </View>
                        <Text />
                        <Text />
                        <Text />
                        <Text />
                        <Text />
                        <Text />
                        <Text />
                        <Text />
                        <Text />
                        <Path d="M0.00,49.98 C290.63,266.94 207.67,-110.03 502.25,71.53 L500.00,0.00 L0.00,0.00 Z" stroke="#3498db" fill="#3498db" />
                    </Svg>
                    <Text style={{ fontSize: 30, marginLeft: 20, marginTop: 0 }}>Add Property</Text>
                    <Formik initialValues={{
                        address1: '',
                        address2: '',
                        city: '',
                        pinCode: '',
                        price: '',
                        imageUrl: '',
                        state: '',
                        landmark: '',
                        typeOfProperty: '',
                        ownerMobileNo: '',
                        ownerName: '',
                        description: '',
                        fullFurnished: '',
                        semiFurnished: '',
                        description: '',
                        price: '',
                        ac: '',
                        nonAc: '',
                        wifi: '',
                        powerBackUp: '',
                        tv: '',
                        sell: '',
                        rent: ''
                    }}
                        onSubmit={(values) => {
                           // alert(this.state.selectedState + "asdjahsjdhajsdhjashd");
                            this.setState({
                                spinner: true,
                                textContent: 'loading....'
                            })
                            const appconfig = {
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    'Content-Type': 'application/json; charset=UTF-8'
                                }
                            }
                            axios.post(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/addProperty/${this.props.email}`, {
                                ownerName: values.ownerName,
                                ownerMobileNo: values.ownerMobileNo,
                                address1: values.address1,
                                address2: values.address2,
                                city: this.state.selectedCities,
                                state: this.state.states,
                                pinCode: values.pinCode,
                                locality: this.state.selectedLocality,
                                imageUrl: JSON.stringify(this.state.imageUrl),
                                landmark: values.landmark,
                                is_available: false,
                                fullFurnished: this.state.fullFurnished,
                                semiFurnished: this.state.semiFurnished,
                                description: values.description,
                                price: values.price,
                                ac: this.state.ac,
                                nonAc: this.state.nonAc,
                                wifi: this.state.wifi,
                                powerBackUp: this.state.powerBackUp,
                                tv: this.state.tv,
                                sell: this.state.sell,
                                rent: this.state.rent
                            }, appconfig).then(res => { 
                                if (res.status === 200) {
                                    this.setState({
                                        spinner: false
                                    }, () => {
                                        Alert.alert(
                                            'One property have added success fully',
                                            'you have Success registred a property',
                                            [
                                              {
                                                text: 'Cancel',
                                                style: 'cancel',
                                              },
                                              {text: 'OK', onPress: () => this.props.navigation.navigate('PropertyList')},
                                            ],
                                            {cancelable: false},
                                          );
                                    })
                                }
                            }).catch(err => {  })
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
                                    formFieldLabel="Mobile Number"
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
                                <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                                    <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 18, fontWeight: 'bold' }}>Select your state:-</Text>
                                    <View style={{borderWidth: 1, borderColor: "grey", borderRadius: 5}}>
                                        <Picker
                                            selectedValue={this.state.states}
                                            style={{ height: 50, width: "100%", border: 1, borderColor: "black" }}
                                            onValueChange={this.handleChangeValue} enabled={false} >
                                            <Picker.Item label={this.state.states} value={this.state.states} />
                                        </Picker>
                                    </View>
                                </View>
                                <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
                                    <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 18, fontWeight: 'bold' }}>Select your city:-</Text>
                                    <View style={{borderWidth: 1, borderColor: "grey", borderRadius: 5}}>
                                        <Picker selectedValue={this.state.selectedCities}
                                            style={{ height: 40, width: "100%", border: 1, borderColor: "black" }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                this.setState({ selectedCities: itemValue }, () =>{
                                                    //alert(itemValue)
                                                    if (itemValue === 'Lucknow'){
                                                        this.setState({
                                                            localityData: LucknowData
                                                        })
                                                    } else if(itemValue === "Kanpur") {
                                                        this.setState({
                                                            localityData: kanpurData
                                                        })
                                                    } else if (itemValue === "Ghaziabad") {
                                                        this.setState({
                                                            localityData: GhaziabadData
                                                        })
                                                    }
                                                })
                                            }}>
                                            <Picker.Item label={"--please select--"} value={"--please select--"} />
                                            {this.state.cities.map((item) => {
                                                return (
                                                    <Picker.Item label={item} value={item} key={item} />
                                                )
                                            })}
                                        </Picker>
                                    </View>
                                </View>
                                
                                <>
                                    {this.state.localityData.length > 0 ?
                                    <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
                                    <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 15 }}>Select your Locality:-</Text>
                                        <View style={{borderWidth: 1, borderColor: "grey", borderRadius: 5}}>
                                            <Picker selectedValue={this.state.selectedLocality}
                                                style={{ height: 50, width: "100%", border: 1, borderColor: "black" }}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    this.setState({ selectedLocality: itemValue })
                                                }}>
                                                 {this.state.localityData.length > 0 ?
                                                    this.state.localityData.map((item) => {
                                                        return (
                                                            <Picker.Item label={item.locality} value={item.locality} key={item.locality} />
                                                        )
                                                    })
                                                    : <Picker.Item label={"--please select--"} value={"--please select--"} />
                                                }
                                            </Picker>
                                        </View>
                                    </View>
                                        : <Text />
                                    }
                                </>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.imageUrl <= 0 ?
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{"Uplaod Images"}</Text>
                                        :
                                        <>
                                            <Text style={{ textAlign: 'left' }}>Uploded Images</Text>
                                            {this.state.imageUrl.map((item) => {
                                                return (
                                                    <View key={Math.random()}>
                                                        <View>
                                                            <View style={{width: width-40, height: 300, elevation: 2, position: 'relative',
                                                                marginTop: 10, padding: 0, borderColor: 'transparent', borderWidth: 2, borderRadius: 5}}>
                                                                <Image 
                                                                source={{uri: `data:${item.mime};base64,${item.data}`}}
                                                                style={{flex: 1, width: null, justifyContent: 'center',
                                                                height: null, resizeMode: 'cover', zIndex: 1,}} />
                                                                <View style={{position: 'absolute', top: 0, left:0, right: 0, bottom: 0,zIndex: 2, backgroundColor: 'rgba(0,0,0,.2)'}}>
                                                                    <Icons size={32} name="close"style={{color: 'white', position: 'absolute', right: 10, zIndex: 3, top: 10}} 
                                                                    onPress={this.removeTodo}/>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </>
                                    }
                                    <View style={{flex:1, width:"100%", justifyContent: 'center', alignItems: 'center'}}>
                                    {this.state.imageUrl.length > 0 ? <Text /> :
                                        <View style={{width: '50%'}}>
                                            <Button buttonAction={this.handleChoosePhoto} icon={"clouduploado"} color={"white"} style={{ fontSize: 15, fontWeight: "bold" }} />
                                        </View>
                                        }
                                    </View>
                                </View>
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
                                      <View style={{ flexDirection: 'column', marginLeft: 15, marginRight: 15, marginBttom:20  }}>
                                            <Text style={{fontWeight: 'bold', fontSize: 18,}}>Property Type *</Text>
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
                                                        if (this.state.rent === true) {
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
                                        <View style={{ flexDirection: 'column', marginLeft: 15, marginRight: 15 , paddingTop:20  }}>
                                            <Text style={{fontWeight: 'bold', fontSize: 18}}>Furnishing Type *</Text>
                                            <View style={{flexDirection: "row"}}>
                                                <CheckBox
                                                value={this.state.unFurnished}
                                                onValueChange={() => {
                                                    this.setState({ unFurnished: !this.state.unFurnished })
                                                }}
                                                />
                                                <Text style={{marginTop: 5, fontSize: 18}}>Un-Furnished</Text>
                                            </View>
                                            <View style={{flexDirection: "row"}}>
                                                <CheckBox
                                                    value={this.state.fullFurnished}
                                                    onValueChange={(event) => this.setState({ fullFurnished: !this.state.fullFurnished})}/>
                                                <Text style={{marginTop: 5, fontSize: 18}}>FullFurnished</Text>
                                            </View>
                                            <View style={{flexDirection: "row"}}>
                                                <CheckBox
                                                    value={this.state.semiFurnished}
                                                    onValueChange={(event) => this.setState({ semiFurnished: !this.state.semiFurnished})}/>
                                                <Text style={{marginTop: 5, fontSize: 18}}>SemiFurnished</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', marginLeft: 15, marginRight: 15 , paddingTop:20  }}>
                                            <Text style={{fontWeight: 'bold', fontSize: 18}}>Facility Provided *</Text>
                                            <View style={{flexDirection: "row"}}>
                                            <CheckBox
                                                value={this.state.wifi}
                                                onValueChange={() => this.setState({ wifi: !this.state.wifi })}
                                                />
                                                <Text style={{marginTop: 5, fontSize: 18}}>WiFi</Text>
                                            </View>
                                            <View style={{flexDirection: "row"}}>
                                                <CheckBox
                                                    value={this.state.lift}
                                                    onValueChange={(event) => this.setState({ lift: !this.state.lift})}/>
                                                <Text style={{marginTop: 5, fontSize: 18}}>lift</Text>
                                            </View>
                                            <View style={{flexDirection: "row"}}>
                                                <CheckBox
                                                    value={this.state.tv}
                                                    onValueChange={(event) => this.setState({ tv: !this.state.tv})}/>
                                                <Text style={{marginTop: 5, fontSize: 18}}>Tv</Text>
                                            </View>
                                            <View style={{flexDirection: "row"}}>
                                                <CheckBox
                                                    value={this.state.powerBackUp}
                                                    onValueChange={(event) => this.setState({ powerBackUp: !this.state.powerBackUp})}/>
                                                <Text style={{marginTop: 5, fontSize: 18}}>PowerBackUp / Generator</Text>
                                            </View>
                                        </View>
                                        <View>
                                    <FormInput
                                    style={{
                                        borderWidth: 1, fontSize: 15, borderRadius: 4,
                                        borderColor: formikProps.touched.price && formikProps.errors.price ? 'red' : 'grey'
                                    }}
                                    formFieldLabel="Pricing"
                                    onBlur={formikProps.handleBlur('price')}
                                    placeHolderText="Please enter price"
                                    handleChange={formikProps.handleChange('price')}
                                    value={formikProps.values.price} required={true}
                                    validateText={formikProps.touched.price && formikProps.errors.price} />
                                </View>
                                </View>
                                <Spinner
                                    textStyle={{ color: "white" }}
                                    visible={this.state.spinner}
                                    textContent={this.state.textContent} />
                               <View style={{marginBottom: 20}}>
                                    <Button label="Addproperty" buttonAction={formikProps.handleSubmit} />
                               </View>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
     const data = state.loginData;
     return {
        email: data.email,
    }
} 

export default connect(mapStateToProps, {})(AddProperty);
