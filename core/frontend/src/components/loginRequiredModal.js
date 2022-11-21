import React from 'react';
import { Link } from 'react-router-dom';

const LoginRequiredModal = ({ handleCloseModal }) => {
    return (
        <div className='login-modal'>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>Log in to continue</h3>
                    <button onClick={() => handleCloseModal(false)}>X</button>
                </div>

                <div className='modal-body'>
                    <div>
                        <h2 className='logo tilt'>Blog</h2>
                        <h4>Share your thoughts with the world!</h4>
                    </div>

                    <div className='modal-footer right_side'>
                        <button>Login</button>
                        <Link to='/signup'>Create account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRequiredModal;
