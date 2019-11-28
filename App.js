import React from 'react';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import store from './store';

class App extends React.Component {


    render() {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        )
    }
}

export default App;
