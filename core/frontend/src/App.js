import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import './index.css'
import './app.css'
import './responsive.css';
import {

    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store/store'


import Navbar from './components/navbar';

import Home from './pages/home';
import Details from './pages/details';
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import ForgotPassword from './pages/auth/forgotPassword';
import PasswordReset from './pages/auth/passwordreset';
import Notfound from './pages/notFound';
import SecureRoute from './pages/secureRoute';
import Footer from './pages/footer';
import { loadAccount } from './store/actions/account';
import { getBlogs } from './store/actions/blogs';
import { loadTags } from './store/actions/tags'
import { AppProvider } from './context/appContext';
import Post from './components/post';
import { useLocation } from 'react-router-dom';
import Protectedroute from './pages/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import UserTags from './components/UserTags';


const App = () => {
    const location = useLocation()
    const isNewPost = location.pathname.includes('new')
    useEffect(() => {
        store.dispatch(loadAccount())
        store.dispatch(getBlogs())
        store.dispatch(loadTags())

    }, []);

    return (
        <>
            {!isNewPost && <Navbar />}
            <Routes>
                <Route index element={<Home />} />
                <Route path='/tags' element={<UserTags />} />
                <Route path='/new' element={<Protectedroute ><Post /></Protectedroute>} />
                <Route path='/dashboard' element={<Protectedroute ><Dashboard /></Protectedroute>} />
                <Route path="/login" element={<SecureRoute><Login /></SecureRoute>} />
                <Route path="/signup" element={<SecureRoute><Signup /></SecureRoute>} />
                <Route path="/forgot-password" element={<SecureRoute><ForgotPassword /></SecureRoute>} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/reset-password/:token" element={<SecureRoute><PasswordReset /></SecureRoute>} />
                <Route path="*" element={<Notfound />} />
            </Routes>
            {!isNewPost && <Footer />}
        </>

    );
};


ReactDOM.render(
    <Provider store={store}>
        <AppProvider>

            <Router>

                <App />

            </Router>
        </AppProvider>
    </Provider>,
    document.getElementById('app')
)