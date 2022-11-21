import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Login from './auth/login';

const Protectedroute = ({ children }) => {
    const { account } = useAppContext()
    return account.isAuthenticated ? children : <Login />
}

export default Protectedroute;
