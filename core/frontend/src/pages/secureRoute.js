import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const SecureRoute = ({ children }) => {
    const navigate = useNavigate()
    const { account } = useAppContext();

    useEffect(() => {
        if (account.isAuthenticated && !account.isAuthLoading) {
            navigate('/')
        }
    }, [account]);
    return children;
}

export default SecureRoute;
