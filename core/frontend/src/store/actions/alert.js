import * as actions from './types';
// send new alert 

export const alertMessage = (message, color, alert) => dispatch => {
    dispatch({
        type: actions.NEW_ALERT,
        payload: {
            message, color, alert
        }
    })
}