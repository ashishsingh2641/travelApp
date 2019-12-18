import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';

const SwitchComponent = (props) => {
    return (
        <View style={{ flex: 1, }}>
            <View style={{ textAlign: "left", display: "flex", flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
                <View style={{ width: "50%" }}>
                    <Text>{props.label}</Text>
                </View>
                <View style={{ alignItems: "space-around", alignContent: "space-around", width: "50%" }}>
                    <Switch  
                    thumbColor="#2c3e50" 
                    trackColor={{
                        true: "#3498db",
                        false: "#999999",
                    }} 
                    onValueChange={props.handleSwitch}
                    value={props.isSwitchOn} />
                </View>
            </View>
        </View>
    );
}

export default SwitchComponent;