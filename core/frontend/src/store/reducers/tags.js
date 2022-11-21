import * as actions from '../actions/types'

const initialState = {
    tags: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_TAGS:
            return {
                ...state,
                tags: action.payload
            }

        default: return state;
    }

}
