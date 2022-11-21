import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBlog, getBlogs } from '../store/actions/blogs';
import { useAppContext } from '../context/appContext';
import Comment from '../components/comment';
import Addcomment from '../components/addComment';
import { likeOrUnlikeBlog } from '../store/actions/blogs';
import { Puff, Grid } from 'react-loading-icons'
import axios from 'axios';
import { handleFollowing } from '../store/actions/blogs';


const Details = () => {
    const params = useParams();
    const { HeartIcon, CommentIcon, dispatch, account } = useAppContext()
    const state = useSelector(state => state.blogs)
    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [commentsCount, setCommentsCount] = useState(0)
    const commentSectionRef = useRef()
    const [liker, setLiker] = useState({ a: '', b: '' })
    const [follower, setFollower] = useState({ a: '', b: 'Follow' })

    const config = {
        'Content-Type': 'application/json',
        headers: {
            'Authorization': `Token ${account.token}`
        }
    }
    useEffect(() => {

        dispatch(getBlog(params.id))
        return () => {
            dispatch({
                type: 'CLEAR_BLOG'
            })
        }
    }, [params.id]);

    useEffect(() => {
        if (Object.keys(state.blog).length > 1) {

            try {
                const isLiker = state.blog.likes.includes(account.user.id) ? { a: 'liker-bg', b: 'liker' } : {}
                const isFollower = state.blog.author.profile.followers.includes(account.user.id) ? { a: 'followed', b: 'Unfollow' } : { a: '', b: 'Follow' }
                setLiker(isLiker)
                setFollower(isFollower)
            } catch (error) { }
            setComments(state.blog.comments)
            setIsLoading(false)
        }
    }, [state.blog]);

    const handleLikeOrUnlikeBlog = (id) => {
        dispatch(likeOrUnlikeBlog(id))
    }

    const scrollIntoView = () => {
        commentSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        console.log('clicked')
    }
    const blogComment = (content, id) => {
        const comment = {
            'blog': id,
            'content': content
        }
        axios.post('blogs/comments/', comment, config)
            .then(res => {
                setComments(prev => [...prev, res.data])
            }).catch(err => console.log(err))
    }

    const commentReply = (content, id) => {
        axios.post('blogs/replies/', {
            'comment': id,
            'content': content
        }, config)
            .then(res => {
                setComments(comments => comments.map(comment => {
                    if (comment.id == id) {
                        return { ...comment, replies: [...comment.replies, res.data] }
                    }
                    return comment
                })
                )
            }).catch(err => console.log(err))
    }

    const commentsRepliesCount = () => {
        let count = comments.length;
        comments.map(comment => {
            count += comment.replies.length
        })
        setCommentsCount(count)

    }

    useEffect(() => {
        commentsRepliesCount()
    }, [comments]);

    const handleFollowUnfollow = (blog) => {
        dispatch(handleFollowing(blog))
    }

    if (isLoading) {
        return (<section className='blog'>
            <div className='loading'>
                <Grid stroke="#333" strokeOpacity={.125} speed={1} className='loading-loader' fill='rgb(121, 158, 226)' />
            </div>
        </section>)
    }
    const { id, title, content, pub_date, likes, author, cover_image } = state.blog
    return (
        <section className='blog'>
            <section className='left_side'>
                <ul>
                    <li>
                        <span className={`icon-wrapper ${liker.a}`} onClick={() => handleLikeOrUnlikeBlog(id)} msg="Like" count={likes && likes.length}><HeartIcon className={`icon detail ${liker.b}`} /></span>
                    </li>
                    <li>
                        <span className='icon-wrapper comment'
                            msg="Jump to comments"
                            count={commentsCount}
                            onClick={scrollIntoView}
                        ><CommentIcon className='icon detail' /></span>
                    </li>
                </ul>
            </section>
            <section className='mid_section'>
                <div className='blog-header-image'>
                    <img src={cover_image} />
                </div>
                <div className='card blog-body'>
                    <div className='card-header'>

                        <img src={author.profile.profile_image} />
                        <ul>
                            <li><a href="">{author.get_full_name}</a></li>
                            <li> <small>Posted on {pub_date}</small> </li>
                        </ul>

                    </div>

                    <div className='card-body blog-title'>

                        <h1> {title} </h1>

                        <ul>
                            <li><a href="">#Python</a></li>
                            <li><a href="">#JavaScript</a></li>
                            <li><a href="">#Tech</a></li>
                        </ul>
                    </div>
                    <p>
                        {content}
                    </p>
                </div>
                <div className='comment-section' ref={commentSectionRef}>
                    <div className='comment-section-header'>
                        <ul>
                            <li><h2>Top comments ({commentsCount})</h2></li>
                        </ul>
                        <Addcomment handleOnComment={blogComment} contentID={id} isComment={true} />


                    </div>

                    {
                        comments.map(comment => {
                            return <Comment key={comment.id} comment={comment} handleOnComment={commentReply} />
                        })
                    }
                </div>

            </section>
            <section className='right_side'>
                <div className='card'>
                    <div className='card-header'>

                        <img src={author.profile.profile_image} />
                        <ul>
                            <li><a href="">{author.get_full_name}</a></li>
                        </ul>

                    </div>
                    <button className={follower.a} onClick={() => handleFollowUnfollow({ blogId: id, authorId: author.id })}>{follower.b}</button>
                    <div className='author-bio'>
                        <p>Author's bio</p>
                        <ul>
                            <li><small style={{ 'fontWeight': '900' }}>JOINED</small></li>
                            <li><span>{author.joined_date}</span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </section >

    );
}

export default Details;
