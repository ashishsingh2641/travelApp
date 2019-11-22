import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Button from '../components/Button';
import LinearGradient from 'react-native-linear-gradient';

const Role = (props) => {
    const [TravelerID, setTravelId] = useState('');
    const [HostID, setHostId] = useState('');
    const [flag, setFlag] = useState(false);
    
    return (
        <View>
            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                colors={['#2c3e50', '#5691c8']} style={{ width: '100%', height: '100%', }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 30, color: 'white' }}>Choose Your Role</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <TouchableOpacity id={TravelerID} onPress={() => {
                                setTravelId('TravelerID')
                            }}>
                            <View style={{ width: 130, height: 130, marginLeft: 0, borderWidth: 0.5, borderColor: '#dddddd', elevation: 1, zIndex: 999999 }} >
                                <View style={{ flex: 2 }} >
                                    <Image source={require('../assets/boss.png')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'contain', marginTop: 10 }} />
                                </View>
                                <View style={{ flex: 1, paddingTop: 10 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>Traveler</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity id={HostID} onPress={() => setHostId('HostID')}>
                            <View style={{ width: 130, height: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd', elevation: 1 }}>
                                <View style={{ flex: 2 }}>
                                    <Image source={require('../assets/barman.png')}
                                        style={{ flex: 1, width: null, height: null, resizeMode: 'contain', marginTop: 10 }} />
                                </View>
                                <View style={{ flex: 1, paddingTop: 10 }}>
                                    <Text style={{ textAlign: 'center', color: '#fff' }}>Host</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {flag === false ? 
                    <Button 
                    label={'next'} 
                    buttonAction={(e) => {
                        TravelerID !== '' ? 
                        (() => {
                            setFlag(true)
                            setTimeout(()=>{
                                props.navigation.navigate("SprSignUp", {role: TravelerID})
                            }, 4000) 
                        })() : HostID !== ''?  (() => {
                            setFlag(true);
                            setTimeout(()=>{
                                props.navigation.navigate("Login", {role: HostID});
                            }, 4000);
                        })(): (() => {
                            alert("please Select your Role");
                        })()
                    }}/>
                :  <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                }
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
});

export default Role;
