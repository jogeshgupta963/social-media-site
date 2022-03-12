import { SET_ALERT, REMOVE_ALERT } from './types.js'
import { v4 as uuid } from 'uuid'
export const setAlert = (msg, alertType) => dispatch => {
    var id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000)
}