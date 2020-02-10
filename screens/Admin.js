import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Button from '../components/Button'

export default class Admin extends Component {
    render () {
        return (
            <View style={{flex: 1, justifyContent: 'center', }}>
                <View style={{marginVertical: 10}}>
                    <Text style={{alignSelf: 'center'}}>Update Property...</Text>
                    <Button label="Property list history" buttonAction={() => this.props.navigation.navigate('CurdPropertyList')} />
                </View>
                <View style={{marginVertical: 10}}>
                    <Text style={{alignSelf: 'center'}}>Update Bookings...</Text>
                    <Button label="Booked history list" buttonAction={() => this.props.navigation.navigate('BookingHistory')} />
                </View>
            </View>
        )
    }
}    