import React from 'react';
import {connect} from 'react-redux';
import { TouchableOpacity,Alert, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from 'react-navigation-stack';
import EditProfile from '../screens/EditProfile';
import ProfileInfo from '../screens/ProfileInfo';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SprSignUp from '../screens/SprSignUp';
import Explore from '../screens/Explore';
import Role from '../screens/Role';
import HeaderLeft from '../screens/HeaderLeft';
import AddProperty from '../screens/AddProperty';
import ForgotPassword from '../screens/ForgotPassword';
import Admin from '../screens/Admin';
import ImageGalary from '../screens/ImageGalary';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import UpdateProperty from '../screens/UpdateProperty';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropertyList from '../screens/PropertyList';
import BookingHistory from '../screens/BookingHistory';
import CurdPropertyList from '../screens/CurdPropertyList';
let user;
AsyncStorage.getItem("userName").then((value) => {
    if (value !== null) {
        user = value
    }
})
export const Provider = createStackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions :{
            header: null,
        }
    },
    PropertyList: {
        screen: PropertyList,
        navigationOptions: {
            header: null,
            headerLeft: null,
            gesturesEnabled: false,
        }
    },AddProperty: {
        screen: AddProperty,
        navigationOptions :{
            header: null,
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null
        }
    },
    ProfileInfo: {
        screen: ProfileInfo,
        navigationOptions: {
            header: null
        }
    }
},{
    initialRouteName: 'Welcome',
    headerMode: 'none',
});
  
export const Customer = createStackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions :{
            header: null,
        }
    },
    Explore: {
        screen: Explore,
        navigationOptions :{
            header: null,
        }
    },
    ImageGalary: {
        screen: ImageGalary,
        navigationOptions :{
            header: null,
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null
        }
    },
    ProfileInfo: {
        screen: ProfileInfo,
        navigationOptions: {
            header: null
        }
    }
},{
        initialRouteName: 'Welcome',
        headerMode: 'screen',
    }
);

export const MyAdmin = createStackNavigator({
        Welcome: {
            screen: Welcome,
            navigationOptions :{
                header: null,
            }
        },
        
        Admin: {
            screen: Admin,
            navigationOptions :{
                header: null,
            }
        },
        EditProfile: {
            screen: EditProfile,
            navigationOptions: {
                header: null
            }
        },
        ProfileInfo: {
            screen: ProfileInfo,
            navigationOptions: {
                header: null
            }
        },
        BookingHistory: {
            screen: BookingHistory,
            navigationOptions :{
                header: null,
            }
        },
        CurdPropertyList: {
            screen: CurdPropertyList,
            navigationOptions :{
                header: null,
            }
        },
        UpdateProperty: {
            screen: UpdateProperty,
            navigationOptions :{
                header: null,
            }
        },
    }, {
        initialRouteName: 'Welcome',
        headerMode: 'screen',
    }
);

