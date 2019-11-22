import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PageLoader from './PageLoader';



class Welcome extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            isFetching: false,
            refreshing: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ isFetching: true });
        }, 4000)
    }
    _onRefresh = () => {
        this.setState({
            refreshing: true,
            isFetching: false
        });
        setTimeout(() => {
            this.setState({refreshing: false, isFetching: true});
        }, 3000)
      }
    render() {
        return (
        <>
        <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
        <ScrollView
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
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
                        <LinearGradient 
                        start={{x: 0, y: 1}} end={{x: 1, y: 0}}
                        colors={['#2c3e50', '#3498db']} 
                        style={styles.linearGradient} 
                        >
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Explore')}>
                        <Text style={styles.buttonText}>
                            Explore Hotels
                        </Text>
                        </TouchableOpacity>
                        
                        </LinearGradient>
                    <LinearGradient 
                        start={{x: 1, y: 0}} end={{x: 0, y: 1}}
                        colors={['#2c3e50', '#3498db']}
                        style={styles.linearGradient1} 
                        >
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Role')}>
                        <Text style={styles.buttonText}>
                            Register
                        </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
            }
            </ScrollView>
            </SafeAreaView>
        </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: '#2c3e50',
        fontFamily: "'Roboto', sans-serif",
    },
    inputWrapper: {
        alignSelf: 'center'
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        width: "95%",
        alignSelf:'center',
        marginTop: 20,
        elevation: 5,
        zIndex: 3
      },
      linearGradient1: {
        paddingLeft: 15,
        paddingRight: 15,
        width: "95%",
        alignSelf:'center',
        marginTop: 10,
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
        color: '#2c3e50'
    }
});

export default Welcome;
