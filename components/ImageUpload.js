import React from 'react'
import { View, Text, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Button from './Button';

export default class ImageUpload extends React.Component {
  state = {
    photo: null,
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button buttonAction={this.handleChoosePhoto} label="Choose Photo" />
      </View>
    )
  }
}