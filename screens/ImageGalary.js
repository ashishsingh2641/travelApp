import React from 'react';
import {View, Text, ImageBackgroundComponent} from 'react-native';
import Gallery from 'react-native-image-gallery';

class ImageGalary extends React.Component {
    render () {
        const imageArr = this.props.navigation.getParam('imageUrl');
        //console.log(typeof imageArr)
        const imageData = [];
        for (let i = 0; i <= imageArr.length; i++) {
            if (imageArr[i] !== undefined) {
               //console.log(imageArr[i].data)
                imageData.push({ source: { uri: `data:image/png;base64,${imageArr[i].data}` } })
            }
        }
        console.log(imageData);
        return (
    <Gallery
        style={{ flex: 1, backgroundColor: '#2c3e50' }}
        images={imageData}
      />
        )
    }
}

export default ImageGalary;

