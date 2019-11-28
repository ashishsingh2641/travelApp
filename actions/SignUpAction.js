import axios from "axios";

import {SIGN_UP_DATA, SIGN_UP_SUCCESS} from '../types/types';


export const handleSignUp = (_data) => {
    debugger;
    return (dispatch) => {
        debugger;
        axios.post('http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/user/register ', {
            role: _data.role,
            firstName: _data.firstName,
            lastName: _data.lastName,
            email: _data.email,
            password: _data.password,
            phnNumber: _data.phnNumber
        }).then(res => {
            if(res !== undefined){
                dispatch(signUpSuccess("signUpsuccess"))
            }

        }).catch(err => console.log(err))
    }
}

export function signUpData(data) {
    return {
        type: SIGN_UP_DATA,
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phnNumber: data.phnNumber
    }
}

export function signUpSuccess(data) {
    return {
        type: SIGN_UP_SUCCESS,
        data: data
    }
}

