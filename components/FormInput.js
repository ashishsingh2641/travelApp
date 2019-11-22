import React from 'react';
import {View, StyleSheet, Text, TextInput,Alert } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const FormInput = (props) => {
    const {formFieldLabel, handleTouchStart, style, 
        placeHolderText, handleChange, value, required,
        onBlur, autoFocus} = props;
    return (
        <View style={formFieldLabel === 'password' || formFieldLabel === "Password"? styles.formContainer2 : styles.formContainer1}>
            <Text style={{ marginTop: 10, marginBottom: 10 , fontSize: 15,}}>{formFieldLabel}
            {required === true ? <Text style={{color: 'red'}}>*</Text> : <Text /> }</Text>
            <TextInput
                multipleLine={props.multipleLine}
                secureTextEntry={props.secureTextEntry}
                onTouchStart={handleTouchStart}
                style={style} autoFocus={autoFocus}
                placeholder={placeHolderText}
                onChangeText={handleChange}
                onBlur={onBlur}
                value={value}
                required={required}
            />
            {formFieldLabel === 'password' || formFieldLabel === "Password" ? 
             <Icons name={props.icons || "eye-outline"} size={28} style={styles.positionIcon2}
                onPress={props.toggleIcon} />
            : <Text style={{height: 0}}/> }
            <Text style={{ color: 'red',marginTop: 10 }}>
              {props.validateText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer1: {
        width: '90%',
        justifyContent:'center',
        alignSelf:'center',
    },
    formContainer2: {
        width: '90%',
        justifyContent:'center',
        alignSelf:'center',
        position: 'relative',
    },
    positionIcon2: {
        position: 'absolute',
        right:10,
        top:50,
        color: '#2c3e50',
    }
});

export default FormInput;
