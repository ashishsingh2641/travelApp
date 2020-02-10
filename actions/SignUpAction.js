import axios from "axios";

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_PENDING = "SIGN_UP_PENDING";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";

export const Signup = (_data, pagePath) => {
    return (dispatch) => {
        dispatch(signUpPending(true));
        dispatch(signUpSuccess(false));
        dispatch(signUpError(null));
            axios.post('http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/user/register', {
            role: _data.role,
            firstName: _data.firstName,
            lastName: _data.lastName,
            email: _data.email,
            password: _data.password,
            phnNumber: _data.phnNumber,
            address: _data.address,
            gender: _data.gender,
            dob: _data.dob
        }).then(res => {
            console.log(res, "::::::::::::::");
            if(res !== undefined){
                //Auth.saveKey("id_token", res.data.jwt);
                dispatch(signUpSuccess(true))
                dispatch(signUpPending(false));
                return pagePath()                
            }
        }).catch(err => {
            dispatch(signUpError(err));
                console.log(err.response);
                if (err) {
                    if(err.response.status === 403) {
                        alert(err.response.headers.user.replace(/^"(.*)"$/, '$1'));
                        dispatch(signUpPending(false));
                    }else if(err.response.status === 500) {
                        alert('somthing went wrong....');
                        dispatch(signUpPending(false));
                    }
                }
                else {
                    alert('please check your internet connection....');
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

