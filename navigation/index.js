import React from 'react';
// import {Image, TouchableOpacity,Alert} from 'react-native';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SprSignUp from '../screens/SprSignUp';
import Explore from '../screens/Explore';
import Role from '../screens/Role';
import AddProperty from '../screens/AddProperty';
import ForgotPassword from '../screens/ForgotPassword';
import TabViewComponent from '../screens/TabViewComponent';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

// const AppDrawerNavigation = createDrawerNavigator({
//     Role: {
//         screen: Role,
//         navigationOptions: {
//             drawerLabel: '',
//         }
//     },
//     Login: {
//         screen: Login
//     },
//     SprSignUp: {
//         screen: SprSignUp
//     },
//     Explore: {
//         screen: Explore
//     }
// });

// const AppSwitchNavigator = createSwitchNavigator({
//     Welcome: {
//        screen: Welcome
//     },
//     AppDrawerNavigation: {
//         screen: AppDrawerNavigation
//     }
// })
const ExploreScreen = createStackNavigator({
    Welcome: { 
            screen: Welcome, 
            navigationOptions: {
                header: null,
            } 
        },
    Explore: { screen: Explore, navigationOptions: {
      header: null,
  }  },
    Login: {screen: Login, navigationOptions: {
      header: null,
  } },
    AddProperty: {screen: AddProperty},
    ForgotPassword: {screen: ForgotPassword,
      TabViewComponent: {screen: TabViewComponent},}
  });
  
  const RegisterScreen = createStackNavigator({
    Role: { screen: Role,  navigationOptions: {
            header: null,
        } 
    },
    SprSignUp: { screen: SprSignUp,
      TabViewComponent: {screen: TabViewComponent}, },
    Login: {screen: Login,
      TabViewComponent: {screen: TabViewComponent},},
    Explore: {screen: Explore,
      TabViewComponent: {screen: TabViewComponent},},
    AddProperty: {screen: AddProperty,
      TabViewComponent: {screen: TabViewComponent},},
    ForgotPassword: {screen: ForgotPassword,
      TabViewComponent: {screen: TabViewComponent},}
  }, {headerMode: 'screen'});
export default createAppContainer(createBottomTabNavigator(
    {
        Explore: { screen: ExploreScreen },
        Register: { screen: RegisterScreen },
        AddProperty: {screen: AddProperty}
    },{
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Explore') {
              iconName = `google-circles`;
            } else if (routeName === 'Register') {
              iconName = `sign-direction`;
            } else if (routeName === 'AddProperty') {
              iconName = `home-circle`
            }
    
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Icons name={iconName} size={25} color={tintColor} />;
          },
        }),
        tabBarOptions: {
          activeTintColor: '#5691c8',
          inactiveTintColor: '#999999',
        },
      }
    ));
