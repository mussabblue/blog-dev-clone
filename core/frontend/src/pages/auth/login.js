import React, { useState, useRef, useEffect } from 'react';
import { loginAccount } from '../../store/actions/account';

import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loading-icons'
// import { alertMessage } from '../../store/actions/alert';
import { useAppContext } from '../../context/appContext';

const Login = () => {
    const email = useRef()
    const password = useRef()
    const { getError, clearErrors, errors, dispatch, account } = useAppContext();
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState("")

    useEffect(() => {
        clearErrors()
    }, []);

    useEffect(() => {
        if ("non_field_errors" in errors.data) {
            setError(errors.data['non_field_errors'])
        }
        if (account.isAuthenticated || errors.type === 400) {
            setIsLoading(false)
        }
    }, [errors, account]);


    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append("email", email.current.value)
        formData.append("password", password.current.value)
        email.current.value = ""
        password.current.value = ""
        dispatch(loginAccount(formData))
        setIsLoading(true)


    }


    return (
        <main>
            <section className='auth'>
                <div>
                    <h1 className='auth-title'>Login</h1>
                    <form onSubmit={handleSubmit} error={error}>
                        <div className='form-container' error={getError("email")}>
                            <input className='form-input' onFocus={() => clearErrors()} type='email' ref={email} placeholder='Email' />
                        </div>
                        <div className='form-container' error={getError("password")}>
                            <input className='form-input' onFocus={() => clearErrors()} type='text' ref={password} placeholder='Password' />
                        </div>
                        <button>
                            <ul>
                                <li>Login</li>
                                {isLoading && <li><TailSpin className="tailspin" stroke="rgba(64, 64, 252, 0.582)" /></li>}
                            </ul>
                        </button>
                        <ul>
                            <li>
                                <Link to="/forgot-password">Forgot password?</Link>
                            </li>
                            <li>
                                <Link to='/signup'>Sign up</Link>
                            </li>
                        </ul>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Login;
