import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = (props) => {
    return (

        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#57C7B8', '#186057']}
            style={styles.linearGradient}>
            <TouchableOpacity onPress={props.buttonAction}>
                <Text style={styles.buttonText}>
                    {props.label}
                </Text>
            </TouchableOpacity>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 4,
        width: "90%",
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 10,
        elevation: 4,
        zIndex: 3
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        width: '100%',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})

export default Button;
