import React, { Component } from 'react';
import {
    View, Text, Image, StyleSheet,
    ScrollView, StatusBar, TouchableOpacity,
    RefreshControl, SafeAreaView, Button, ActivityIndicator
} from 'react-native';
import PageLoader from './PageLoader';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            refreshing: false,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ isFetching: true });
        }, 1000)
    }
    _onRefresh = () => {
        this.setState({
            refreshing: true,
            isFetching: false
        });
        setTimeout(() => {
            this.setState({ refreshing: false, isFetching: true });
        }, 2000)
    }
    render() {
        return (
            <>
                <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
                {this.state.isFetching === false ?
                    <View style={{ marginTop: 100, justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <ActivityIndicator size="large" color="#2c3e50" />
                    </View>
                    :
                    <>
                        <ScrollView refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.__onRefresh} />
                        } contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ testAlign: 'center', flex: 1, marginTop: 50 }}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.titleText}>Welcome to 
                                            <Text style={styles.ColoredText}> Inland</Text>
                                    </Text>
                                </View>
                                <View style={{ flex: 1, }}>
                                    <Image source={require('../assets/logo.jpeg')}
                                        style={{
                                            width: "100%",
                                            marginBottom: 30,
                                            marginTop: 30,
                                            height: 300,
                                            resizeMode: 'cover',
                                        }} />
                                </View>

                            </View>
                            <View style={styles.containerMain}>
                                <View style={styles.bottomView}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('Explore')} 
                                        style={{ borderRadius: 5, elevation: 1, zIndex: 9999, width: "90%" }}>
                                        <LinearGradient
                                            start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                                            colors={['#2c3e50', '#3498db']}
                                            style={{ width: "100%", padding: 15, borderRadius: 5}}>
                                            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", width: "100%", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                                Explore
                                                    </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ zIndex: 9999 }}
                                        onPress={() => this.props.navigation.navigate('Role')} 
                                        style={{ borderRadius: 5, elevation: 1, zIndex: 9999, width: "90%", marginTop: 20,  marginBottom: 20  }}>
                                        <LinearGradient
                                            start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                                            colors={['#2c3e50', '#3498db']}
                                            style={{ width: "100%", padding: 15, borderRadius: 5}}>
                                            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", width: "100%", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                                                Register
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </>
                }
            </>

        );
    }
}
const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
    },
    titleWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 50
    },
    titleText: {
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
    termsText: {
        fontSize: 16,
        margin: 10,
        width: "100%",
        textAlign: 'center',
        color: '#2c3e50'
    }
});