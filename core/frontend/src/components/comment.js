import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Addcomment from './addComment';
import CommentCard from './commentCard';
import { likeOrUnlikeComment } from '../store/actions/blogs';

const Comment = ({ comment, handleOnComment }) => {
    const { dispatch } = useAppContext()
    const [openReply, setOpenReply] = useState(false)
    const [replies, setReplies] = useState([])




    const handleOpenReply = () => {
        setOpenReply(!openReply)
    }
    const likeComment = () => {
        dispatch(likeOrUnlikeComment(comment.id))
    }
    return (
        <aside className='comment-card'>
            <CommentCard handleOpenReply={handleOpenReply} likeComment={likeComment} {...comment} />
            <div className='comment-reply-footer'>
                {openReply && <Addcomment noMargin={true} handleOnComment={handleOnComment} contentID={comment.id} />}
                {comment.replies.map(reply => <CommentCard key={reply.id} handleOpenReply={handleOpenReply} {...reply} noreplyOption={true} />)}
            </div>

        </aside>
    );
}

export default Comment;
