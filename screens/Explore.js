import React, { Component } from 'react';
import { ImageBackground, StyleSheet, CheckBox, ScrollView, View, Text, Modal, Platform,StatusBar, Picker, TouchableOpacity, Alert, Dimensions } from 'react-native';
import CardComponent from '../components/CardComponent';
import SearchBox from '../components/SearchBox';
import Recmonded from '../components/Recmonded';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import Icons from 'react-native-vector-icons/AntDesign';
import Button from '../components/Button';
import RangeSlider from 'rn-range-slider';
import Gallery from 'react-native-image-gallery';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedAdresses: [],
            selectedItem: '',
            rangeHigh: 0,
            renderGalary: false,
            cities: [],
            currentCitiesData: [],
            isLoading: false,
            spinner: false,
            value: '',
            modalVisible: false,
            flag: false,
            textContent: '',
            modalVisible: false,
            unFurnished: false,
            disableunFurnished: false,
            semiFurnished: false,
            disabledfullFurnished: false,
            fullFurnished: false,
            disabledsemiFurnished: false,
            semiFurnished: false,
            hide:  true
        }
        this.handleFilter = this.handleFilter.bind(this);
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
                if (res !== undefined || res.data !== null) {
                    axios.get(`http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${res.data[0]}`)
                        .then(newRes => {
                            console.log(newRes.data)
                            this.setState({
                                currentCitiesData: newRes.data,
                                spinner: false
                            })
                        })
                        .catch(err => console.log(err))
                }
            }))
            .catch(err => alert(JSON.stringify(err)))
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
        axios.get(`http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${this.state.selectedItem}`)
            .then(newRes => {
                const __cities = [];
                const arr = [...newRes.data];
                arr.filter((item) => {
                    return item.sell === this.state.sell;
                }).map(function ({ id, address2, imageUrl, sell, price, rent }) {
                    __cities.push({ id, address2, imageUrl, sell, price, rent });
                });
                this.setState({
                    currentCitiesData: __cities,
                    modalVisible: false
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    scrollEventThrottle={16}>
                    <Text style={{ marginLeft: 15, marginTop: 20, marginBottom: 10 }}>Please select your city :-</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ width: '75%', borderWidth: 1, borderRadius: 4, marginBottom: 20, marginLeft: 15 }} >
                            <Picker
                                selectedValue={this.state.selectedItem}
                                style={{ height: 40, width: "100%", border: 1, borderColor: "black" }}
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
                        </View>
                        <View style={{ width: "25%", marginTop: -5, alignItems: 'center' }}>
                            <Text style={{ padding: 10, borderWidth: 2, borderRadius: 50, textAlignVertical: 'center' }}
                                onPress={() => this.setState({
                                    modalVisible: true
                                })}>
                                <Icons name={"filter"} size={30} />
                            </Text>
                        </View>
                    </View>

                   <View style={{position: 'relative'}}>
                   <SearchBox handleChange={(value) => { 
                        this.setState({
                        value: value,
                        hide: false
                    }, () => {
                        //console.log(value);
                            var searchedAdresses = this.state.currentCitiesData.filter(function(item) {
                                console.log(item.address2.toLowerCase().indexOf(value.toLowerCase()));
                                return item.address2.toLowerCase().indexOf(value.toLowerCase()) > -1;
                              });
                            console.log(searchedAdresses)
                            this.setState({ 
                                searchedAdresses: searchedAdresses,
                            });
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
                                }).map(function ({ id, address1, address2, imageUrl, price, sell, rent }) {
                                    cities.push({ id, address1, address2, imageUrl, price, sell, rent })
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
                        }}>
                             
                        </SearchBox>
                        <View style={{position: 'absolute', top: 60, paddingLeft: 15, paddingRight: 15,zIndex: 999, backgroundColor: '#fff', width: "100%"}}>
                        {this.state.searchedAdresses.length > 0 ?
                                this.state.searchedAdresses.map((item) => {
                                    return (
                                      <>
                                        {this.state.hide === false ?
                                         <Text key={Math.random()} style={{paddingTop: 10,paddingBottom: 10}} onPress={() => {
                                            ///alert(item.address2)
                                            //alert(this.state.value)
                                            this.setState({
                                                value: item.address2,
                                                hide: true
                                            })
                                        }}>{item.address2}</Text>
                                        : <Text />
                                    }
                                      </>
                                    )
                                })
                                :
                                <Text />
                            }
                          </View>
                   </View>
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
                                                            titleStyle={{ color: 'yellow', fontWeight: 'bold', fontSize: 20 }}
                                                            HandleRoute={() => this.props.navigation.navigate('ImageGalary', { imageUrl: imageURL })} />
                                                    </>
                                                    :
                                                    <View style={{ width: "100%", height: 200, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#e5e5e5" }}>
                                                        <Text style={{ fontSize: 15, fontWeight: "bold", }}>{item.address2}</Text>
                                                        {item.sell === true ? <Text style={{ fontSize: 15, fontWeight: "bold", }}>{"For Sale"}</Text> : <Text />}
                                                        {item.rent === true ? <Text style={{ fontSize: 15, fontWeight: "bold", }}>{"For Rent"}</Text> : <Text />}
                                                        <View style={{ width: "40%" }}>
                                                            <Button label="Book Now" buttonAction={this.props.buttonAction} />
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
                    </View>
                </ScrollView>
                {this.state.modalVisible === true ?
                    <ScrollView>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}>
                            <View style={{ marginTop: 22, marginLeft: 20 }}>
                                <View>
                                    <View>
                                        <Text>Selcted Furnished Type:-</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <CheckBox
                                                disabled={this.state.disableunFurnished}
                                                value={this.state.unFurnished}
                                                onValueChange={() => {
                                                    this.setState({ unFurnished: !this.state.unFurnished }, () => {
                                                        if (this.state.unFurnished === true) {
                                                            this.setState({
                                                                disabledfullFurnished: true,
                                                                disabledsemiFurnished: true
                                                            })
                                                        } else {
                                                            this.setState({
                                                                disabledfullFurnished: false,
                                                                disabledsemiFurnished: false
                                                            })
                                                        }
                                                    })
                                                }}
                                            />
                                            <Text style={{ marginTop: 5, fontSize: 18 }}>Un-Furnished</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <CheckBox
                                                disabled={this.state.disabledfullFurnished}
                                                value={this.state.fullFurnished}
                                                onValueChange={() => {
                                                    this.setState({ fullFurnished: !this.state.fullFurnished }, () => {
                                                        if (this.state.fullFurnished === true) {
                                                            this.setState({
                                                                disableunFurnished: true,
                                                                disabledsemiFurnished: true
                                                            })
                                                        } else {
                                                            this.setState({
                                                                disableunFurnished: false,
                                                                disabledsemiFurnished: false
                                                            })
                                                        }
                                                    })
                                                }}
                                            />
                                            <Text style={{ marginTop: 5, fontSize: 18 }}>fullFurnished</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <CheckBox
                                                disabled={this.state.disabledsemiFurnished}
                                                value={this.state.semiFurnished}
                                                onValueChange={() => {
                                                    this.setState({ semiFurnished: !this.state.semiFurnished }, () => {
                                                        if (this.state.semiFurnished === true) {
                                                            this.setState({
                                                                disableunFurnished: true,
                                                                disabledfullFurnished: true
                                                            })
                                                        } else {
                                                            this.setState({
                                                                disabledfullFurnished: false,
                                                                disableunFurnished: false
                                                            })
                                                        }
                                                    })
                                                }}
                                            />
                                            <Text style={{ marginTop: 5, fontSize: 18 }}>semiFurnished</Text>
                                        </View>
                                    </View>
                                    <Text style={{ marginTop: 20 }}>Please select the budget.</Text>
                                    <RangeSlider
                                        style={{ width: "100%", height: 80, marginTop: -40 }}
                                        gravity={'center'}
                                        min={0}
                                        max={100000}
                                        step={1000}
                                        selectionColor="#3df"
                                        blankColor="#f618"
                                        rangeEnabled={true}
                                        textFormat={"Price " + this.state.rangeHigh}
                                        onValueChanged={(low, high, fromUser) => {
                                            //alert(high)
                                            this.setState({ rangeLow: low, rangeHigh: high })
                                        }} />
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text>select property Type:-</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <CheckBox
                                            disabled={this.state.sellDisabled}
                                            value={this.state.sell}
                                            onValueChange={() => {
                                                this.setState({ sell: !this.state.sell }, () => {
                                                    if (this.state.sell === true) {
                                                        this.setState({
                                                            disabled: true
                                                        })
                                                    } else {
                                                        this.setState({
                                                            disabled: false
                                                        })
                                                    }
                                                })
                                            }}
                                        />
                                        <Text style={{ marginTop: 5, fontSize: 18 }}>Sell</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <CheckBox
                                            value={this.state.rent}
                                            disabled={this.state.disabled}
                                            onValueChange={(event) => this.setState({ rent: !this.state.rent }, () => {
                                                if (this.state.rent === true) {
                                                    this.setState({
                                                        sellDisabled: true
                                                    })
                                                } else {
                                                    this.setState({
                                                        sellDisabled: false
                                                    })
                                                }
                                            })} />
                                        <Text style={{ marginTop: 5, fontSize: 18 }}>Rent</Text>
                                    </View>
                                    <Button label="submit" buttonAction={this.handleFilter} />
                                </View>

                            </View>
                        </Modal>
                    </ScrollView>
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
