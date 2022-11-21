import * as actions from '../actions/types';

const initialState = {
    alert: false,
    message: "",
    color: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.NEW_ALERT:
            return {
                ...state,
                alert: action.payload.alert,
                message: action.payload.message,
                color: action.payload.color
            }

        default: return state;
    }
}