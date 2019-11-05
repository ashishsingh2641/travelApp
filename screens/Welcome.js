import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  Alert,
  Linking,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PageLoader from './PageLoader';

class Welcome extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            isFetching: false,
         }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ isFetching: true });
        }, 4000)
     }
    render() {
        return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#186057" />
        <ScrollView>
            {this.state.isFetching === false ? 
                <View style={{marginTop: 100}}>
                    <PageLoader />
                </View>
            :
            <View style={styles.container} 
            >
                <View style={styles.contentContainer}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.titleText}>Welcome to. 
                            <Text style={styles.ColoredText}> Your Brand.
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={{color: '#999999', 
                        fontSize: 20,
                        marginBottom: 20}}>Enjoy the experince</Text>
                    </View>
                    <View>
                        <Image source={require('../assets/icon.png')}
                        style={{
                            alignSelf: 'center', 
                            width: '100%',
                            marginBottom: 30
                            }} />
                    </View>
                        {/* <Button
                            title="Press me"
                            color="teal"
                            onPress={() => Alert.alert('Button with adjusted color pressed')}
                        /> */}
                        <LinearGradient 
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        colors={['#57C7B8', '#186057']} 
                        style={styles.linearGradient} 
                        >
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                        </TouchableOpacity>
                        
                        </LinearGradient>
                </View>
                <View style={styles.signup}>
                    <Text onPress={() => {
                     this.props.navigation.navigate('Signup')
                    }}
                    style={styles.text}>Signup</Text>
                </View>
                <View style={styles.terms}>
                <Text style={styles.termsText}
                    onPress={() => Linking.openURL('http://google.com')}>
                    Terms of services
                </Text>
                </View>
            </View>
            }
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
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 50
    },
    titleText : {
        display: 'flex',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: "'Roboto', sans-serif",
    },
    ColoredText: {
        color: '#186057',
        fontFamily: "'Roboto', sans-serif",
    },
    inputWrapper: {
        alignSelf: 'center'
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        width: "90%",
        alignSelf:'center',
        marginTop: 20,
        marginBottom: 10,
        elevation: 5,
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
        alignSelf:'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#E8EEEE',
        elevation: 5,
    },
    text: {
        color: '#262626',
        fontSize: 18,
        margin: 10, 
        fontWeight: 'bold',
        width:"100%",
        textAlign: 'center'
    },
    terms: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        width: "90%",
        alignSelf:'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    termsText: {
        fontSize: 16,
        margin: 10, 
        width:"100%",
        textAlign: 'center',
        color: '#186057'
    }
});

export default Welcome;
