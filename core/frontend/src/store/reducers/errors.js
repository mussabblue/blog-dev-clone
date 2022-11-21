import * as actions from '../actions/types';

const initialState = {
    type: null,
    data: {},
    url: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_ERROR:
            return {
                ...state,
                ...action.payload
            }

        case actions.BLOG_SUCCESS:
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                type: null,
                data: {},
                url: ""
            }
        case actions.BLOG_ERROR:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
