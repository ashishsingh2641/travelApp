import React, { Component } from 'react';
import {View, Text, TouchableOpacity,  FlatList, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Icons from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import Item from '../components/Item';
import Spinner from 'react-native-loading-spinner-overlay';
import Welcome from '../screens/Welcome';
import { NavigationActions, StackActions } from 'react-navigation';

class CurdPropertyList extends Component {
    constructor(props){
        super(props);
        this.state = {
                data: [],
                refreshing: false,
            }
        }
        componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
                () => {
                this._onRefresh();
            }
        );
       
        const resetAction = StackActions.reset({
            index: 0,
            key: Welcome,
            actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
        });

        this.props.navigation.dispatch(resetAction); 
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        axios.get('http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/getAllProperty')
            .then(res => {
                if (res !== undefined) {
                    this.setState({
                        data: res.data,
                        flag: false,
                        refreshing: false
                    })
                }
            })
        }
    render() {
          return (
           <>
               {this.state.data.length > 0 ?
                 <ScrollView
                 refreshControl={
                     <RefreshControl
                       refreshing={this.state.refreshing}
                       onRefresh={this._onRefresh}
                     />
                   }>
                
                     <View>
                      <>            
                         {this.state.data.map((item) => {
                             return (
                                 <View style={{flexDirection: 'column', }} key={item.id}>
                                     <View style={{flexDirection: 'row', borderBottomWidth: 1}}>
                                         <Item {...item} handleUpdate={() => this.props.navigation.navigate("UpdateProperty", {obj: item})}/>
                                     </View>
                                 </View>
                             )
                         })}
     
                     </>
                  </View>
                  </ScrollView>
                  : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <ActivityIndicator size="large" />
                      <Text>loading...</Text>
                  </View>
               }
           </>
        )
    }
}

export default CurdPropertyList;
