import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, View, Text, Platform, StatusBar, Picker , TouchableOpacity, Alert} from 'react-native';
// import {Spinner} from 'native-base';
import CardComponent from '../components/CardComponent';
import SearchBox from '../components/SearchBox';
import Recmonded from '../components/Recmonded';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import Icons from 'react-native-vector-icons/AntDesign';

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: '',
            cities: [],
            currentCitiesData: [],
            isLoading: false,
            spinner: false,
            value: '',
            modalVisible: false,
            flag: false,
            textContent: ''
        }
    }
    UNSAFE_componentWillMount() {
        this.startHeaderHeight = 80;
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }
    componentDidMount() {
        axios.get('http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/property/getAllCity')
            .then(res => this.setState({
                cities: res.data,
                spinner: true
            }, () => {
                axios.get(`http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${res.data[0]}`)
                    .then(newRes => this.setState({
                        currentCitiesData: newRes.data,
                        spinner: false
                    }))
                    .catch(err => console.log(err))
            }))
            .catch(err => alert(JSON.stringify(err)))
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    
    render() {
        return (
            <View style={{ flex: 1, position: 'relative', }}>
                <ScrollView
                    scrollEventThrottle={16}>
                    <Picker
                        selectedValue={this.state.selectedItem}
                        style={{ height: 50, width: "100%", border: 1, borderColor: "black" }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({
                                selectedItem: itemValue,
                            }, () => {
                                axios.get(`http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${itemValue}`)
                                    .then(res => {
                                        if (res !== undefined) {
                                            this.setState({
                                                currentCitiesData: res.data,
                                            })
                                        }
                                    })
                            })
                        }}>
                        {this.state.cities.map((item) => {
                            return (
                                <Picker.Item label={item} value={item} key={item} />
                            )
                        })}
                    </Picker>
                    <SearchBox handleChange={(value) => this.setState({
                        value: value
                    })}
                    onSubmitEditing={ () => {
                        if(this.state.value !== '') {
                            const value = this.state.value;
                            const cities = [];
                            this.state.currentCitiesData.filter(function(item) {
                            return item.address2.toLowerCase() === value.toLowerCase();
                            }).map(function ({ address1, address2, imageUrl  }) {
                                cities.push({address1, address2, imageUrl})
                            });
                            this.setState({
                                currentCitiesData: cities
                            })
                        } else {
                            this.setState({
                                spinner: true
                            })
                            axios.get(`http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${this.state.selectedItem}`)
                                    .then(res => {
                                        if (res !== undefined) {
                                            this.setState({
                                                spinner: false,
                                                currentCitiesData: res.data,
                                            })
                                        }
                                })
                        }
                    }}/>
                    <View>
                        {this.state.currentCitiesData.length <= 0 ?
                            <View >
                                <Spinner
                                    textStyle={{ color: "white" }}
                                    visible={this.state.spinner}
                                    textContent={'Loading your items...'} />
                            </View>
                            :
                            <>
                                {this.state.currentCitiesData.map((item) => {
                                    //const imageURL = JSON.parse(item.imageUrl);
                                    const arr = []; 
                                    let imgData = ''
                                    const data = JSON.parse(item.imageUrl).map((newItem) => {
                                    imgData = `data:${newItem.mime};base64,${newItem.data}`;
                                    arr.push(imgData)
                                    })
                                    return (
                                        <View key={item.id} style={{ marginLeft: 20, marginRight: 20, marginBottom: 15, marginTop: 15 }}>
                                            <Text style={{ fontSize: 20, fontWeight: "bold", textTransform: "uppercase" }}>{item.address1}</Text>
                                            <View style={{flex: 1, flexDirection: 'row', marginBottom: 10, marginTop: 10,}}>
                                                <View style={{flex: 1}}>
                                                    <Text>{item.address2}</Text>
                                                </View>
                                                <View style={{flex: 1}}>
                                                <TouchableOpacity style={{textAlign: 'right'}}
                                                    onPress={() => this.setState({flag: true, textContent: 'your booking is confirmed...'}, () => {
                                                        setTimeout(()=> {
                                                            this.setState({textContent: 'redirecting you to dashboard...', });
                                                            this.props.navigation.navigate("Welcome");
                                                            this.setState({flag: false, });
                                                        }, 3000)
                                                    })}>
                                                <Icons name={"save"}  size={30} color="#01a699" style={{textAlign: 'right'}}/>
                                                </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{display: 'flex', flexDirection: 'row'}}>
                     
                                               
                                                    {JSON.parse(item.imageUrl).length === 1 ? 
                                                             <Image source={{uri: `data:${JSON.parse(item.imageUrl)[0].mime};base64,${JSON.parse(item.imageUrl)[0].data}`}} 
                                                                 style={{width: "100%", height: 200, resizeMode:'cover', zIndex: 9999}}  />
                                                         : 
                                                        (
                                                        <>
                                                        {JSON.parse(item.imageUrl).length === 2 ? 
                                                        <>
                                                            <Image source={{uri: `data:${JSON.parse(item.imageUrl)[0].mime};base64,${JSON.parse(item.imageUrl)[0].data}`}} 
                                                            style={{width: "50%", height: 200, marginRight: 5}}/>
                                                            <Image source={{uri: `data:${JSON.parse(item.imageUrl)[1].mime};base64,${JSON.parse(item.imageUrl)[1].data}`}} 
                                                            style={{width: "50%", height: 200}}/>
                                                        </>
                                                        
                                                        :<>
                                                            <View style={{width: "50%"}}>
                                                               <Image source={{uri: `data:${JSON.parse(item.imageUrl)[0].mime};base64,${JSON.parse(item.imageUrl)[0].data}`}} 
                                                            style={{width: "100%", height: 200}}/> 
                                                               
                                                            </View>
                                                            <View style={{width: "50%", flex: 2, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,.4)'}}>
                                                                <View style={{marginBottom: 5}}>
                                                                <Image source={{uri: `data:${JSON.parse(item.imageUrl)[1].mime};base64,${JSON.parse(item.imageUrl)[1].data}`}} 
                                                            style={{width: "100%", height: 90 }}/> 
                                                                </View>
                                                                <View style={{marginTop: 5}}>
                                                                <Image source={{uri: `data:${JSON.parse(item.imageUrl)[2].mime};base64,${JSON.parse(item.imageUrl)[2].data}`}} 
                                                                   style={{width: "100%", height: 100}}/>
                                                                </View>
                                                            </View>
                                                            </>
                                                        }
                                                        </>
                                                        )
                                                    }
                                                    
                                            </View>
                                        </View>
                                    )
                                })}
                            </>
                        }
                        
                    </View>

                    
                
                </ScrollView>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        position: 'relative',
                        marginTop: 40
                    }}>
                    <Text onPress={() => this.props.navigation.navigate("Login")}
                        style={{
                            position: 'absolute', right: 10, textAlign: 'center', elevation: 5,
                            width: 50, height: 50, bottom: 50, zIndex: 999, borderRadius: 50,
                            fontSize: 35, backgroundColor: '#2c3e50', color: 'white'
                        }}>+</Text>
                </View>
                {this.state.flag === true ? 
                 <Spinner
                    textStyle={{ color: "white", paddingLeft: 50, paddingRight: 50 }}
                    visible={this.state.flag}
                    textContent={this.state.textContent} />
                    
        : <Text />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'white'
    },
    username: {
        fontSize: 24,
        fontWeight: '700',
        paddingHorizontal: 20
    }
});

export default Explore;
