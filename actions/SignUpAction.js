import axios from "axios";
import Auth from '../auth/auth';

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_PENDING = "SIGN_UP_PENDING";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";

export const Signup = (_data, pagePath) => {
    debugger;
    return (dispatch) => {
        dispatch(signUpPending(true));
        dispatch(signUpSuccess(false));
        dispatch(signUpError(null));
        //Auth.saveItem("role", _data['role'])
        axios.post('http://192.168.0.103:5000/api/user/register', {
            role: _data.role,
            firstName: _data.firstName,
            lastName: _data.lastName,
            email: _data.email,
            password: _data.password,
            phnNumber: _data.phnNumber
        }).then(res => {
            console.log(res, "::::::::::::::");
            if(res !== undefined){
                //Auth.saveKey("id_token", res.data.jwt);
                dispatch(signUpSuccess(true))
                dispatch(signUpPending(false));
                return pagePath()                
            }
        }).catch(err => {
            debugger;
            dispatch(signUpError(err));
                if(err.response.status === 403) {
                    alert(err.response.headers.user.replace(/^"(.*)"$/, '$1'));
                    dispatch(signUpPending(false));
                }else if(err.response.status === 500) {
                    alert('there is some issue with the network.....');
                    dispatch(signUpPending(false));
                }
        })
    }
}

export function signUpSuccess(isSuccess) {
    return {
        type: SIGN_UP_SUCCESS,
        isSuccess
    }
}

export function signUpPending(isPending) {
    return {
        type: SIGN_UP_PENDING,
        isPending
    }
}

export function signUpError(isError) {
    return {
        type: SIGN_UP_ERROR,
        isError
    }
}

