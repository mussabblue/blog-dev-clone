import axios from "axios";
import * as actions from './types'


export function configToken(getState = null) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    if (getState !== null) {
        const token = getState().account.token;
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
}


// load account 

export const loadAccount = () => (dispatch, getState) => {
    dispatch({ type: actions.AUTH_REQUEST })
    axios.get('auth/user', configToken(getState))
        .then(res => {
            dispatch({
                type: actions.GET_ACCOUNT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: actions.AUTH_ERROR,
                payload: {
                    data: err.response.data,
                    type: err.response.status,
                    url: err.response.request.responseURL
                }
            })
            console.log(err.response.data)
        })

}

// login account 
export const loginAccount = form => dispatch => {
    dispatch({ type: actions.AUTH_REQUEST })
    axios.post('auth/login', form, configToken())
        .then(res => {
            dispatch({
                type: actions.LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err.response.data)
            dispatch({
                type: actions.AUTH_ERROR,
                payload: {
                    data: err.response.data,
                    type: err.response.status,
                    url: err.response.request.responseURL
                }
            })
        })
}

// register account 
export const registerAccount = form => dispatch => {
    dispatch({ type: actions.AUTH_REQUEST })
    axios.post('auth/register', form, configToken())
        .then(res => {
            dispatch({
                type: actions.REGISTER_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err.response.data)
            dispatch({
                type: actions.AUTH_ERROR,
                payload: {
                    data: err.response.data,
                    type: err.response.status,
                    url: err.response.request.responseURL
                }
            })
        })
}

// logout 
export const logout = () => (dispatch, getState) => {
    dispatch({ type: actions.AUTH_REQUEST })
    axios.post('auth/logout', null, configToken(getState))
        .then(res => {
            dispatch({
                type: actions.LOGOUT_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            console.log(err.response.data)
            dispatch({
                type: actions.AUTH_ERROR
            })
        })
}

