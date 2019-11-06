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

const AppDrawerNavigation = createDrawerNavigator({
    Welcome: {
        screen: Welcome
    },
    Login: {
        screen: Login
    },
    Signup: {
        screen: Signup
    },
    Explore: {
        screen: Explore
    }
})

export default createAppContainer(AppDrawerNavigation);
