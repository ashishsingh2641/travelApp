import React, {Component} from 'react';
import {ImageBackground} from'react-native';
import { Container, Card, CardItem, Text, Body } from 'native-base';

class CardComponent extends Component {
    render () {
        return (
            <Container>
             {this.props.CardType !== 'overlay' ? 
               <Card style={{height: 200,}}>
               <ImageBackground source={require('../assets/pexels-photo-2785523.jpeg')} 
               style={{flex: 1, width: '100%', height: '100%', position: 'relative', justifyContent: "center", alignItems: 'center'}}>
                   <Text style={{position: 'absolute', top:0, left:0, right: 0, bottom: 0, backgroundColor: 'black', opacity: .3}} />
 
                   <Text style={{color: "white", fontSize: 30}}>Inside</Text>
               </ImageBackground>
               </Card>
               : <Text>Not a card.............</Text> 
            }
          </Container>
        )
    }
}

export default CardComponent;
