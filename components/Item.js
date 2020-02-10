import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { DrawerItems } from 'react-navigation-drawer';
import Icons from 'react-native-vector-icons/AntDesign';
import Overlay from 'react-native-modal-overlay';
import  Button  from '../components/Button';
import Swipeout from 'react-native-swipeout';

class Item extends Component {
    constructor(props) {
    super(props);
        this.state = {
            modalVisible: false, 
            address1: props.address1,
            showView: false
        }
    }
    deleteItem = () => this.setState({showView: true}, () => {
        axios.delete(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/property/deletePropertyById/${this.props.id}`).then(res => {
            alert('Property has deleted successfully ');
            console.log(res)
        })
    })
    render () {
        const props = this.props;
        //deletePropertyById/${props.id}
        return (
            <>
            {this.state.showView === false ?
                <>
                <View id={props.id} style={{width: "20%", alignItems: "center", flex: 1, justifyContent: "center", position: 'relative'}}>
                    <Text style={{padding: 5, backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold',
                    width: 50, height: 50, borderRadius: 50, position: 'absolute', top: 30, textAlign: 'center', textAlignVertical: 'center'}}>
                        {props.ownerName.charAt(0)}
                    </Text>
                </View>
                <View style={{width: "50%", paddingTop: 30}}>
                    <Text>{"Address line 1: " + props.address1}</Text>
                    <Text>{"Address line 2: " + props.address2}</Text>
                    <Text>{"Price: " + props.price}</Text>
                    <Text>{"For sell: " + props.sell === 1 ? true : false}</Text>
                    <Text>{"For Rent: " + props.rent === 1 ? true : false}</Text>
                    <Text>{"Property Description: " + props.desription === undefined ? '' : props.description}</Text>
                </View>
                <View style={{width: "30%", alignItems: "center", flex: 1, justifyContent: "center"}}>
                    <TouchableOpacity style={{paddingTop: 10, paddingBottom: 10}} onPress={props.handleUpdate}>
                        <Icons name="edit" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.deleteItem}>
                        <Icons name="delete" size={30} />
                    </TouchableOpacity>
                </View>
                
                </>
                : <View />}
            </>
            )
    }
}
export default Item;