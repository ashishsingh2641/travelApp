import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';

class CardComponent extends Component {
    render () {
        return (
            <>
            <View style={{width: 130, height: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd', elevation:1}}>
                <View style={{flex: 2}}>
                    <Image source={require('../assets/man.jpg')} 
                        style={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
                </View>
                <View style={{flex: 1, paddingLeft: 10, paddingTop: 10}}>
                    <Text>Home</Text>
                </View>
            </View>
        </>
        )
    }
}



export default CardComponent;
