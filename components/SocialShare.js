import React from 'react';
import {View, Text, Linking, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const SocialShare = () => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.facebook}
                onPress={() => Linking.openURL('http://www.facebook.com')} >
                <Icons name="facebook" size={32} />
            </Text>
            <Text style={styles.facebook}
                onPress={() => Linking.openURL('http://twitter.com')}>
                <Icons name="twitter" size={32} />
            </Text>
            <Text style={styles.facebook}
                onPress={() => Linking.openURL('http://google.com')}>
                <Icons name="google" size={32} />
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    facebook: {
        marginTop: 10,
        opacity: .3,
        color: '#186057'
    }
});

export default SocialShare;
