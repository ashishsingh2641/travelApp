import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, Alert, ScrollView, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderComponent from '../components/HeaderComponent';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            style1: {
                width: "100%",
                fontSize: 15,
                borderBottomColor: '#e5e5e5',
                borderBottomWidth: 2,
                justifyContent:'center',
                alignItems: 'center',
            }, 
            style2: {
                width: "100%",
                fontSize: 15,
                borderBottomColor: '#e5e5e5',
                borderBottomWidth: 2,
                justifyContent:'center',
                alignItems: 'center',
            }
        };
        this.handleBorderColor = this.handleBorderColor.bind(this);
        this.handleBorderColor1 = this.handleBorderColor1.bind(this);
        this.handleBorderColor2 = this.handleBorderColor2.bind(this);
    }
    handleBorderColor = () => {
        this.setState({
            style: {
                width: "100%",
                fontSize: 15,
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                justifyContent:'center',
                alignItems: 'center',
            },
        })
    }
    handleBorderColor1 = () => {
        this.setState({
            style1: {
                width: "100%",
                fontSize: 15,
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                justifyContent:'center',
                alignItems: 'center',
            },
        })
    }
    handleBorderColor2 = () => {
        this.setState({
            style2: {
                width: "100%",
                fontSize: 15,
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                justifyContent:'center',
                alignItems: 'center',
            },
        })
    }
    render() {
        return (
            <>
                <ScrollView>
                    <HeaderComponent 
                    icon={require('../assets/Doner.png')}
                    avatar={require('../assets/icon.png')}
                    onNavigate={() => {
                        this.props.navigation.openDrawer()
                    }}/>
                    <View style={styles.container}>
                        <View style={styles.contentContainer}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.ColoredText}> Login.
                                </Text>
                            </View>
                            <View style={styles.formContainer1}>
                                <Text style={{marginTop: 20}}>Email.</Text>
                                <TextInput
                                    onTouchStart={this.handleBorderColor1}
                                    style={this.state.style1}
                                    placeholder="Please Enter your email."
                                    onChangeText={(email) => this.setState({email})}
                                    value={this.state.email}
                                    />
                            </View>
                            <View style={styles.formContainer2}>
                                <Text style={{marginTop: 20}}>Password.</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    onTouchStart={this.handleBorderColor2}
                                    style={this.state.style2}
                                    placeholder="Please Enter your Password."
                                    onChangeText={(password) => this.setState({password})}
                                    value={this.state.password}
                                    />
                                <Icons name="eye-outline" size={32} style={styles.positionIcon2}
                                    onPress={() => Alert.alert('need to update an icon')}
                                />
                            </View>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#57C7B8', '#186057']}
                                style={styles.linearGradient}>
                                <Text style={styles.buttonText}
                                onPress={() => this.props.navigation.navigate('Explore')}>
                                    Login
                                </Text>
                            </LinearGradient>
                        </View>
                        <View style={styles.orLoginUsing}>
                            <Text style={{
                                fontSize: 17, 
                                opacity: .6,   
                                color: '#186057'
                                }}>or login with</Text>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={styles.facebook} 
                                onPress={() => Linking.openURL('http://www.facebook.com')} >
                                    <Icons name="facebook" size={32} />
                                </Text>
                                <Text style={styles.facebook} 
                                onPress={() => Linking.openURL('http://twitter.com')}>
                                    <Icons name="twitter" size={32} />
                                </Text>
                                <Text style={styles.facebook} 
                                onPress={() => Linking.openURL('http://google.com')}>
                                    <Icons name="google" size={32} />
                                </Text>
                            </View>
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
        zIndex: 99999
    },
    titleWrapper: {
        marginLeft: 20,
        flexDirection: 'row',
        marginTop: 50
    },

    ColoredText: {
        fontSize: 30,
        color: '#186057',
        fontWeight: 'bold',
        fontFamily: "'Roboto', sans-serif",
        textAlign: 'left',
        marginBottom: 70
    },
    formContainer1: {
        width: '90%',
        justifyContent:'center',
        alignSelf:'center',
    },
    formContainer2: {
        width: '90%',
        justifyContent:'center',
        alignSelf:'center',
        position: 'relative'
    },
    positionIcon2: {
        position: 'absolute',
        right:0,
        top:45,
        color: '#186057',
    },
   
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        width: "90%",
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 10,
        elevation: 2,
        zIndex: 3
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        width: '100%',
        color: '#ffffff',
        fontWeight: 'bold'
    },

    signup: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        width: "90%",
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#e6e6e6',
        elevation: 2,
    },
    text: {
        color: '#186057',
        fontSize: 18,
        margin: 10,
        fontWeight: 'bold',
        width: "100%",
        textAlign: 'center'
    },
    orLoginUsing: {
        marginTop: 50,
        alignItems:'center',
    },
    facebook: {
        marginTop: 10, 
        opacity: .3, 
        color: '#186057' 
    }
});

export default Login;
