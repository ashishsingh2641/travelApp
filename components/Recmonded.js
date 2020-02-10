import React, { Component } from 'react';
import { View, ScrollView, Text, Alert, Dimensions, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button';
import ImageOverlay from "react-native-image-overlay";
import {Content, Card, CardItem, Container} from 'native-base';
import Icons from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('window').width;

class Recmonded extends Component {
    
    render() {
        const checkmark = '✔';
        return (
                <View style={{paddingTop: 0, paddingBottom: 10, borderWidth: 1, borderColor: '#e5e5e5',elevation: 1, margin: 10, borderTopLeftRadius: 4, borderTopRightRadius: 4,}}>
                <View style={{justifyContent: 'center', borderTopColor: '#e5e5e5', paddingTop: 0, }}>
                    <TouchableOpacity onPress={this.props.HandleRoute}>
                        <View style={{flex: 1, height: 200, width: "100%", marginBottom: 10}}>
                            <Image source={{uri:this.props.imagrUri}}  style={{width: '100%', height: null,resizeMode: "cover", borderTopLeftRadius: 4, borderTopRightRadius: 4, flex: 1}}/>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'space-between', flex: 1, alignItems: "flex-start", position: 'relative'}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{width: "49%", flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                                    <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>Locality: </Text>{this.props.title}</Text>
                                    <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>Price (In Rupees): </Text>{this.props.price}</Text>
                                    {this.props.sell === true ? <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>Property For:</Text>{' Sale'}</Text> : <Text style={{height: 0}}/>}
                                    {this.props.rent === true ? <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>Property For:</Text>{' Rent'}</Text> : <Text style={{height: 0}}/>}
                                </View>
                                <View style={{height: "100%", width: "2%", borderLeftWidth:1, marginLeft: 0, marginRight: 10}}></View>
                                <View style={{width: "49%"}}>
                                    <Text style={{fontSize: 15, }}>
                                        <Text style={{fontWeight: 'bold'}}>{"Furnishing:"}</Text>
                                        {this.props.fullFurnished === true ? <Text style={{fontSize: 15, }}>{" Full"}</Text> : <Text style={{height: 0}}/>}
                                        {this.props.unFurnished === true ? <Text style={{fontSize: 15, }}>{" Unfurnished"}</Text> : <Text style={{height: 0}}/>}
                                        {this.props.semiFurnished === true ? <Text style={{fontSize: 15, }}>{" Semi"}</Text> : <Text style={{height: 0}}/>}
                                    </Text>
                                    <Text style={{fontSize: 15, }}><Text style={{fontWeight: 'bold'}}>{"Facilities Provided:"}</Text></Text>
                                        {this.props.ac === true ? 
                                            <><Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{' AC'}</Text>
                                            <Icons name="air" size={25} />
                                            
                                        </>
                                            : <Text style={{height: 0}} />
                                        }
                                        {this.props.nonAc === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" Non-AC"}</Text> : <Text style={{height: 0}}/>}
                                        {this.props.wifi === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" Wifi"}</Text> : <Text style={{height: 0}}/>}
                                        {this.props.parking === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" Parking"}</Text> : <Text style={{height: 0}}/>}
                                        {this.props.lift === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" Lift"}</Text> : <Text style={{height: 0}}/>}
                                        {this.props.tv === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" TV"}</Text> : <Text style={{height: 0}}/>}
                                        {this.props.powerBackUp === true ? <Text style={{fontSize: 15, }}><Text>{checkmark}</Text>{" PowerBackup"}</Text> : <Text style={{height: 0}}/>}
                                    
                                </View>
                            </View>
                    </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: "50%"}}>
                        <Button label="Book Now" buttonAction={this.props.buttonAction} />
                    </View>
                </View>
                </View>
        )
    }
}

export default Recmonded;

