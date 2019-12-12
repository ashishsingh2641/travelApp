import React, {Component} from 'react';
import {Image, StyleSheet, ActivityIndicator, ScrollView,View} from 'react-native';
import {Item, Input, Icon} from 'native-base';

class SearchBox extends Component {
    render() {
        return (
            <View style={styles.SearchLayout}>
                <Item style={{ width: '100%',
                      marginHorizontal: 10,
                      elevation: 1,
                      marginTop: 10
                      }} >
                    <Icon name="search" style= {{color: '#2c3e50',
                  marginHorizontal: 10}}/>
                    <Input placeholder="Search" 
                    onSubmitEditing={this.props.onSubmitEditing}
                    placeholderTextColor = "grey"
                    underlineColorAndroid="transparent"
                    onChangeText={this.props.handleChange}
                    style={{
                        color: '#186057', 
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                    }} />
                </Item>
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
        marginBottom: 20,
        paddingHorizontal: 10
    },
    bookmarks: {
        position: 'absolute',
        right: 10,
        opacity: .9,
        color: '#2c3e50',
    }
});

export default SearchBox;

