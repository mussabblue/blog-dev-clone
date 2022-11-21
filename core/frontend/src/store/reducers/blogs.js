import * as actions from '../actions/types';


const initialState = {
    processing: false,
    published: false,
    blogs: [],
    blog: {},

}


export default function (state = initialState, action) {
    switch (action.type) {
        case actions.PUBLISHING:
            return {
                ...state,
                processing: true,
            }
        case actions.BLOG_SUCCESS:
            return {
                ...state,
                processing: false,
                published: true
            }
        case actions.CLEAR_PUBLISH:
        case actions.BLOG_ERROR:
            return {
                ...state,
                processing: false,
                published: false,
            }
        case actions.GET_BLOGS:
            return {
                ...state,
                blogs: action.payload

            }

        case actions.GET_BLOG:
            return {
                ...state,
                blog: action.payload

            }

        case actions.CLEAR_BLOG:
            return {
                ...state,
                blog: {}
            }

        case actions.LIKE_BLOG:

            return {
                ...state,
                blogs: state.blogs.map(blog => {
                    if (blog.id === action.payload.blog_id) {
                        blog.likes.push(action.payload.user)
                    }
                    return blog
                }),
                blog: { ...state.blog, likes: [...state.blog.likes, action.payload.user] }

            }

        case actions.UNLIKE_BLOG:
            return {
                ...state,
                blogs: state.blogs.map(blog => {
                    if (blog.id === action.payload.blog_id) {
                        blog.likes = blog.likes.filter(like => like !== action.payload.user)
                    }
                    return blog
                }),
                blog: { ...state.blog, likes: state.blog.likes.filter(like => like !== action.payload.user) }
            }
        case actions.FOLLOW:
            let followers = [...state.blog.author.profile.followers, action.payload]
            return {
                ...state,
                blog: { ...state.blog, author: { ...state.blog.author, profile: { ...state.blog.author.profile, followers: followers } } }
            }

        case actions.UNFOLLOW:
            let followerz = state.blog.author.profile.followers.filter(follower => follower !== action.payload)
            console.log(followerz)
            return {
                ...state,
                blog: { ...state.blog, author: { ...state.blog.author, profile: { ...state.blog.author.profile, followers: followerz } } }
            }

        case actions.LIKE_COMMENT:
            return {
                ...state,
                blog: {
                    ...state.blog, comments: state.blog.comments.map(comment => {
                        if (comment.id === action.payload.comment_id) {
                            comment.likes.push(action.payload.user)
                        }
                        return comment
                    })
                }
            }

        case actions.UNLIKE_COMMENT:
            return {
                ...state,
                blog: {
                    ...state.blog, comments: state.blog.comments.map(comment => {
                        if (comment.id === action.payload.comment_id) {
                            comment.likes = comment.likes.filter(user => user !== action.payload.user)
                        }
                        return comment
                    })
                }
            }
        default: return state;

    }
}
