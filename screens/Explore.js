import React, { Component } from 'react';
import { ImageBackground, StyleSheet, CheckBox, ScrollView,TextInput, View, Text, Modal, Platform,StatusBar, Picker, TouchableOpacity, Alert, Dimensions } from 'react-native';
import CardComponent from '../components/CardComponent';
import SearchBox from '../components/SearchBox';
import Recmonded from '../components/Recmonded';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import Icons from 'react-native-vector-icons/AntDesign';
import Button from '../components/Button';
import Gallery from 'react-native-image-gallery';
import AsyncStorage from '@react-native-community/async-storage';
import states from '../modal/cities.json';
import LucknowData from '../modal/lucknow.json';
import kanpurData from '../modal/kanpurData.json';
import {Content, Card, CardItem} from 'native-base';
import FormInput from '../components/FormInput';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;
const windowHeight = dimensions.height - 80;

const __cities = states;

var array = states;
var seenNames = {};
array = array.filter(function (currentObject) {
    if (currentObject.state in seenNames) {
        return false;
    } else {
        seenNames[currentObject.state] = true;
        return true;
    }
});

const cities = [];
__cities.filter(function (item) {
    return item.state === array[8].state;
}).map(function ({ id, name }) {
    cities.push(name)
});

var selecity =  cities.sort()

