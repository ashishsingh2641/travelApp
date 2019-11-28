import {SIGN_UP_DATA, SIGN_UP_SUCCESS} from '../types/types';

const initialState = {
    role: '',
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    phnNumber: '',
    sucessMessage: ''
}
const signUpReducer = (state = initialState, action) =>  {
    debugger;
    switch(action.type) {
        case SIGN_UP_DATA:
            return Object.assign({}, state,  
           {
            role: action.data.role,
            firstName: action.data.firstName, 
            lastName: action.data.lastName, 
            email: action.data.email, 
            password: action.data.password, 
            phnNumber: ''
        });
        case SIGN_UP_SUCCESS: 
            return Object.assign({}, state, {sucessMessage: action.data})
        default:
            return state;
    }
    
}

export default signUpReducer;
