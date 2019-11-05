import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

class Explore extends Component {
    render () {
        return (
            <View style={styles.container}> 
               <Text>Explore....</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5FCFF'
    },
    rightMenu: {
        textAlign: 'right',
    }
})

export default Explore;

