import React, { useState, useRef, useEffect } from 'react';
import { registerAccount } from '../../store/actions/account';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { TailSpin } from 'react-loading-icons'


const Signup = () => {
    const { dispatch, account, getError, clearErrors, errors } = useAppContext()
    const email = useRef()
    const first_name = useRef()
    const last_name = useRef()
    const password = useRef()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

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

        let formData = new FormData();
        formData.append("email", email.current.value)
        formData.append("first_name", first_name.current.value)
        formData.append("last_name", last_name.current.value)
        formData.append("password", password.current.value)

        email.current.value = ""
        password.current.value = ""
        first_name.current.value = ""
        last_name.current.value = ""

        dispatch(registerAccount(formData))

    }

    return (
        <main>
            <section className='auth'>
                <div>
                    <h1 className='auth-title'>Sign up</h1>
                    <form onSubmit={handleSubmit} error={error}>
                        <div className='form-container' error={getError("email")}>
                            <input className='form-input' onFocus={() => clearErrors()} type='email' ref={email} placeholder='Email' />
                        </div>
                        <div className='form-container' error={getError("first_name")}>
                            <input className='form-input' onFocus={() => clearErrors()} type='text' ref={first_name} placeholder='First name' />
                        </div>
                        <div className='form-container' error={getError("last_name")}>
                            <input className='form-input' onFocus={() => clearErrors()} type='text' ref={last_name} placeholder='Last name' />
                        </div>
                        <div className='form-container' error={getError("password")}>
                            <input className='form-input' onFocus={() => clearErrors()} type='password' ref={password} placeholder='Password' />
                        </div>
                        <button>
                            <ul>
                                <li>register</li>
                                {isLoading && <li><TailSpin className="tailspin" stroke="rgba(64, 64, 252, 0.582)" /></li>}
                            </ul>
                        </button>
                        <ul>
                            <li>
                                <Link to='/login'>or login</Link>
                            </li>
                        </ul>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Signup;
