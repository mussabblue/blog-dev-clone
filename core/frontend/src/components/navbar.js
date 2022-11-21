import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/account';
import Alert from './alert';
import { useAppContext } from '../context/appContext';
import LoginRequiredModal from './loginRequiredModal';
import Post from './post';


const Navbar = () => {
    const { dispatch, account, errors, Bell } = useAppContext()
    const [openModal, setOpenModal] = useState(false)
    const [newPost, setNewPost] = useState(true)
    const [dropdown, setDropdown] = useState(false)
    const dropdownRef = useRef()

    useEffect(() => {
        if (errors.type === 401 && !errors.url.endsWith('user')) {
            setOpenModal(true)

        }
    }, [errors]);

    const handleCloseModal = () => {
        setOpenModal(false)
        dispatch({ type: 'CLEAR_ERRORS' })
    }

    const closeDropdown = (e) => {
        if (dropdownRef.current && dropdown && !dropdownRef.current.contains(e.target)) {
            setDropdown(false)
        }
    }
    const onSelectedItem = (e) => {
        setDropdown(false)
    }
    document.addEventListener('mousedown', closeDropdown)

    return (
        <div className='navbar'>
            <Link to='' className='logo-link'><h2 className='logo'>Blog</h2></Link>
            <ul>
                {
                    account.isAuthenticated ?
                        (<>
                            <li>
                                <Link to='/new' className='btn-info'>Create Post</Link>
                            </li>
                            <li>
                                <span className='btn-icon'><Bell className='icon bell' /></span>
                            </li>
                            <li onClick={() => setDropdown(!dropdown)}>

                                <img src={account.user.profile.profile_image} className='img-crcl small' />

                            </li>

                        </>) :
                        (<>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/signup' className='btn-info'>Create account</Link>
                            </li>
                        </>)
                }

            </ul>
            <Alert />
            {openModal && <LoginRequiredModal handleCloseModal={handleCloseModal} />}
            <div className={`dropdown ${dropdown ? 'display' : ''}`} ref={dropdownRef}>
                <ul>
                    <li onClick={onSelectedItem}>
                        <Link to="">{account.user && account.user.get_full_name}</Link>
                    </li>
                    <li onClick={onSelectedItem}>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li onClick={onSelectedItem}>
                        <Link to="" onClick={() => dispatch(logout())}>Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
