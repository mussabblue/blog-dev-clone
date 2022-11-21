import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertMessage } from '../store/actions/alert';

const Alert = () => {
    const state = useSelector(state => state.alert)
    const [alert, setAlert] = useState({})
    const [cascade, setCascade] = useState("")


    useEffect(() => {
        let timeout = setInterval(() => {
            setCascade('cascade')
        }, 3000)
        return () => {

            clearInterval(timeout)
        }
    }, []);

    useEffect(() => {

        setAlert(state)
        setCascade('')
    }, [state]);

    const { message, color } = alert;
    return message ? (
        <aside className={`alert ${color} ${cascade}`}>
            <span>{message}</span>
        </aside >
    ) : (<> </>);
}

export default Alert;
