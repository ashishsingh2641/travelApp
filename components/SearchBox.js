import React, {Component} from 'react';
import {Image, StyleSheet, ActivityIndicator, ScrollView,View} from 'react-native';
import {Item, Input, Icon} from 'native-base';

class SearchBox extends Component {
    render() {
        return (
            <View style={styles.SearchLayout}>
                <Item style={{ width: '100%',
                      height: 40,
                      elevation: 0.1,
                      borderRadius: 2, 
                    borderColor: "#e5e5e5",
                      }} >
                    <Icon name="search" style= {{color: '#2c3e50',
                  marginLeft: 5}}/>
                    <Input placeholder="Search Locality" 
                    value={this.props.value}
                    onSubmitEditing={this.props.onSubmitEditing}
                    placeholderTextColor = "grey"
                    underlineColorAndroid="transparent"
                    onChangeText={this.props.handleChange}
                    style={{
                        marginLeft: -10,
                        color: '#186057', 
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                    }} />
                   
                </Item>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    SearchLayout: {
        width: '100%', 
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingLeft: 10,
        height: 40,
    },
});

export default SearchBox;

