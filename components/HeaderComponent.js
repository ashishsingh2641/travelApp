import React, { Component } from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Animated} from 'react-native';
import {Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign'

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotateIcon: [{rotate: '0deg'}],
            icon: "menufold",
        }
        this.onNavigate = this.onNavigate.bind(this)
    }
    componentDidMount = () => {
        this.setState({
            rotateIcon: [{rotate: '0deg'}]
        })
    }
    onNavigate = () => {
        this.setState({
            icon: "menuunfold"
        }, () => {
            Animated.timing(this.state.xPosition, {
                toValue: 100,
                easing: Easing.back(),
                duration: 2000,
              }).start();
        })
    }
    render() {
        const props = this.props;
        return (
            <View style={{display: 'flex', 
                flexDirection: 'row', 
                padding: 10,
                backgroundColor: '#3498db'
                }}>
                <Left>
                <TouchableOpacity 
                style={{ zIndex: 9999}}>
                    <Icon onPress={() => alert('hi')} name={this.state.icon} size={25} color={"white"}/>
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
