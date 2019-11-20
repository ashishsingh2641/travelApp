import React from 'react';
import { View, CheckBox, Text } from 'react-native';

const Check = (props) => {
    return (
        <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
                <CheckBox
                    value={props.checked}
                    onValueChange={props.onChange}
                />
                <Text style={{ marginTop: 5 }}>{props.label}</Text>
            </View>
        </View>
    )
}

export default Check;