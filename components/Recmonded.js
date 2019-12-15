import React, { Component } from 'react';
import {View, ScrollView, Text, Image, Alert, Dimensions, TouchableOpacity} from 'react-native';


const width = Dimensions.get('window').width;

class Recmonded extends Component {
    render() {        
        return (
            <View>
              <TouchableOpacity onPress={this.props.HandleRoute}>
              <View style={{width: width-40, height: 300, elevation: 2,
                marginTop: 10, padding: 20, borderColor: 'transparent', borderWidth: 2, borderRadius: 5}}>
                  <Image 
                  source={{uri: this.props.imagrUri}}
                  style={{flex: 1, width: null, justifyContent: 'center',
                  height: null, resizeMode: 'cover', zIndex: 99999,}} />
              </View>
          </TouchableOpacity>
          </View>
        )
    }
}

export default Recmonded;

