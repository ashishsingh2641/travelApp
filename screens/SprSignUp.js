import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView,ActivityIndicator, Image, TextInput, RefreshControl } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Formik } from 'formik';
import axios from 'axios';
import Check from '../components/Check';
import ImagePicker from 'react-native-image-picker';
import validation from './utils/validationSchema';
const  checkProperty= ["sell", "buy"];

class SprSignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginMessage: '',
            isLoading: false,
            icons: 'eye-off-outline',
            count: 0,
            secureTextEntry: true,
            photo: null
        }
    }
    handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            this.setState({ photo: response })
          }
        });
        
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
     uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }
    render() {
        const {photo} = this.state;
        const receivedValue = this.props.navigation.getParam('role');
        //alert(receivedValue);
        return (
            <>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.contentContainer}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.ColoredText}> {receivedValue +  ' Sign Up'}
                                </Text>
                            </View>
                            <Formik
                                initialValues={{ name: '', email: '', password: '', phoneNumber: '' }}
                                onSubmit={(values, {resetForm}) => {
                                        this.setState({
                                            isLoading: true
                                        });
                                        const createFormData = (photo, body) => {
                                            const data = new FormData();
                                            debugger;
                                          
                                            data.append("photo", {
                                              name: photo.fileName,
                                              type: photo.type,
                                              uri:
                                                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
                                            });
                                          
                                            Object.keys(body).forEach(key => {
                                              data.append(key, body[key]);
                                            });
                                          
                                            return data;
                                          };
                                        //alert(JSON.stringify(values));
                                        //axios.get('http://192.168.0.107:5001/api/v1/login') // Call the fetch function passing the url of the API as a parameter
                                        axios.get("http://172.16.163.172:5001/api/v1/login")
                                        .then((res) => {
                                            if (res !== undefined) {
                                                this.setState({
                                                    isLoading: false
                                                })
                                            }
                                        })
                                        .catch(function(error) {
                                            //console.log(":::::::::::::::::::hi:::::::::::::")
                                        console.log(error)
                                        });
                                        fetch("http://172.16.163.172:5001/api/upload", {
                                            method: "POST",
                                            body: createFormData(this.state.photo, { userId: "123" })
                                        })
                                            .then(response => response.json())
                                            .then(response => {
                                            console.log("upload succes", response);
                                            alert("Upload success!");
                                            this.setState({ photo: null });
                                                this.props.navigation.navigate("Login");
                                            })
                                            .catch(error => {
                                            console.log("upload error", error);
                                            alert("Upload failed!");
                                            }); 
                                }}
                                validationSchema={validation}>
                                {formikProps => (
                                    <React.Fragment  >
                                        <TextInput
                                        style={{paddingLeft: 15, paddingRight: 15, display: 'none'}}
                                            disable={true}
                                            editable={true}
                                            value={'Hotel_' + this.uuidv4()} />
                                        <FormInput
                                            style={{ borderWidth: 1, fontSize: 20,
                                            borderColor: formikProps.touched.name && formikProps.errors.name ? 'red' : 'grey' }}
                                            formFieldLabel="Name"
                                            placeHolderText="Jhon Doe"
                                            handleChange={formikProps.handleChange('name')}
                                            onVlur={formikProps.handleBlur('name')}
                                            value={formikProps.values.name}
                                            required={true} 
                                            autoFocus={true}
                                            validateText={formikProps.touched.name && formikProps.errors.name}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1,  fontSize: 20,
                                            borderColor: formikProps.touched.email && formikProps.errors.email ? 'red' : 'grey' }}
                                            formFieldLabel="Email"
                                            placeHolderText="mikysingh1986@gmail.com"
                                            handleChange={formikProps.handleChange('email')}
                                            onVlur={formikProps.handleBlur('email')}
                                            value={formikProps.values.email}
                                            required={true} 
                                            autoFocus
                                            validateText={formikProps.touched.email && formikProps.errors.email}
                                            />

                                        <FormInput
                                            style={{ borderWidth: 1,  fontSize: 20,
                                            borderColor: formikProps.touched.password && formikProps.errors.password ? 'red' : 'grey' }}
                                            formFieldLabel="Password"
                                            secureTextEntry={this.state.secureTextEntry}
                                            toggleIcon={(e) => {
                                                if (formikProps.values.password === "" || formikProps.values.password === undefined) {
                                                    e.preventDefault()
                                                } else {
                                                    this.toggleIcon()
                                                }
                                            }}
                                            onBlur={formikProps.handleBlur('password')}
                                            placeHolderText="Please enter password"
                                            icons={this.state.icons}
                                            handleChange={formikProps.handleChange('password')}
                                            value={formikProps.values.password} required={true} 
                                            validateText={formikProps.touched.password && formikProps.errors.password}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1,  fontSize: 20,
                                            borderColor: formikProps.touched.phoneNumber && formikProps.errors.poneNumber ? 'red' : 'grey' }}
                                            formFieldLabel="Phone"
                                            onBlur={formikProps.handleBlur('phoneNumber')}
                                            placeHolderText="Please enter PhoneNumber"
                                            handleChange={formikProps.handleChange('phoneNumber')}
                                            value={formikProps.values.phoneNumber} required={true} 
                                            validateText={formikProps.touched.phoneNumber && formikProps.errors.phoneNumber}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1, fontSize: 20,
                                            borderColor: formikProps.touched.AddressLine1 && formikProps.errors.AddressLine1 ? 'red' : 'grey' }}
                                            formFieldLabel="AddressLine1"
                                            onBlur={formikProps.handleBlur('AddressLine1')}
                                            placeHolderText="Please enter AddressLine1"
                                            handleChange={formikProps.handleChange('AddressLine1')}
                                            value={formikProps.values.AddressLine1} required={true} 
                                            validateText={formikProps.touched.AddressLine1 && formikProps.errors.AddressLine1}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1, fontSize: 20,
                                            borderColor: formikProps.touched.AddressLine2 && formikProps.errors.AddressLine2 ? 'red' : 'grey' }}
                                            formFieldLabel="AddressLine2"
                                            onBlur={formikProps.handleBlur('AddressLine2')}
                                            placeHolderText="Please enter AddressLine2"
                                            handleChange={formikProps.handleChange('AddressLine2')}
                                            value={formikProps.values.AddressLine2} required={true} 
                                            validateText={formikProps.touched.AddressLine2 && formikProps.errors.AddressLine2}
                                            />
                                        <FormInput
                                            style={{ borderWidth: 1, fontSize: 20,
                                            borderColor: formikProps.touched.City && formikProps.errors.City ? 'red' : 'grey' }}
                                            formFieldLabel="City"
                                            onBlur={formikProps.handleBlur('City')}
                                            placeHolderText="Please enter City"
                                            handleChange={formikProps.handleChange('City')}
                                            value={formikProps.values.City} required={true} 
                                            validateText={formikProps.touched.City && formikProps.errors.City}
                                        />
                                        <FormInput
                                            style={{ borderWidth: 1, fontSize: 20,
                                            borderColor: formikProps.touched.pincode && formikProps.errors.pincode ? 'red' : 'grey' }}
                                            formFieldLabel="Pincode"
                                            onBlur={formikProps.handleBlur('pincode')}
                                            placeHolderText="Please enter pincode"
                                            handleChange={formikProps.handleChange('pincode')}
                                            value={formikProps.values.pincode} required={true} 
                                            validateText={formikProps.touched.pincode && formikProps.errors.pincode}
                                        />
                                        <FormInput
                                            style={{ borderWidth: 1, fontSize: 20,
                                            borderColor: formikProps.touched.State && formikProps.errors.State ? 'red' : 'grey' }}
                                            formFieldLabel="State"
                                            onBlur={formikProps.handleBlur('State')}
                                            placeHolderText="Please enter State"
                                            handleChange={formikProps.handleChange('State')}
                                            value={formikProps.values.State} required={true} 
                                            validateText={formikProps.touched.State && formikProps.errors.State}
                                        />
                                        <View>
                                        {checkProperty.map((item) => {
                                            return (
                                                <React.Fragment key={item}>
                                                    <Check label={item} />
                                                </React.Fragment>
                                            )
                                        })}
                                        </View>
                                           <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                {photo && (
                                                <Image
                                                    source={{ uri: photo.uri }}
                                                    style={{ width: 300, height: 300 }}
                                                />
                                                )}
                                                <Button buttonAction={this.handleChoosePhoto} label="Choose Photo" />
                                            </View>
                                        {this.state.isLoading === true ? (
                                         <ActivityIndicator />
                                         ) : (
                                            <Button buttonAction={() => {
                                                formikProps.handleSubmit();
                                               
                                            }} label="Signup" />
                                         )}
                                    </React.Fragment>
                                )}
                            </Formik>
                        </View>
                        <View style={styles.orLoginUsing}>
                            <Text 
                                onPress={() => this.props.navigation.navigate("Login")} style={{
                                fontSize: 17,
                                opacity: .6,
                                color: '#186057',
                                marginBottom: 30
                            }}>Already a user please login</Text>
                            
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    titleWrapper: {
        marginLeft: 20,
        flexDirection: 'row',
        marginTop: 50
    },

    ColoredText: {
        fontSize: 30,
        color: '#2c3e50',
        fontWeight: 'bold',
        fontFamily: "'Roboto', sans-serif",
        textAlign: 'left',
        marginBottom: 40
    },
    orLoginUsing: {
        marginTop: 50,
        alignItems: 'center',
    },
    
});

export default SprSignUp;
