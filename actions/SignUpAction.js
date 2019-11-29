import axios from "axios";

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_PENDING = "SIGN_UP_PENDING";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";

export const Signup = (_data, pagePath) => {
    debugger;
    return (dispatch) => {
        dispatch(signUpPending(true));
        dispatch(signUpSuccess(false));
        dispatch(signUpError(null));
        axios.post('http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/user/register ', {
            role: _data.role,
            firstName: _data.firstName,
            lastName: _data.lastName,
            email: _data.email,
            password: _data.password,
            phnNumber: _data.phnNumber
        }).then(res => {
            if(res !== undefined){
                dispatch(signUpSuccess(true))
                dispatch(signUpPending(false))
                return pagePath()                
            }
        }).catch(err => {
            dispatch(signUpError(err));
            console.log(err)
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

