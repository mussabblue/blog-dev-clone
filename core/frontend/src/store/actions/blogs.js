import axios from "axios";
import * as actions from './types'
import { configToken } from "./account";

// GET BLOGS 

export const getBlogs = () => dispatch => {
    axios.get('/blogs/')
        .then(res => {
            dispatch({
                type: actions.GET_BLOGS,
                payload: res.data
            })
        }).catch(err => [
            console.log(err)
        ])
}


// GET BLOG 

export const getBlog = (id) => dispatch => {
    axios.get(`/blogs/${id}`)
        .then(res => {
            dispatch({
                type: actions.GET_BLOG,
                payload: res.data
            })
        }).catch(err => [
            console.log(err)
        ])
}

// like - unlike blog 
export const likeOrUnlikeBlog = (id) => (dispatch, getState) => {

    axios.post(`/blogs/${id}/like`, null, configToken(getState))
        .then(res => {
            if (res.data['status']) {
                dispatch({
                    type: actions.LIKE_BLOG,
                    payload: {
                        user: getState().account.user.id,
                        blog_id: id
                    }

                })
            } else {
                dispatch({
                    type: actions.UNLIKE_BLOG,
                    payload: {
                        user: getState().account.user.id,
                        blog_id: id
                    }
                })
            }
        })
        .catch(err => {
            dispatch({
                type: actions.AUTH_ERROR,
                payload: {
                    data: err.response.data,
                    type: err.response.status,
                    url: err.response.request.responseURL
                }
            })

        })


}

// like - unlike comment 
export const likeOrUnlikeComment = (id) => (dispatch, getState) => {

    axios.post(`/blogs/comments/${id}/like`, null, configToken(getState))
        .then(res => {
            if (res.data['status']) {
                dispatch({
                    type: actions.LIKE_COMMENT,
                    payload: {
                        user: getState().account.user.id,
                        comment_id: id
                    }

                })
            } else {
                dispatch({
                    type: actions.UNLIKE_COMMENT,
                    payload: {
                        user: getState().account.user.id,
                        comment_id: id
                    }
                })
            }
        })
        .catch(err => {
            dispatch({
                type: actions.AUTH_ERROR,
                payload: {
                    data: err.response.data,
                    type: err.response.status,
                    url: err.response.request.responseURL
                }
            })

        })


}
export const publish_post = form => (dispatch, getState) => {
    dispatch({ type: actions.PUBLISHING })
    axios.post('blogs/', form, configToken(getState))
        .then(res => dispatch({ type: actions.BLOG_SUCCESS }))
        .catch(err => {
            dispatch({
                type: actions.BLOG_ERROR,
                payload: {
                    data: err.response.data,
                    type: err.response.status,
                    url: err.response.request.responseURL
                }
            })

        })
}


export const handleFollowing = (blog) => (dispatch, getState) => {
    axios.post(`auth/followers/${blog.authorId}/`, null, configToken(getState))
        .then(res => {
            if (res.data['following']) {
                dispatch({
                    type: actions.FOLLOW,
                    payload: getState().account.user.id
                })
            } else {
                dispatch({
                    type: actions.UNFOLLOW,
                    payload: getState().account.user.id
                })
            }
        }).catch(err => console.log(err))
    return
}