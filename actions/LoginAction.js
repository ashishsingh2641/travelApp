import axios from 'axios';
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
       // Auth.saveItem("role", _data['role'])
        axios.post('http://travel-env.45kvuuymy5.ap-south-1.elasticbeanstalk.com/api/user/login', {
            // role: _data.role,
            // firstName: _data.firstName,
            // lastName: _data.lastName,
            // email: _data.email,
            password: _data.password,
            phnNumber: _data.phnNumber
        }).then(res => {
            if(res !== undefined){
                //Auth.saveKey("id_token", response.data.jwt);
                //this.props.newJWT(response.data.jwt);;
                dispatch(loginSuccess(true))
                dispatch(loginPending(false));
                alert(res.data.role)
                debugger
                if (res.data.role === "TravelerID") {
                    debugger;
                    return pagePath();
                }
                else if (res.data.role === 'Host') {
                    return newPagepath();
                }

            }
        }).catch(err => {
           // debugger;
            alert(JSON.stringify(err))
            dispatch(loginError(err));
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
