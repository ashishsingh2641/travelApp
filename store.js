
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import WelcomeReducers from './reducers/WelcomeReducers';
import signUpReducers from './reducers/SignUpReducers';


const rootReducer = combineReducers({
    welcomeData: WelcomeReducers,
    sinupdata: signUpReducers
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store;