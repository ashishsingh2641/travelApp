import React, { Component } from 'react'
import {View, Text, TouchableHighlight, Dimensions, RefreshControl} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Button from '../components/Button';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

class ProfileInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            obj: {},
            refreshing: false,
        }
    }
    componentDidMount() {
        this._onRefresh()
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        let user = '';
        AsyncStorage.getItem("userName").then((value) => {
            if (value !== null) {
                user = value;
                //alert(value)
                this.setState({
                    userName: user
                })
                axios.get(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/user/getUserData/${value}`)
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        obj: res.data,
                        refreshing: false
                    })
                })
                .catch(err => console.log(err))
            } else {
                this.setState({
                    refreshing: false
                })
            }
        });
    }
    render() {
        return (
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
            />
          }>
            {Object.entries(this.state.obj).length === 0 && this.state.obj.constructor === Object ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Please login to see the profile details....</Text>
                </View>
                :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <TouchableHighlight
                style = {{
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * 0.5,
                    height: Dimensions.get('window').width * 0.5,
                    backgroundColor:'#2c3e50',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                underlayColor = '#2c3e50' 
                >
                <Text style={{color: "white", textTransform: 'uppercase', fontSize: 30}}>{this.state.userName.charAt(0)}</Text>
                </TouchableHighlight>
                <Text style={{color: "black", alignSelf: 'flex-start', marginHorizontal: 22, fontWeight: 'bold', marginVertical: 10}}><Text>{' \u2B24 '}</Text>{'UserName: ' + this.state.userName}</Text>
                <Text style={{color: "black", alignSelf: 'flex-start', marginHorizontal: 22, fontWeight: 'bold', marginVertical: 10}}><Text>{' \u2B24 '}</Text>{'FirstName: ' + this.state.obj.firstName}</Text>
                <Text style={{color: "black", alignSelf: 'flex-start', marginHorizontal: 22, fontWeight: 'bold', marginVertical: 10}}><Text>{' \u2B24 '}</Text>{'LastName: ' + this.state.obj.lastName}</Text>
                <Text style={{color: "black", alignSelf: 'flex-start', marginHorizontal: 22, fontWeight: 'bold', marginVertical: 10}}><Text>{' \u2B24 '}</Text>{'Gender: ' + this.state.obj.gender}</Text>
                <Text style={{color: "black", alignSelf: 'flex-start', marginHorizontal: 22, fontWeight: 'bold', marginVertical: 10}}><Text>{' \u2B24 '}</Text>{'Address: ' + this.state.obj.address}</Text>
                <Text style={{color: "black", alignSelf: 'flex-start', marginHorizontal: 22, fontWeight: 'bold', marginVertical: 10}}><Text>{' \u2B24 '}</Text>{'Phone Number: ' + this.state.obj.phnNumber}</Text>
               <Button label="Update your profile" buttonAction={() => this.props.navigation.navigate('EditProfile', {obj: this.state.obj})} />
           </View>
            }
           </ScrollView>
        )
    }
}


export default ProfileInfo;