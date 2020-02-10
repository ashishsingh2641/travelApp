import React, { Component } from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HeaderLeft extends Component {
    render() {
        return (
            <View style={{position: 'relative',}}>
                <TouchableOpacity  onPress={this.props.handleEditProfile} style={{borderWidth:3, borderColor: '#2c3e50', justifyContent: 'center', flex: 1, height: 25, width: 55, alignItems: 'center', borderRadius: 55/2, marginRight: 10}}>
                        <Icons size={32} name="account" />
                </TouchableOpacity>
            </View>
        )
    }
}
