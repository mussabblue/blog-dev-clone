import React, { useContext, createContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alertMessage } from '../store/actions/alert';
// RiHeart2Line
import { RiHeart2Line as HeartIcon } from 'react-icons/ri'
import { MdOutlineModeComment as CommentIcon } from 'react-icons/md'
import { FiBell as Bell } from 'react-icons/fi'
const AppContext = createContext()


export const AppProvider = ({ children }) => {
    const account = useSelector(state => state.account)
    const errors = useSelector(state => state.errors)
    const blogs = useSelector(state => state.blogs)
    const theTags = useSelector(state => state.tags)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)

    let mainError = ""


    const getError = (type) => {
        if (type in errors.data) {
            return `*${type}: ${errors.data[type]}`

        } else if ('non_field_errors' in errors.data) {
            mainError = errors.data['non_field_errors']
        }
        return ""
    }

    const clearErrors = () => {
        dispatch({ type: 'CLEAR_ERRORS' })


    }
    return (
        <AppContext.Provider value={{
            account,
            errors,
            blogs,
            theTags,
            page, setPage,
            getError,
            clearErrors,
            mainError,
            dispatch,
            HeartIcon,
            CommentIcon,
            Bell
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}