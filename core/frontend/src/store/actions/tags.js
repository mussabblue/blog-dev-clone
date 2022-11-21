
import axios from "axios";
import * as actions from './types'


export const loadTags = () => (dispatch) => {
    axios.get('auth/tags')
        .then(res => {
            dispatch({
                type: actions.GET_TAGS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
    return
}