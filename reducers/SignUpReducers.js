import {SIGN_UP_SUCCESS, SIGN_UP_ERROR, SIGN_UP_PENDING} from '../actions/SignUpAction';

const initialState = {
    isSuccess: false,
    isPending: false,
    isError: null
}
const signUpReducer = (state = initialState, action) =>  {
    debugger;
    switch(action.type) {
        case SIGN_UP_SUCCESS:
            return Object.assign({}, state,  
           {
            isSuccess: action.isSuccess
            }
        );
        case SIGN_UP_PENDING: 
            return Object.assign({}, state, {isPending: action.isPending})

        case SIGN_UP_ERROR: 
            return Object.assign({}, state, {isError: action.isError})
        default:
            return state;
    }
    
}

export default signUpReducer;
