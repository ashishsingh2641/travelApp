import React from 'react';
import {BackHandler, View, Dimensions, Animated, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
let {width, height} = Dimensions.get('window');
import Navigation from './navigation';
import { Provider } from 'react-redux';
import store from './store';


class App extends React.Component {
    state = {
        backClickCount: 0
    }
    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100) ;
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }
    _spring() {
        this.setState({backClickCount: 1}, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.15 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),

            ]).start(() => {
                this.setState({backClickCount: 0});
            });
        });

    }
    handleBackPress = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        AsyncStorage.removeItem("userName").then((value) => {
            if (value === null) {
                return true
            }
        })     
    }   
    render() {
        return (
            <Provider store={store}>
                <Navigation />
                <Animated.View style={[styles.animatedView, {transform: [{translateY: this.springValue}]}]}>
                    <Text style={styles.exitTitleText}>press back again to exit the app</Text>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => BackHandler.exitApp()}
                    >
                        <Text style={styles.exitText}>Exit</Text>
                    </TouchableOpacity>

                </Animated.View>
            </Provider>
        )
    }
}
const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    animatedView: {
        width,
        backgroundColor: "#2c3e50",
        elevation: 2,
        position: "absolute",
        bottom: 0,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    exitTitleText: {
        textAlign: "center",
        color: "#ffffff",
        marginRight: 10,
    },
    exitText: {
        color: "#e5933a",
        paddingHorizontal: 10,
        paddingVertical: 3
    }
};

export default App;