const AppSwitchNavigator = createStackNavigator({
        Welcome: {
            screen: Welcome,
            navigationOptions :{
                header: null,
            }
        },
        Explore: {
            screen: Explore,
            navigationOptions: ({navigation}) => {
                return {
                    headerRight: () =>  {
                        if(user !== null && user !== undefined) {
                        
                            //alert(user)
                        return (
                               <HeaderLeft handleEditProfile={() => navigation.navigate('ProfileInfo')}
                                    user={user.charAt(0)}
                               >
                               </HeaderLeft> 
                            )
                          } else {
                            return <Icons size={32} name="account" onPress={() => navigation.navigate('ProfileInfo')} />
                          }
                      }
                }
            }
        },
        Role: {
            screen: Role
        },
        SprSignUp: { 
            screen : SprSignUp,
            navigationOptions :{
                header: null,
            }
        },
        Login: { 
            screen: Login,
            navigationOptions :{
                header: null,
            }
        },
        ForgotPassword: {
            screen: ForgotPassword,
            navigationOptions: ({navigation}) => {
                return {
                    headerRight: () =>  {
                        if(user !== null && user !== undefined) {
                            //alert(user)
                        return (
                            <HeaderLeft handleEditProfile={() => navigation.navigate('ProfileInfo')}
                                    user={user.charAt(0)}
                            >
                            </HeaderLeft> 
                            )
                          } else {
                            return <Icons size={32} name="account" onPress={() => navigation.navigate('ProfileInfo')}/>
                          }
                      }
                }
            }
       },
        Customer: {
            screen: Customer,
            navigationOptions: ({navigation}) => {
                return {
                    headerRight: () =>  {
                    
                        if(user !== null && user !== undefined) {
                            //alert(user)
                        return (
                            <HeaderLeft handleEditProfile={() => navigation.navigate('ProfileInfo')}
                            user={user.charAt(0)}
                       >
                       </HeaderLeft> 
                            )
                          } else {
                            return <Icons size={32} name="account" onPress={() => navigation.navigate('ProfileInfo')}/>
                          }
                      }
                }
            } 
        },
        Provider: {
            screen: Provider,
            navigationOptions: ({navigation}) => {
            
                return {
                    headerRight: () =>  {
                        if(user !== null && user !== undefined) {
                            //alert(user)
                        return (
                            <HeaderLeft handleEditProfile={() => navigation.navigate('ProfileInfo')}
                            user={user.charAt(0)}
                       >
                       </HeaderLeft> 
                            )
                          } else {
                            return <Icons size={32} name="account" onPress={() => navigation.navigate('ProfileInfo')}/>
                          }
                      }
                }
            } 
        },
        MyAdmin: {
            screen: MyAdmin,
            navigationOptions: ({navigation}) => {
            
                return {
                    headerRight: () =>  {
                        if(user !== null && user !== undefined) {
                        return (
                            <HeaderLeft handleEditProfile={() => navigation.navigate('ProfileInfo')}
                            user={user.charAt(0)}
                       >
                       </HeaderLeft> 
                            )
                          } else {
                            return <Icons size={32} name="account" onPress={() => navigation.navigate('ProfileInfo')}/>
                          }
                      }
                }
            } 
        }
    },     {
        initialRouteName: 'Welcome',
        defaultNavigationOptions: (navigation) => {
            return {
                headerStyle: {
                    backgroundColor: '#fff',
                  },
                  headerTintColor: '#2c3e50',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
            }
        },
        lazy: true   
    }
);

const mapStateToProps = (state) => {
    console.log(state.sinupdata.firstName, "navigation component")
    return {}
}

export default connect(mapStateToProps)(createAppContainer(AppSwitchNavigator));

// const Customer = createStackNavigator({
//     Welcome: {
//         screen: Welcome,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Explore: {
//         screen: Explore, navigationOptions: {
//             header: null,
//         }
//     },
//     Login: {
//         screen: Login, navigationOptions: {
//             header: null,
//         }
//     },
//     AddProperty: {
//         screen: AddProperty, navigationOptions: {
//             header: null,
//         }
//     },
//     ForgotPassword: {
//         screen: ForgotPassword,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     ImageGalary: {
//         screen: ImageGalary,
//     },
//     UpdateProperty: {
//         screen:UpdateProperty
//     }

// });

// const Provider = createStackNavigator({
//     Role: {
//         screen: Role, navigationOptions: {
//             header: null,
//         }
//     },
//     SprSignUp: {
//         screen: SprSignUp, navigationOptions: {
//             header: null,
//         }
//     },
//     Login: {
//         screen: Login, navigationOptions: {
//             header: null,
//         }
//     },
//     Admin: { screen: Admin },
//     Explore: {
//         screen: Explore, navigationOptions: {
//             header: null,
//         }
//     },
//     AddProperty: {
//         screen: AddProperty, navigationOptions: {
//             header: null,
//         }
//     },
//     ForgotPassword: {
//         screen: ForgotPassword,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     ImageGalary: {
//         screen: ImageGalary,
//     },
//     UpdateProperty: {
//         screen: UpdateProperty
//     }
// }, );
// export default createAppContainer(createBottomTabNavigator(
//     {
//         Customer: { screen: Customer },
//         Provider: { screen: Provider }
//     }, {
//     defaultNavigationOptions: ({ navigation }) => ({
//         tabBarIcon: ({ focused, tintColor }) => {
//             const { routeName } = navigation.state;
//             let iconName;
//             if (routeName === 'Customer') {
//                 iconName = `google-circles`;
//             } else if (routeName === 'Provider') {
//                 iconName = `sign-direction`;
//             }
//             // You can return any component that you like here! We usually use an
//             // icon component from react-native-vector-icons
//             return <Icons name={iconName} size={25} color={tintColor} />;
//         },
//     }),
//     tabBarOptions: {
//         activeTintColor: '#5691c8',
//         inactiveTintColor: '#999999',
//     },
// }
// ));
