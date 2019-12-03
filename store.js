
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import WelcomeReducers from './reducers/WelcomeReducers';
import signUpReducers from './reducers/SignUpReducers';
import loginReducer from './reducers/LoginReducers';


const rootReducer = combineReducers({
    welcomeData: WelcomeReducers,
    sinupdata: signUpReducers,
    loginData: loginReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store;