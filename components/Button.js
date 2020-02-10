import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/AntDesign'

const Button = (props) => {
    return (
        <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={['#2c3e50', '#3498db']}
        style={styles.linearGradient}>
        <TouchableOpacity style={{zIndex: 9999}}
            onPress={props.buttonAction}>
          
                <Text style={styles.buttonText}>
                    {props.label ? props.label : <Icons name={props.icon} size={25} color={props.color} style={styles.style1} />}
                </Text>
        </TouchableOpacity>
    
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        width: "90%",
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 5,
        elevation: 4,
        borderRadius: 4,
        zIndex: 3,
        marginBottom: 20
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        width: '100%',
        color: '#ffffff',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    style1: {
        fontWeight: '700'
    },
})

export default Button;
