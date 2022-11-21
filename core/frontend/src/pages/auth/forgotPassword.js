import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { configToken } from '../../store/actions/account';
import { TailSpin } from 'react-loading-icons'
import { useSelector } from 'react-redux';


const ForgotPassword = () => {
    const [isDone, setIsDone] = useState(false)
    const email = useRef()
    const state = useSelector(state => state.account)

    const handleSubmit = (e) => {
        let formData = new FormData();
        formData.append("email", email.current.value)

        if (email.current.value !== "") {
            axios.post('/auth/password_reset/', formData, configToken())
                .then(res => {
                    setIsDone(true)
                }).catch(err => console.log(err))
        }

    }


    return (
        <main>
            <section className='auth'>
                <div>
                    {
                        isDone ? (

                            <div className='success-card'>
                                <h4>A password reset link has been sent to your email address</h4>
                            </div>

                        ) : (
                            <>
                                <h1 className='auth-title'>Forgot password</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-container' >
                                        <input className='form-input' type='email' ref={email} placeholder='Email' />
                                    </div>

                                    <button>
                                        <ul>
                                            <li>reset password</li>
                                            {state.isAuthLoading && <li><TailSpin className="tailspin" stroke="rgba(64, 64, 252, 0.582)" /></li>}
                                        </ul>
                                    </button>
                                    <ul>
                                        <li>
                                            <Link to='/login'>Login</Link>
                                        </li>
                                    </ul>
                                </form>
                            </>
                        )
                    }

                </div >
            </section >
        </main>
    );
}

export default ForgotPassword;
