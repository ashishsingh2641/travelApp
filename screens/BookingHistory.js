import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView} from 'react-native';
import axios from 'axios';
import Button from '../components/Button';
import { Container, Header, Content, Card, CardItem, Body, Left, Icon } from 'native-base';


class BookingHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            flag: true
        }
        mounted: null
    }
    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            axios.get('http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/notify/getAllCustBookings')
        .then(res => {
            if (res !== undefined && res.data.length > 0) {
                this.setState({
                    data: res.data,
                })
            }else {
                this.setState({
                    data: res.data,
                    flag: false
                })
            }
        })
        .catch(err => alert('Somthing went wrong...'))
        }
    }
    componentWillUnmount() {
        this.mounted = false
    }
    render() {
        return (

            <ScrollView>
                <View style={{marginVertical: 50}}>
                {this.state.data.length > 0 ?
                    <Content>
                     {this.state.data.map((item) => {
                         //console.log(this.state.data , "Booking history")
                         return (
                         
                           <Card style={{flex: 0}}>
                             <CardItem>
                               <Left>
                                 <Body>
                                  <Text>{'Booked By: ' + item.customerId.firstName + item.customerId.lastName}</Text>
                                  <Text note>{'email: ' + item.customerId.email}</Text>
                                 </Body>
                               </Left>
                             </CardItem>
                             <CardItem>
                               <Body>
                                  <Text>{'Property Owner: ' + item.propertyId.ownerName }</Text>
                                  <Text note>{'full address: ' + item.propertyId.address1 + item.propertyId.address1}</Text>
                                  <Text note>{'Price: ' + item.propertyId.price }</Text>
                                  <View style={{flex: 1, flexDirection: 'row'}}>
                                      <View style={{width: '50%'}}>
                                          <Button label="Accept" buttonAction={() => {
                                              axios.put(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/notify/updateCustBooking/${item.id}/Confirmed`, {})
                                              .then((res) => {
                                                alert('A mail has been sent to the customer');
                                              })
                                              .catch((err) => alert('something went wrong'))

                                          }} />
                                      </View>
                                      <View style={{width: '50%'}}>
                                          <Button label="Reject" buttonAction={() => {
                                              axios.put(`http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/notify/updateCustBooking/${item.id}/Rejected`, {})
                                              .then((res) => {
                                                alert('A mail has been sent to the customer');
                                              })
                                              .catch((err) => alert('Something went wrong'))
                                          }} />
                                      </View>
                                  </View>
                               </Body>
                             </CardItem>
                           </Card>
                         )
                     })}

                    </Content>
                  : 
                    <>
                        {this.state.flag === true ? 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                            <ActivityIndicator size="large" />
                        </View>
                        : 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                            <Text>{"you have no booking yet"}</Text>
                        </View>
                        }
                    </>
                }
                </View>
            </ScrollView>
        )
    }
}

export default BookingHistory
