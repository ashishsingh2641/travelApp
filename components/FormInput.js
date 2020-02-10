import React from 'react';
import {View, StyleSheet, Text, TextInput,Alert } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const FormInput = (props) => {
    const {formFieldLabel, handleTouchStart, style, 
        placeHolderText, handleChange, value, required,multiline, numberOfLines,
        onBlur, autoFocus} = props;
    return (
        <View style={formFieldLabel === 'password' || formFieldLabel === "Password"? styles.formContainer2 : styles.formContainer1}>
            <Text style={{ marginTop: 10, marginBottom: 10 , fontSize: 18, color: props.color || 'black', fontWeight: 'bold'}}>{formFieldLabel}
            {required === true ? <Text style={{color: 'red'}}>*</Text> : <Text /> }</Text>
            <TextInput
                {...props}
                returnKeyType = { "next" }
                selectionColor={'black'}
                multipleLine={props.multipleLine}
                secureTextEntry={props.secureTextEntry}
                onTouchStart={handleTouchStart}
                style={style} autoFocus={autoFocus}
                placeholder={placeHolderText}
                onChangeText={handleChange}
                onBlur={onBlur}
                value={value}
                required={required}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
            {formFieldLabel === 'password' || formFieldLabel === "Password" ? 
             <Icons name={props.icons || "eye-outline"} size={28} style={styles.positionIcon2}
                onPress={props.toggleIcon} />
            : <Text style={{height: 0}}/> }
           <>
                {props.valid === ""? 
                     <Text /> :
                     <Text style={{ color: 'red',marginTop: 5, marginBottom:10 }}>
                        {props.validateText}
                    </Text>
                }
           </>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer1: {
        width: '100%',
        justifyContent:'center',
        alignSelf:'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    formContainer2: {
        width: '100%',
        justifyContent:'center',
        alignSelf:'center',
        position: 'relative',
        paddingLeft: 20,
        paddingRight: 20
    },
    positionIcon2: {

        position: 'absolute',
        right:30,
        top:50,
        color: '#2c3e50',
    }
});

export default FormInput;
