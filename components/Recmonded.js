import React, { Component } from 'react';
import {View, ScrollView, Text, Image, Alert, Dimensions, TouchableOpacity} from 'react-native';


const width = Dimensions.get('window').width;

class Recmonded extends Component {
    render() {        
        return (
        
            <View
             style={{
                flex: 1,
                paddingTop: 20, 
                paddingHorizontal: 20,
                backgroundColor: 'white',
                }}>
              <Text
              style={{fontSize:24, 
                  fontWeight:'700', 
                  }}
              >Exiciting range of hotels</Text>
              <Text style={{
                  fontWeight:'100',
                  marginTop: 10,
              }}>A new selection of Hotel verified for Qulity and comfart</Text>
              <TouchableOpacity onPress={this.props.HandleRoute}>
              <View style={{width: width-40, height: 200, marginTop: 20}}>
                  <Image 
                  source={this.props.imagrUri}
                  
                  style={{flex: 1, width: null, 
                  height: null, resizeMode: 'cover', zIndex: 99999,
                  borderRadius: 5, borderColor: '#dddddd',
                  borderWidth: 2}} />
              </View>
          </TouchableOpacity>
          </View>
        )
    }
}

export default Recmonded;

