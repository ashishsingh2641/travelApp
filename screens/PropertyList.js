import React, { Component } from "react";
import { BackHandler, Alert, ActivityIndicator, RefreshControl, View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import Button from "../components/Button";
import { ScrollView } from "react-native-gesture-handler";

class PropertyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleRoute: false,
            data: [],
            refreshing: false,
            fetching: true,
            userName: ''
        }
        this.handlePress = this.handlePress.bind(this);
        
    }
    componentDidMount() {
        let user;
        AsyncStorage.getItem("userName").then((value) => {
            if (value !== null) {
                user = value.substring(0, value.indexOf('@'));
            }
        })
        this.setState({fetching: false, refreshing: true});
        axios.get(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/getPropDetailsByUser/${this.props.email}`)
        .then(res => {
            //console.log(res)
            if (res.data.length > 0  && res.data !== undefined) {
                this.setState({
                    refreshing: false,
                    fetching: true,
                    data: [...res.data],
                    userName: user
            })
            }else {
                this.props.navigation.navigate('AddProperty');
            }
            
        })
        .catch(err => alert("Something went wrong"));
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        //alert(this.props.email);
        this.willFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            () => {
                axios.get(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/getPropDetailsByUser/${this.props.email}`)
                .then(res => {
                    //console.log(res)
                    if (res.data.length > 0  && res.data !== undefined) {
                        this.setState({
                            refreshing: false,
                            fetching: true,
                            data: [...res.data]
                    })
                    }else {
                        this.props.navigation.navigate('AddProperty');
                    }
                    
                })
            }
          );
       
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        axios.get(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/property/getPropDetailsByUser/${this.props.email}`)
        .then(res => {
            //console.log(res)
            if (res.data.length > 0  && res.data !== undefined) {
                this.setState({
                    refreshing: false,
                    data: [...res.data]
            })
            }else {
                this.props.navigation.navigate('AddProperty');
            }
            
        })
        .catch(err => alert("Something went wrong"))
      }
    componentWillUnmount() {
        this.backHandler.remove()
    }
    handleBackPress = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Cancel Pressed");
                    },
                    style: "cancel"
                },
                { text: "Logout", onPress: this.handlePress}
            ],
            { cancelable: false }
        );
    }
    handlePress() {
        AsyncStorage.removeItem("userName").then((value) => {
            if (value === null) {
                this.props.navigation.navigate("Login")
            }
        })
    }
    render() {
        return (
            <>
                
                {this.state.fetching === false ?

                    <View style={{ marginTop: 100, justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <ActivityIndicator size="large" color="#2c3e50" />
                        <Text>Loading your Property...</Text>
                    </View>
                    :
                    <Container>
            <ScrollView refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }>
                <View style={{paddingHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>
                    <Text style={{fontSize: 20}}>Welcome </Text>
                    <Text style={{fontSize: 20, textTransform: 'uppercase'}}>{this.state.userName}</Text>
                </View>
                <Content padder>
                   {this.state.data.map((item) => {
                        return (
                            <>
                                {this.state.data.length > 0 ? 
                                <Card key={item.id}>
                            <CardItem header bordered>
                                    <Text style={{padding: 5, backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold',
                                        width: 50, height: 50, borderRadius: 50, textAlign: 'center', textAlignVertical: 'center'}}>
                                            {item.ownerName.charAt(0)}
                                        </Text>
                                        <Text>{'  ' +item.ownerName}</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    
                                        <Text style={{ fontWeight: 'bold',}}>{item.price}</Text>
                                        <Text>{item.address1 + item.address2 + "  " +item.locality}</Text>
                                        <Text>{item.city + "  " +item.state }</Text>
                                        <Text>{item.pincode}</Text>
                                </Body>
                            </CardItem>
                            <CardItem footer bordered>
                                <Text>{'Price: ' + item.price}</Text>
                            </CardItem>
                        </Card>:
                        <ActivityIndicator size={"large"}/>}

                            </>
                        )
                   })}
                   <View style={{position: 'relative', width: "100%", marginTop: 100}}>
                        <View style={{position: 'absolute', width: '100%', bottom: 0}}>
                        <Button label="Add Property" buttonAction={() => this.props.navigation.navigate("AddProperty")} />
                        </View>
                   </View>
                </Content>
                
            </ScrollView>
            </Container>
                }
            </>
        );
    }
}

const mapStateToProps =(state) => {
    console.log(state.loginData)
    const data = state.loginData;
    return {
        email: data.email,
        phnNumber: data.phnNumber,
        password: data.password,
        isPending: data.isPending,
        isError: data.isError
    }
}
export default connect(mapStateToProps)(PropertyList);
