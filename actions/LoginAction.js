import axios from 'axios';
const jwtDecode = require('jwt-decode');
import Auth from '../auth/auth';
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_ERROR = "LOGIN_ERROR";


export const loginAction = (_data, pagePath, newPagepath) => {
    debugger;
    return (dispatch) => {
        dispatch(loginPending(true));
        dispatch(loginSuccess(false));
        dispatch(loginError(null));
       // Auth.saveItem("role", _data['role']);

       //axios.get("https://localhost:5000/api/user/getAllUsers").then(res => alert(JSON.stringify(res))).catch(err => console.log(err))
        axios.post('http://192.168.0.103:5000/api/user/login', {
            // role: _data.role,
            // firstName: _data.firstName,
            // lastName: _data.lastName,
            // email: _data.email,
            password: _data.password,
            email: _data.email
        }).then(res => {
            if(res !== undefined){
                //Auth.saveKey("id_token", response.data.jwt);
                //this.props.newJWT(response.data.jwt);;
                //console.log(res, ":::::::::::::")
                dispatch(loginSuccess(true))
                dispatch(loginPending(false));
                //alert(res.data.role)
                let decoded = jwtDecode(res.data);
                    console.log(decoded, ":::::::::::::::::");
                    alert(decoded.auth.authority);
                debugger
                if (decoded.auth.authority === "ServiceProvider") {
                    debugger;
                    return pagePath();
                }
                else if (decoded.auth.authority === 'ServiceConsumer') {
                    return newPagepath();
                }

            }
        }).catch(err => {
           // debugger;
            alert(JSON.stringify(err))
            dispatch(loginError(err));
            dispatch(loginPending(false))
            console.log(err)
        })
    }
}

export function loginSuccess(isSuccess) {
    return {
        type: LOGIN_SUCCESS,
        isSuccess
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