function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}
let cityIndex =  searchStringInArray("Lucknow", selecity);

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedAdresses: [],
            selectedItem: selecity[cityIndex],
            rangeHigh: 0,
            renderGalary: false,
            cities: selecity,
            currentCitiesData: [],
            isLoading: false,
            spinner: false,
            value: '',
            modalVisible: false,
            flag: false,
            textContent: '',
            modalVisible: false,
            unFurnished: false,
            semiFurnished: false,
            hide: true,
            fullFurnished: false,
            semiFurnished: false,
            modalSpinner: false,
            priceFilter: '',
            ModalText: 'filtering your items...',
            userName: ''
        }
        this.handleFilter = this.handleFilter.bind(this);
    }
    componentDidMount() {
        let user;
        AsyncStorage.getItem("userName").then((value) => {
            if (value !== null) {
                user = value.substring(0, value.indexOf('@'));
            }
        });
        axios.get('http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/getAllCity')
            .then(res => this.setState({
                cities: cities,
                spinner: true
            }, () => {
                axios.get(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${this.state.selectedItem}`)
                    .then(newRes => this.setState({
                        currentCitiesData: newRes.data,
                        spinner: false
                    }))
                    .catch(err => console.log(err))
            }))
            .catch(err => alert(JSON.stringify(err)))
    }
    UNSAFE_componentWillMount() {
        this.startHeaderHeight = 80;
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    handleFilter = () => {
         this.setState({
                    modalVisible: false,
                    modalSpinner: true
                })
        axios.get(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${this.state.selectedItem}`)
            .then(newRes => {
                const __cities = [];
                const arr = [...newRes.data];
                this.setState({
                    modalSpinner: false
                });
             
                if (this.state.sell === true && this.state.priceFilter){
                        arr.filter((item) => {
                            return (item.sell === this.state.sell && item.sell >= this.state.priceFilter);
                        }).map(function ({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                            nonAc,
                            wifi,
                            parking,
                            lift,
                            tv,
                            powerBackUp }) {
                            __cities.push({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                nonAc,
                                wifi,
                                parking,
                                lift,
                                tv,
                                powerBackUp});
                        });
                        this.setState({
                            currentCitiesData: __cities,
                            modalVisible: false,
                            modalSpinner: false
                        })
                    } else if (this.state.sell === true && this.state.priceFilter && this.state.unFurnished) {
                        arr.filter((item) => {
                            return (item.sell === this.state.sell && item.sell >= this.state.priceFilter && item.unFurnished === this.state.unFurnished);
                        }).map(function ({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                            nonAc,
                            wifi,
                            parking,
                            lift,
                            tv,
                            powerBackUp }) {
                            __cities.push({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                nonAc,
                                wifi,
                                parking,
                                lift,
                                tv,
                                powerBackUp});
                        });
                        this.setState({
                            currentCitiesData: __cities,
                            modalVisible: false,
                            modalSpinner: false
                        })
                    } else if (this.state.sell === true && this.state.fullFurnished) {
                        arr.filter((item) => {
                            return (item.sell === this.state.sell && item.fullFurnished === this.state.fullFurnished);
                        }).map(function ({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                            nonAc,
                            wifi,
                            parking,
                            lift,
                            tv,
                            powerBackUp }) {
                            __cities.push({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                nonAc,
                                wifi,
                                parking,
                                lift,
                                tv,
                                powerBackUp});
                        });
                        this.setState({
                            currentCitiesData: __cities,
                            modalVisible: false
                        })
                    } else if (this.state.sell === true) {
                        arr.filter((item) => {
                            return (item.sell === this.state.sell);
                        }).map(function ({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                            nonAc,
                            wifi,
                            parking,
                            lift,
                            tv,
                            powerBackUp }) {
                            __cities.push({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                nonAc,
                                wifi,
                                parking,
                                lift,
                                tv,
                                powerBackUp});
                        });
                        this.setState({
                            currentCitiesData: __cities,
                            modalVisible: false,
                            
                            modalSpinner: false
                        })
                    } else if(this.state.rent === true){
                            arr.filter((item) => {
                                return (item.rent === this.state.rent);
                            }).map(function ({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                nonAc,
                                wifi,
                                parking,
                                lift,
                                tv,
                                powerBackUp }) {
                                __cities.push({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                    nonAc,
                                    wifi,
                                    parking,
                                    lift,
                                    tv,
                                    powerBackUp});
                            });
                            this.setState({
                                currentCitiesData: __cities,
                                modalVisible: false,
                                
                            modalSpinner: false
                        })
                    } else if (this.state.priceFilter) {
                        arr.filter((item) => {
                            return (item.price >= this.state.priceFilter);
                        }).map(function ({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                            nonAc,
                            wifi,
                            parking,
                            lift,
                            tv,
                            powerBackUp }) {
                            __cities.push({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                nonAc,
                                wifi,
                                parking,
                                lift,
                                tv,
                                powerBackUp});
                        });
                        this.setState({
                            currentCitiesData: __cities,
                            modalVisible: false,
                            
                            modalSpinner: false
                        })
                    } else {
                        this.setState({
                            ModalText: 'loading default items...',
    
                        });
                        axios.get(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${this.state.selectedItem}`)
                        .then(newRes => this.setState({
                            currentCitiesData: [...newRes.data],
                            spinner: false
                        })).catch(err => alert('Something went wrong.'))
                    }
                })
            .catch(err => console.log(err))
    }
    render() {
        const checkmark = '✔';
        return (
            <View style={{flex: 1}}>
                <ScrollView
                    scrollEventThrottle={12}>
                {this.state.userName === false ? 
                <View style={{paddingHorizontal: 10, flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>
                    <Text style={{fontSize: 20}}>Welcome </Text>
                    <Text style={{fontSize: 20, textTransform: 'uppercase'}}>{this.state.userName}</Text>
                </View>
                    : <Text style={{height: 0}} />
                }
                    <Text style={{ marginLeft: 15, }}></Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{height: 40,  width: '40%', borderWidth: 1, borderRadius: 4, marginBottom: 20, marginLeft: 10 }} >
                            <Picker
                                selectedValue={this.state.selectedItem}
                                style={{ height: 40, width: "100%", border: 1, borderColor: "black" }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({
                                        selectedItem: itemValue,
                                    }, () => {axios.get(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${itemValue}`)
                                    .then(res => {
                                        console.log("res", res)
                                        if (res !== undefined && res.data.length > 0) {
                                            this.setState({
                                                currentCitiesData: res.data,
                                            })
                                        } else {
                                            debugger;
                                            alert("No cities are available for the selected city")
                                            this.setState({
                                                currentCitiesData: [],
                                            })
                                        }
                                    }).catch(err => alert('Something went wrong'))
                                    })
                                }}>
                                {this.state.cities.map((item) => {
                                    //console.log(this.state.cities, "Inside picker::::::::::::::::")
                                    return (
                                        <Picker.Item label={item} value={item} key={item} />
                                    )
                                })}
                            </Picker>
                        </View>
                <View style={{position: 'relative', width: "55%", paddingRight: 5}}>
                   <SearchBox handleChange={(value) => { 
                        this.setState({
                        value: value
                    }, () => {
                            if(value !== '') {
                                this.setState({
                                    hide: false
                                })
                                let searchedAdresses = this.state.currentCitiesData.filter(function(item) {
                                    // console.log(item.address2.toLowerCase().indexOf(value.toLowerCase()));
                                     return item.address2.toLowerCase().indexOf(value.toLowerCase()) > -1;
                                   });
                                // console.log(searchedAdresses)
                                 this.setState({ 
                                     searchedAdresses: searchedAdresses,
                                });
                            } else {
                                this.setState({
                                    hide: true
                                })
                            }
                        })
                    }}
                        value={this.state.value}
                        onSubmitEditing={() => {
                            //alert(this.state.value)
                            if (this.state.value !== '') {
                                const value = this.state.value;
                                const cities = [];
                                this.state.currentCitiesData.filter(function (item) {
                                    return item.address2.toLowerCase() === value.toLowerCase();
                                }).map(function ({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                    nonAc,
                                    wifi,
                                    parking,
                                    lift,
                                    tv,
                                    powerBackUp }) {
                                    cities.push({ id, address2, imageUrl, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                        nonAc,
                                        wifi,
                                        parking,
                                        lift,
                                        tv,
                                        powerBackUp})
                                });
                                this.setState({
                                    currentCitiesData: cities
                                })
                            } else {
                                this.setState({
                                    spinner: true,
                                    hide: true
                                })
                                axios.get(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${this.state.selectedItem}`)
                                .then(res => {
                                    if (res !== undefined) {
                                        this.setState({
                                            spinner: false,
                                            currentCitiesData: res.data,
                                        })
                                    }
                                })
                            }
                        }}>
                        {this.state.hide === false ?                
                        <>
                        {this.state.searchedAdresses.length > 0  ?
                        <View style={{position: 'absolute',paddingHorizontal: 10, top: 40, left: 15, zIndex: 999999, backgroundColor: '#fff', width: "100%", elevation: 5, borderWidth: 1, borderColor: 'grey', }}>
                                {this.state.searchedAdresses.map((item) => {
                                    return (
                                      <>
                                         <Text key={Math.random()+ this.uuidv4} style={{marginTop: 10,marginBottom: 10}} onPress={() => {
                                            ///alert(item.address2)
                                            //alert(this.state.value)
                                            this.setState({
                                                value: item.address2,
                                                hide: true
                                            }, () => {
                                                if (this.state.value === item.address2) {
                                                    const value = this.state.value;
                                                    const cities = [];
                                                    this.state.currentCitiesData.filter(function (item) {
                                                        return item.address2.toLowerCase() === value.toLowerCase();
                                                    }).map(function ({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                                        nonAc,
                                                        wifi,
                                                        parking,
                                                        lift,
                                                        tv,
                                                        powerBackUp}) {
                                                        cities.push({ id, address2, imageUrl, OwnerName, ownerMobileNo, sell, price, fullFurnished, semiFurnished, unFurnished, desription,ac,
                                                            nonAc,
                                                            wifi,
                                                            parking,
                                                            lift,
                                                            tv,
                                                            powerBackUp})
                                                    });
                                                    this.setState({
                                                        currentCitiesData: cities
                                                    })
                                                }
                                            })
                                        }}>{item.address2}</Text>
                                      </>
                                    )
                                })}
                          </View>
                                :
                                <Text style={{height: 0}}/>
                            }
                        </>
                        : <Text style={{height: 0}} />}
                    </SearchBox>    
                   </View>
                </View>
                
                    <>
                        {this.state.currentCitiesData.length <= 0 ?
                            <>
                                <Spinner
                                    textStyle={{ color: "white" }}
                                    visible={this.state.spinner}
                                    textContent={'Loading Properties...'} />
                            </>
                            :
                            <>
                                {this.state.currentCitiesData.map((item, index) => {
                                    //console.log(item.id, "shdjahsjdhasjhd")
                                    const imageURL = JSON.parse(item.imageUrl);
                                    return (
                                        <>
                                            <View key={'Key_' + item.id}>
                                                {imageURL.length > 0 && imageURL.length <= 3 ?
                                                    <>
                                                        <Recmonded imagrUri={'data:image/png;base64,' + imageURL[0].data}
                                                            title={item.address2}
                                                            contentPosition="bottom"
                                                            price={item.price}
                                                            sell={item.sell}
                                                            rent={item.rent}
                                                            wifi={item.wifi}
                                                            ac={item.ac}
                                                            nonAc={item.nonAc}
                                                            powerBackUp={item.powerBackUp}
                                                            tv={item.tv}
                                                            lift={item.lift}
                                                            fullFurnished={item.fullFurnished}
                                                            unFurnished={item.unFurnished}
                                                            semiFurnished={item.semiFurnished}
                                                            HandleRoute={() => this.props.navigation.navigate('ImageGalary', { imageUrl: imageURL })}
                                                            buttonAction={() => {
                                                               // console.log(item);
                                                                AsyncStorage.getItem("userName").then((value) => {
                                                                    if (value !== null) {
                                                                        this.setState({
                                                                            ModalText: '',
                                                                            modalSpinner: true
                                                                        });
                                                                        axios.post(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/notify/customerbooking/${value}`, {
                                                                            "bookingStatus" : "In-Progress",
                                                                            "propertyId": {
                                                                            "id" : item.id
                                                                            }
                                                                        })
                                                                        .then(res => {
                                                                            console.log(res.data, ":::::::::::")
                                                                                this.setState({
                                                                                    modalSpinner: false
                                                                                })
                                                                                Alert.alert(
                                                                                            "Your Booking is in progress.",
                                                                                            "InLand admin team will contact you sortly.",
                                                                                                [
                                                                                                    {
                                                                                                        text: 'Cancel',
                                                                                                        onPress: () => console.log('Cancel Pressed'),
                                                                                                            style: 'cancel',
                                                                                                        },
                                                                                                        {text: 'OK', onPress: () => this.props.navigation.navigate("Explore")},
                                                                                                    ],
                                                                                                        {cancelable: false},
                                                                                                    );
                                                                                                if (res.data != undefined && res != null) {
                                                                                                    axios.post(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/notify/sendEmail/${value}/${item.id}`)
                                                                                                    .then(res => console.log(res, "email sent response"))
                                                                                                    .catch(err =>  {
                                                                                                        const error = JSON.stringify(err);
                                                                                                        alert('We are facing some issue please try after some time.');
                                                                                                        this.setState({
                                                                                                            ModalText: '',
                                                                                                            modalSpinner: false
                                                                                                        })
                                                                                                    })
                                                                                                }
                                                                                            })
                                                                                .catch(err => alert("something went wrong"))
                                                                      
                                                                    } else {
                                                                        Alert.alert(
                                                                            'You have not yet loggedin',
                                                                            "Please login to book now",
                                                                            [
                                                                               {
                                                                                text: 'Cancel',
                                                                                onPress: () => console.log('Cancel Pressed'),
                                                                                style: 'cancel',
                                                                              },
                                                                              {text: 'OK', onPress: () => this.props.navigation.navigate("SprSignUp", {prviderRole: 'ServiceConsumer'})},
                                                                            ],
                                                                            {cancelable: false},
                                                                          );
                                                                    }
                                                                })
                                                            }} />
                                                    </>
                                                    :
                                                    <View style={{paddingTop: 0, paddingBottom: 10, borderWidth: 1, elevation: 1, margin: 10, borderTopLeftRadius: 4, borderTopRightRadius: 4,}}>
                                                        <CardItem>
                                                            <View style={{ width: "100%", height: 200, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#e5e5e5" }}>
                                                            </View>
                                                        </CardItem>
                                                        <View style={{justifyContent: 'space-between', flex: 1, alignItems: "flex-start", position: 'relative'}}>
                                                            <View style={{flexDirection: 'row'}}>
                                                                <View style={{width: "48%", flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                                                                    <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>Locality: </Text>{item.title}</Text>
                                                                    <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>Price (In Rupees): </Text>{item.price}</Text>
                                                                    {item.sell === true ? <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>Property For:</Text>{' Sale'}</Text> : <Text style={{height: 0}}/>}
                                                                    {item.rent === true ? <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>Property For:</Text>{' Rent'}</Text> : <Text style={{height: 0}}/>}
                                                                </View>
                                                                <View style={{height: "100%", width: 1, borderWidth:1, marginRight: 20,}}></View>
                                                                <View style={{width: "48%"}}>
                                                                    <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>Furnishing:</Text>
                                                                        {item.fullFurnished === true ? <Text style={{fontSize: 15, }}>{" Full"}</Text> : <Text style={{height: 0}}/>}
                                                                        {item.unFurnished === true ? <Text style={{fontSize: 15, }}>{" Unfurnished"}</Text> : <Text style={{height: 0}}/>}
                                                                        {item.semiFurnished === true ? <Text style={{fontSize: 15, }}>{" Semi"}</Text> : <Text style={{height: 0}}/>}
                                                                    </Text>
                                                                    <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>{"Facilities Provided:"}</Text></Text>
                                                                        {item.ac === true ? 
                                                                            <><Text style={{fontSize: 15, }}><Text>{'&#100004'}</Text>{' AC'}</Text>
                                                                            <Icons name="air" size={25} />
                                                                            
                                                                        </>
                                                                            : <Text style={{height: 0}} />
                                                                        }
                                                                        {item.nonAc === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" Non-AC"}</Text> : <Text style={{height: 0}}/>}
                                                                        {item.wifi === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" Wifi"}</Text> : <Text style={{height: 0}}/>}
                                                                        {item.parking === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" Parking"}</Text> : <Text style={{height: 0}}/>}
                                                                        {item.lift === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" Lift"}</Text> : <Text style={{height: 0}}/>}
                                                                        {item.tv === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" TV"}</Text> : <Text style={{height: 0}}/>}
                                                                        {item.powerBackUp === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" PowerBackup"}</Text> : <Text style={{height: 0}}/>}
                                                                    
                                                                </View>
                                                            </View>
                                                    </View>
                                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                            <View style={{width: "50%"}}>
                                                            <Button label="Book Now" disabled={this.state.disabled}
                                                            buttonAction={(props) => {
                                                                AsyncStorage.getItem("userName").then((value) => {
                                                                    if (value !== null) { 
                                                                        this.setState({
                                                                            ModalText: '',
                                                                            modalSpinner: true
                                                                        }); 
                                                                        axios.post(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/notify/customerbooking/${value}`,{
                                                                            "bookingStatus" : "In-Progress",
                                                                            "propertyId": {
                                                                            "id" : item.id
                                                                            }
                                                                        })
                                                                        .then(res => {
                                                                            //console.log(res.data, ":::::::::::")
                                                                                this.setState({
                                                                                    modalSpinner: false
                                                                                })
                                                                                Alert.alert(
                                                                                            "Your Booking is in progress.",
                                                                                            "InLand admin team will contact you sortly.",
                                                                                                [
                                                                                                    {
                                                                                                        text: 'Cancel',
                                                                                                        onPress: () => console.log('Cancel Pressed'),
                                                                                                            style: 'cancel',
                                                                                                        },
                                                                                                        {text: 'OK', onPress: () => this.props.navigation.navigate("Explore")},
                                                                                                    ],
                                                                                                        {cancelable: false},
                                                                                                    );
                                                                                                if (res.data != undefined && res != null) {
                                                                                                    axios.post(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/notify/sendEmail/${value}/${item.id}`)
                                                                                                    .then(res => console.log(res))
                                                                                                    .catch(err =>  {
                                                                                                        const error = JSON.stringify(err);
                                                                                                        alert('We are facing some issue please try after some time.');
                                                                                                        this.setState({
                                                                                                            ModalText: '',
                                                                                                            modalSpinner: false
                                                                                                        })
                                                                                                    })
                                                                                                }
                                                                                            })
                                                                                .catch(err => alert("something went wrong"))
                                                                      
                                                                        
                                                                    } else {
                                                                        Alert.alert(
                                                                            'You have not yet loggedin',
                                                                            "Please login to book now",
                                                                            [
                                                                               {
                                                                                text: 'Cancel',
                                                                                onPress: () => console.log('Cancel Pressed'),
                                                                                style: 'cancel',
                                                                              },
                                                                              {text: 'OK', onPress: () => this.props.navigation.navigate("SprSignUp", {prviderRole: 'ServiceConsumer'})},
                                                                            ],
                                                                            {cancelable: false},
                                                                        );
                                                                    }
                                                                })
                                                            }} />
                                                            </View>
                                                        </View>
                                                    </View>
                                                }
                                            </View>

                                        </>
                                    );
                                }
                                )}
                            </>
                        }
                    </>
                </ScrollView>
                <View style={{ width: "100%", marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ padding: 10, backgroundColor: '#2c3e50',
                                    borderWidth: 2, borderRadius: 50, zIndex: 99999,
                                    borderColor: 'white',
                                    textAlignVertical: 'center', 
                                    position: 'absolute', 
                                    right: 5, 
                                    bottom: 25 }}
                                onPress={() => this.setState({
                                    modalVisible: true
                                })}>
                                <Icons name={"filter"} size={30} color="white" />
                        </Text>
                    </View>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => { this.setModalVisible(false); } }>
                            <View style={{ marginTop: 22 }}>
                                <View>
                                    <View>
                                        <Text style={{marginLeft: 20, fontWeight: 'bold', fontSize: 18}}>Selcted Furnished Type:-</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                            <CheckBox
                                                value={this.state.unFurnished}
                                                onValueChange={() => {
                                                    this.setState({ unFurnished: !this.state.unFurnished })
                                                }}
                                            />
                                            <Text style={{ marginTop: 5, fontSize: 18 }}>Un-Furnished</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                            <CheckBox
                                                value={this.state.fullFurnished}
                                                onValueChange={() => {
                                                    this.setState({ fullFurnished: !this.state.fullFurnished })
                                                }}
                                            />
                                            <Text style={{ marginTop: 5, fontSize: 18 }}>fullFurnished</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                            <CheckBox
                                                value={this.state.semiFurnished}
                                                onValueChange={() => {
                                                    this.setState({ semiFurnished: !this.state.semiFurnished })
                                                }}
                                            />
                                            <Text style={{ marginTop: 5, fontSize: 18 }}>Semi furnished</Text>
                                        </View>
                                    </View>
                                    <View style={{paddingHorizontal: 20}}>
                                    <Text style={{marginVertical: 10}}>Please enter your maximum budget<Text style={{lineHeight:22 * 1.1, textAlignVertical: 'top', color: 'red'}}>*</Text></Text>
                                    <TextInput
                                        style={{
                                            borderWidth: 1, fontSize: 15, borderRadius: 4,
                                            borderColor: 'grey',
                                            
                                        }}
                                    formFieldLabel="Please select the budget."
                                    placeHolderText=""
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({priceFilter: value})}
                                    value={this.state.priceFilter} required={true} />
                                    </View>
                                </View>
                                <View style={{ marginTop: 20,  }}>
                                    <Text style={{marginLeft: 20}}>Select property Type:-</Text>
                                    <View style={{ flexDirection: "row", marginLeft: 20 }}>
                                        <CheckBox
                                            value={this.state.sell}
                                            onValueChange={() => {
                                                this.setState({ sell: !this.state.sell })
                                            }}
                                        />
                                        <Text style={{ marginTop: 5, fontSize: 18 }}>Sell</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginLeft: 20 }}>
                                        <CheckBox
                                            value={this.state.rent}
                                            onValueChange={(event) => this.setState({ rent: !this.state.rent })} />
                                        <Text style={{ marginTop: 5, fontSize: 18 }}>Rent</Text>
                                    </View>
                                    <Button label="submit" buttonAction={this.handleFilter} />
                                </View>

                            </View>
                        </Modal>
                    <Spinner
                        textStyle={{ color: "white" }}
                        visible={this.state.modalSpinner}
                        textContent={this.state.ModalText} />
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
