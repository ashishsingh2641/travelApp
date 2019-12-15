import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = (props) => {
    return (
        <TouchableOpacity disabled={props.disabled}
            onPress={props.buttonAction} activeOpacity={props.disabled ? 0.5 : 1}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#2c3e50', '#3498db']}
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>
                    {props.label}
                </Text>
            </LinearGradient>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        width: "90%",
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 10,
        elevation: 4,
        borderRadius: 4,
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
