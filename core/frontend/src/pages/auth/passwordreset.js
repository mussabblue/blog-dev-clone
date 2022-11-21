import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { configToken } from '../../store/actions/account';
import { TailSpin } from 'react-loading-icons'
import { useAppContext } from '../../context/appContext';


const PasswordReset = () => {
    const { getError, clearErrors, state, dispatch } = useAppContext()
    const params = useParams()
    const password = useRef()
    const password2 = useRef()

    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        clearErrors()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        const pass1 = password.current.value
        const pass2 = password2.current.value
        console.log(params)
        console.log(pass1)

        if (pass1 === pass2) {
            formData.append("token", params.token.slice(6))
            formData.append("password", pass1)


            axios.post('auth/password_reset/confirm/', formData, configToken())
                .then(res => {
                    if (res.status === 200) {
                        setIsDone(true)
                        password.current.value = ""
                        password2.current.value = ""
                    }
                }
                ).catch(err => dispatch({
                    type: 'AUTH_ERROR',
                    payload: {
                        data: err.response.data,
                        type: err.response.status
                    }
                }))
        }
    }


    return (
        <main>
            <section className='auth'>
                <div>
                    <h2 className='auth-title'>Password reset</h2>
                    {
                        isDone ? (
                            <div>
                                <h1>Your password has successfully been reset</h1>
                                <Link to='/login'> Login with your new passowrd</Link>
                            </div>
                        ) : (

                            <form onSubmit={handleSubmit}>
                                <div className='form-container' error={getError("password")}>
                                    <input className='form-input' onFocus={() => clearErrors()} type='text' ref={password} placeholder='New password' />
                                </div>
                                <div className='form-container' error={getError("password")}>
                                    <input className='form-input' onFocus={() => clearErrors()} type='text' ref={password2} placeholder='Confirm new password' />
                                </div>
                                <button>
                                    <ul>
                                        <li>reset password</li>
                                        {state.isAuthLoading && <li><TailSpin className="tailspin" stroke="rgba(64, 64, 252, 0.582)" /></li>}
                                    </ul>
                                </button>

                            </form>
                        )
                    }

                </div>
            </section>
        </main>
    );
}

export default PasswordReset;
