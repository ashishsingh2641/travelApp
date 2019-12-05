import React from 'react';
import {
    View, Text, Image,
    ScrollView, StatusBar, TouchableOpacity,
    RefreshControl, SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PageLoader from './PageLoader';
import { connect } from 'react-redux';
import WelcomeStyle from '../theme/welcomeStyle';

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
            this.setState({ refreshing: false, isFetching: true });
        }, 3000)
    }
    render() {
        const styles = WelcomeStyle;
        return (
            <>
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                        {this.state.isFetching === false ?
                            <View style={{ marginTop: 100 }}>
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
                                        <Text style={{
                                            color: '#999999',
                                            fontSize: 20,
                                            marginBottom: 20
                                        }}>Enjoy the experince</Text>
                                    </View>
                                    <View>
                                        <Image source={require('../assets/icon.png')}
                                            style={{
                                                alignSelf: 'center',
                                                width: '100%',
                                                marginBottom: 30,
                                                marginTop: 30
                                            }} />
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '20%'}}>
                                    <LinearGradient
                                        start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                                        colors={['#2c3e50', '#3498db']}
                                        style={styles.linearGradient}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('Explore')}>
                                            <Text style={styles.buttonText}>
                                                Explore Hotels
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                    <LinearGradient
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                                        colors={['#2c3e50', '#3498db']}
                                        style={styles.linearGradient1}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('Role')}>
                                            <Text style={styles.buttonText}>
                                                Register
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                    </View>
                                </View>
                            </View>
                        }
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        state
    }
}
export default connect(mapStateToProps)(Welcome);
