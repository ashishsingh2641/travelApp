import { createAppContainer } from 'react-navigation';
import { createStackNavigator,Stac  } from 'react-navigation-stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const screens = createStackNavigator(
    {
        Welcome: {
            screen: Welcome,
            navigationOptions: {
                header: null
            }
        },
        Login,
        Signup
    }, {
        initialRouteName: 'Welcome',
        
    }
);

export default createAppContainer(screens);
