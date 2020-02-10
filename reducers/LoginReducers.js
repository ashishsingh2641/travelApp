import {LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_PENDING} from '../actions/LoginAction';

const initialState = {
    isSuccess: false,
    isPending: false,
    isError: null,
    email: '',
    phnNumber: '',
    password: ''
}
const loginReducer = (state = initialState, action) =>  {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state,  
           {
            isSuccess: action.isSuccess,
            email: action.email
            }
        );
        case LOGIN_PENDING: 
            return Object.assign({}, state, {isPending: action.isPending})

        case LOGIN_ERROR: 
            return Object.assign({}, state, {isError: action.isError})
        default:
            return state;
    }
    
}

export default loginReducer;
