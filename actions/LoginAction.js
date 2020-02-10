import axios from 'axios';
const jwtDecode = require('jwt-decode');
import AsyncStorage from '@react-native-community/async-storage';
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_ERROR = "LOGIN_ERROR";


export const loginAction = (_data, pagePath, newPagepath, adminPage) => {
    return (dispatch) => {
        dispatch(loginPending(true));
        dispatch(loginSuccess(false));
        dispatch(loginError(null));
        const appconfig = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }
        axios.post('http://Travelapp-env.edp3rfnzwe.ap-south-1.elasticbeanstalk.com/api/user/login', {
            password: _data.password,
            email: _data.email
        }, appconfig).then(res => {
           // console.log(res, ":res")
            if(res !== undefined){
                dispatch(loginSuccess(true, _data.email))
                dispatch(loginPending(false));
                let decoded = jwtDecode(res.data);
                AsyncStorage.setItem('userName',decoded.sub);  
                if (decoded.auth.authority === "ServiceProvider") {
                    return pagePath();
                }
                else if (decoded.auth.authority === 'ServiceConsumer') {
                    return newPagepath();
                }else if (decoded.auth.authority === 'admin') {
                    return adminPage();
                }

            }
        }).catch(err => {
            if (err.response.status === 422) {
                dispatch(loginError(err));
                dispatch(loginPending(false))
                alert("Invalid Username / Password")
            }else {
                    console.log(err)
                    dispatch(loginError(err));
                    dispatch(loginPending(false))
                    alert("somthing went wrong....")
                
            }
           
        })
    }
}

export function loginSuccess(isSuccess, email) {
    return {
        type: LOGIN_SUCCESS,
        isSuccess,
        email
    }
}

export function loginPending(isPending) {
    return {
        type: LOGIN_PENDING,
        isPending
    }
}

export function loginError(isError) {
    return {
        type: LOGIN_ERROR,
        isError
    }
}
