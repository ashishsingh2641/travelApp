import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Button from '../components/Button';
import Svg, {
    Path,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const Role = (props) => {
    const [TravelerID, setTravelId] = useState('');
    const [HostID, setHostId] = useState('');
    const [flag, setFlag] = useState(false);

    return (
        <View style={styles.container}>
            <Svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;">
                <Path d="M0.00,49.98 C290.63,266.94 207.67,-110.03 502.25,71.53 L500.00,0.00 L0.00,0.00 Z" stroke="#3498db" fill="#3498db" />
                <Text />
                <Text />
                <Text />
                <Text />
                <Text />
                <Text /><Text />
                <Text />
            </Svg>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30, color: '#3498db' }}>Let's get Started</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <TouchableOpacity id={TravelerID} onPress={() => {
                        setTravelId('ServiceProvider');
                        setFlag(true)
                        setTimeout(() => {
                            props.navigation.navigate("SprSignUp", { role: 'ServiceProvider' })
                            setFlag(false)
                            //setTravelId('');
                        }, 4000)
                    }}>
                        <View style={{ width: 130, height: 130, marginLeft: 0, borderWidth: 0.5, borderColor: '#dddddd', elevation: 1, zIndex: 999999, backgroundColor: "#2c3e50" }} >
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#2c3e50', '#3498db']} style={{ width: "100%", height: "100%" }}>
                                <View style={{ flex: 2 }} >
                                    <Image source={require('../assets/barman.png')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'contain', marginTop: 10 }} />
                                </View>
                                <View style={{ flex: 1, paddingTop: 10 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>Property Owner</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity id={HostID} onPress={() => {
                        setHostId('ServiceConsumer');
                        setFlag(true);
                        setTimeout(() => {
                            props.navigation.navigate("SprSignUp", { role: "ServiceConsumer" });
                            setFlag(false);
                            //setHostId('')
                        }, 4000);
                    }}>
                        <View style={{ width: 130, height: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd', elevation: 1 }}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#2c3e50', '#3498db']} style={{ width: "100%", height: "100%" }}>
                                <View style={{ flex: 2 }}>
                                    <Image source={require('../assets/boss.png')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'contain', marginTop: 10 }} />

                                </View>
                                <View style={{ flex: 1, paddingTop: 10 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>Customer</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {flag === false ?
                <Text />
                : <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#3498db" />
                </View>
            }
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity>
                    <Text style={{
                        color: '#00a8ff', fontWeight: 'bold',
                        fontSize: 15,
                    }} onPress={() =>
                        props.navigation.navigate('Login')}>
                        <Text style={{fontWeight: "bold", color: '#2c3e50'}}>
                            Already a User ?
                        </Text>
                        <Text style={{
                            textDecorationLine: 'underline',
                            fontWeight: "bold",
                            color: '#2c3e50'
                        }}> Please Login</Text>

                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default Role;
