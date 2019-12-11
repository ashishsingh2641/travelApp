import React, {Component} from 'react';
import {Image, StyleSheet, ScrollView, View, Text,Platform, StatusBar, Picker, Dimensions} from 'react-native';
// import {Spinner} from 'native-base';
import CardComponent from '../components/CardComponent';
import SearchBox from '../components/SearchBox';
import Recmonded from '../components/Recmonded';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
//import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

var { width, height } = Dimensions.get('window');

class  Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: '',
            cities: [],
            currentCitiesData: [],
            isLoading: false,
            spinner: false
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
        .then(res =>this.setState({
                cities: res.data,
                spinner: true},() => {
            axios.get(`http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty/${res.data[0]}`)
            .then(newRes => this.setState({
                currentCitiesData: newRes.data,
                spinner: false
            }))
            .catch(err => console.log(err))
        }))
        .catch(err => alert(JSON.stringify(err)))
    }
    render() {
    return (
      <View style={{flex: 1, position: 'relative',}}>
          <ScrollView
            scrollEventThrottle={16}>
        <Picker 
            selectedValue={this.state.selectedItem}
            style={{ height: 50, width: "100%", border: 1, borderColor: "black" }}
            onValueChange={(itemValue, itemIndex) => {
                this.setState({ selectedItem: itemValue,
                    }, ()=> {

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
        <SearchBox />
        <View>
            {this.state.currentCitiesData.length <= 0 ? 
                <View >
                    <Spinner  
                        visible={this.state.spinner}
                        textContent={'Loading your items...'} />
                </View> 
                : 
                <>
                    {this.state.currentCitiesData.map((item) => {
                const imageURL = `data:image/png;base64,${item.imageUrl}`
                return (
                        <View key={item.id} style={{marginLeft: 20, marginRight: 20}}>
                            <Text style={{fontSize: 20}}>{item.address1}</Text>
                            <Text>{item.address2}</Text>
                            <Image source={{uri: imageURL}} style={{ width: "100%", height: 300 }} /> 
                        </View>
                        )
                    })}
                </>
            }
        </View>
           
               <View style={styles.wrapper}>
                <Text style={styles.username}>
                    What can we help you find ? username
                </Text>
               </View>
               {/* <View style={{ height: 130, marginTop: 20}}>
                   <ScrollView horizontal={true}
                   showsHorizontalScrollIndicator={false}>
                        <CardComponent addImage={require('../assets/hotel1.jpg')} />
                        <CardComponent addImage={require('../assets/hotel2.jpg')} />
                        <CardComponent addImage={require('../assets/hotel3.jpg')} />
                        <CardComponent addImage={require('../assets/Hotel4.jpg')} />
                    </ScrollView>
            </View>
                <View style={{flex: 1, height: '100%', marginBottom: 150}}>
                    <Recmonded imagrUri={require('../assets/man.jpg')}
                    HandleRoute={() => {this.props.navigation.navigate("Signup")}}/>
                    <Recmonded HandleRoute={() => {this.props.navigation.navigate("Signup")}}
                    imagrUri={require('../assets/hotel1.jpg')}/>
                    <Recmonded imagrUri={require('../assets/hotel2.jpg')}/>
                    <Recmonded imagrUri={require('../assets/hotel3.jpg')}/>
                    <Recmonded imagrUri={require('../assets/Hotel4.jpg')}/>
                </View> */}
           </ScrollView>
           <View 
            style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    position: 'relative',
                    marginTop: 40
                }}>
                <Text onPress={() => this.props.navigation.navigate("Login")} 
                style={{position: 'absolute', right: 10, textAlign: 'center', elevation: 5,
                    width: 50, height: 50, bottom: 50, zIndex: 999, borderRadius: 50,
                    fontSize: 35, backgroundColor: '#2c3e50', color: 'white'}}>+</Text>
            </View>
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
        fontSize:24, 
        fontWeight:'700', 
        paddingHorizontal: 20
    }
});

export default Explore;
