import * as actions from '../actions/types';

const initialState = {
    isAuthLoading: false,
    isAuthenticated: false,
    user: null,
    profile: null,
    token: localStorage.getItem("token")
}


export default function (state = initialState, action) {

    switch (action.type) {
        case actions.AUTH_REQUEST:
            return {
                ...state,
                isAuthLoading: true
            }
        case actions.GET_ACCOUNT:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                isAuthLoading: false
            }
        case actions.REGISTER_SUCCESS:
        case actions.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isAuthLoading: false


            }

        case actions.LOGIN_FAIL:
        case actions.AUTH_ERROR:
        case actions.LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                isAuthLoading: false
            }

        default:
            return state;
    }



}