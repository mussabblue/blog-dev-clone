import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';

const CommentCard = ({ handleOpenReply, likeComment, noreplyOption, id, author, content, likes }) => {
    const { HeartIcon, CommentIcon, account, dispatch, blogs } = useAppContext()
    const [userClicked, setUserClicked] = useState({ a: '', b: '' })

    useEffect(() => {
        if (likes && account.user && likes.includes(account.user.id)) {
            setUserClicked(prev => prev = {
                a: 'userclicked',
                b: 'user-clicked'
            })
        } else {
            setUserClicked({ a: '', b: '' })
        }
    }, [blogs.blog]);


    return (
        <div className='comment-card-body'>
            <ul className='comment-side'>
                <li>
                    <img src={author.profile.profile_image} className='img-crcl' />
                </li>
            </ul>
            <div className='comment-body'>
                <div className='comment-header'>
                    <ul>
                        <li><h3>{author.get_full_name}</h3></li>
                    </ul>
                    <span>info</span>
                </div>
                <p>
                    {content}
                </p>
            </div>
            <ul className='comment-footer card-footer'>
                <li className={userClicked.a} onClick={likeComment} ><HeartIcon className={`icon ${userClicked.b}`} /> {likes ? likes.length : 0} likes</li>
                {!noreplyOption && <li onClick={() => handleOpenReply()}><CommentIcon className='icon' /> reply</li>}
            </ul>
        </div>
    );
}

export default CommentCard;
