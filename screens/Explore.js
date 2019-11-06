import React, {Component} from 'react';
import {Image, StyleSheet, ActivityIndicator, View} from 'react-native';
import CardComponent from '../components/CardComponent';

import { Container, Content, Input, Item, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
           undeline: true,
            initialArr: [],
            flag: false
        }
        this.handleBorderColor2 = this.handleBorderColor2.bind(this);
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                flag: true,
                initialArr: [{
                    id: 1,
                    color: "blue",
                    text: "text1"
                  },
                  {
                    id: 2,
                    color: "red",
                    text: "text2"
                  }]
            });
        }, 4000)
    }
    handleBorderColor2 = () => {
        this.setState({
            borderBottomColor: '#186057'
        })
    }
  render() {
      const comp = this.state.initialArr.map((item) => {
        return (
        <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require('../assets/icon.png')} />
            <Body>
              <Text>{item.id}</Text>
              <Text note>{item.text}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={require('../assets/pexels-photo-2785523.jpeg')} style={{height: 200, width: '100%', flex: 1}}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Right>
            <Text>1h ago</Text>
          </Right>
        </CardItem>
      </Card>
        )
      })
    return (
      <Container>
        <View style={styles.SearchLayout}>
            <Item style={{ width: '90%',
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center', 
        borderBottomColor: this.state.borderBottomColor}}  >
                <Icon name="search" style= {{color: '#186057'}}/>
                <Input placeholder="Search" placeholderTextColor = "#e5e5e5" 
               onPress={this.handleBorderColor2}
                style={{
                    color: '#186057', 
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    borderBottomColor:  this.state.borderBottomColor
                }} />
            </Item>
            <Icon name="bookmark" style={styles.bookmarks}/>
        </View>
        {this.state.flag === true ?
            <Content>
            {comp}
            <CardComponent />
          </Content> :  
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>loading your app.......</Text>
          </>
        }
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    SearchLayout: {
        width: '100%', 
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center', 
        marginBottom: 20
    },
    bookmarks: {
        position: 'absolute',
        right: 10,
        opacity: .7,
        color: '#186057',
    }
})
  export default Explore;
