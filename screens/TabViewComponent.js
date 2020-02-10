// import React, {Component} from 'react';
// import {View, Text, StyleSheet, Dimensions} from 'react-native';
// import SprSignUp from './SprSignUp';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import BookingHistory from './BookingHistory';
// const FirstRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#2c3e50' }]} />
//   );
   
// const SecondRoute = () => (
//     <View style={[styles.scene, { backgroundColor: '#2c3e50' }]} />
// );


// class TabViewComponent extends Component {
//     state = {
//     index: 0,
//     routes: [
//       { key: 'PropertyList', title: 'Property List' },
//       { key: 'BookingHistory', title: 'Booking History' },
//     ],
//   };
 
//   render() {
//     return (
//       <TabView
//         navigationState={this.state}
//         renderScene={SceneMap({
//             PropertyList: () => {
//               return (
//                   <>
//                     {this.props.children}
//                   </>
//               )
//           },
//           BookingHistory: () => {
//               return (
//                   <BookingHistory />
//                 )
//           },
//         })}
//         onIndexChange={index => this.setState({ index })}
//         initialLayout={{ width: Dimensions.get('window').width }}
//       />
//     );
//   }
// }
 
// const styles = StyleSheet.create({
//   scene: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
// });

// export default TabViewComponent;