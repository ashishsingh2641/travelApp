import React from 'react';
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
        AppDrawNavigator,
        Explore: {
            screen: Explore,
            navigationOptions: {
                header: null
            }
        },
    },{
        defaultNavigationOptions: ({navigation}) => {
            return {
                headerLeft: (
                    <Icons style={{paddingLeft: 10}} 
                        onPress={() => navigation.openDrawer()}    
                    name="menu" size={30} />
                )
            }
        }
    }
)
const screens = createSwitchNavigator(
    {
        Welcome: {
            screen: Welcome
        },
        Explore: {
            screen: AppNavigator,
        }
    }, {
        initialRouteName: 'Welcome',
    }
);


export default createAppContainer(screens);
