import React from 'react';
import {Image, TouchableOpacity,Alert} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Explore from '../screens/Explore';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppDrawNavigator = createDrawerNavigator(
    {
        Login: {
            screen: Login,
           
        },
        Signup: {
            screen: Signup,
            
        }
    }
);
const AppNavigator = createStackNavigator(
    { 
        Welcome: {
            screen: Welcome,
            navigationOptions: {
                header: null
            }
        },
        AppDrawNavigator: {
            screen: AppDrawNavigator,
        },

        Explore: {
            screen: Explore,
            navigationOptions: {
                header: null
            }
        },
    },{
        defaultNavigationOptions: ({navigation}) => {
            return {
                headerStyle: {
                    backgroundColor: '#186057',
                    
                },
                headerLeft: (
                    <Icons style={{paddingLeft: 10, color: 'white'}} 
                        onPress={() => navigation.openDrawer()}    
                    name="menu" size={30} />
                )
            }
        }
    },
    {
        initialRouteName: 'Welcome',
    }
)
// const screens = createSwitchNavigator(
//     {
       
//         Explore: {
//             screen: AppNavigator,
//         }
//     }, 
// );


export default createAppContainer(AppNavigator);
