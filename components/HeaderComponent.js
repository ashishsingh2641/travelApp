import React, { Component } from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Left, Right} from 'native-base';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotateIcon: [{rotate: '0deg'}]
        }
    }
    componentDidMount = () => {
        this.setState({
            rotateIcon: [{rotate: '0deg'}]
        })
    }
    render() {
        const props = this.props;
        return (
            <View style={{display: 'flex', 
                flexDirection: 'row', 
                margin: 10
                }}>
                <Left>
                <TouchableOpacity onPress={props.onNavigate}
                style={{backgroundColor: 'transparent'}}>
                    <Image source={props.icon} 
                    style={{width:40,
                        height: 40,}}
                        />
                </TouchableOpacity>     
                </Left>
                <Right>
                    <Image source={props.avatar} 
                    style={{
                        width:40,
                        height: 40,
                        borderWidth:2,
                        borderColor: '#186057',
                        borderRadius: 50
                    }}/>
                </Right>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    
})
export default HeaderComponent;
