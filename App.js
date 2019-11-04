import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StatusBar,
  Alert,
  RefreshControl
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class App extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            isFetching: false,
         }
    }
    onRefresh() {
        this.setState({ isFetching: true });
     }
    render() {
        return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#57C7B8" />
        <ScrollView>
            <View style={styles.container} 
            >
                <View style={styles.contentContainer}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.titleText}>Welcome to. 
                            <Text style={styles.ColoredText}> Trans23.
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={{color: '#C9CFD8', 
                        fontSize: 20,
                        marginBottom: 20}}>Enjoy the experince</Text>
                    </View>
                    <View>
                        <Image source={require('./assets/icon.png')}
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
                        colors={['#57C7B8', '#63DA91']} 
                        style={styles.linearGradient} 
                        >
                        <Text style={styles.buttonText}
                        onPress={() => Alert.alert('Please Continue to log in...')}>
                            Login
                        </Text>
                        </LinearGradient>
                </View>
                <View style={styles.signup}>
                    <Text onPress={() => {
                     Alert.alert('refreshing your app ...')
                    this.onRefresh
                    
                    }}
                    style={styles.text}>Signup</Text>
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
        color: '#5BCEAC',
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
        fontWeight: 'bold',
        backgroundColor: 'transparent',
      },
    
    signup: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        width: "90%",
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        elevation: 5
    },
    text: {
        color: '#262626',
        fontSize: 18,
        margin: 10, 
        fontWeight: 'bold'
    }
});

export default App;
