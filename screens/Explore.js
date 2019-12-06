import React, {Component} from 'react';
import {Image, StyleSheet, ScrollView, View, Text,Platform, StatusBar} from 'react-native';
import CardComponent from '../components/CardComponent';
import SearchBox from '../components/SearchBox';
import Recmonded from '../components/Recmonded';
//import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';


class Explore extends Component {
    UNSAFE_componentWillMount() {
        this.startHeaderHeight = 80;
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }
    render() {
    return (
      <View >
        <SearchBox />
           <ScrollView
            scrollEventThrottle={16}>
               <View style={styles.wrapper}>
                <Text style={styles.username}>
                    What can we help you find ? username
                </Text>
               </View>
               <View style={{ height: 130, marginTop: 20}}>
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
                style={{position: 'absolute', right: 10, textAlign: 'center', elevation: 5,
                    width: 50, height: 50, bottom: 150, zIndex: 999, borderRadius: 50,
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
