import {SET_TEXT} from '../actions/welcomeAction';

const initialState = {
    text: '',
}

const WelcomeReducers = (state = initialState, action = {}) => {
    switch(action.type) {
        case SET_TEXT:
        return { ...state, text: action.payload.data }

        default:
        return state;
    }

}

export default WelcomeReducers