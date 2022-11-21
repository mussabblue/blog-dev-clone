import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';




const Card = ({ id, title, likes, comments, author }) => {
    const { HeartIcon, CommentIcon } = useAppContext()
    const [commentsCount, setCommentsCount] = useState(0)


    useEffect(() => {
        comments_count()
    }, []);


    const comments_count = () => {
        let count = comments.length;
        comments.map(comment => {
            count += comment.replies.length
        })
        setCommentsCount(count)
    }


    const get_comments_count = () => {
        if (commentsCount > 0) {
            return `${commentsCount} ${commentsCount === 1 ? 'Comment' : 'Comments'}`
        }
        return 'Add comment'
    }
    const likes_count = () => {
        if (likes.length > 0) {
            return `${likes.length} ${likes.lenght === 1 ? 'reaction' : 'reactions'}`
        }
        return null
    }
    return (
        <section className='card'>
            <div className='card-header'>

                <img src={author.profile.profile_image} />
                <ul>
                    <li><a href="">{author.get_full_name}</a></li>
                    <li> <small>{author.joined_date}</small> </li>
                </ul>

            </div>
            <div className='card-body'>

                <Link to={`/details/${id}`}>
                    {title}
                </Link>

                <ul>
                    <li><a href="">#Python</a></li>
                    <li><a href="">#JavaScript</a></li>
                    <li><a href="">#Tech</a></li>
                </ul>
                <div className='card-footer'>
                    <ul>
                        {likes_count() && <li><HeartIcon className='icon' />{likes_count()}</li>}
                        <li><CommentIcon className='icon' />{get_comments_count()}</li>
                    </ul>
                    <span>
                        info
                    </span>
                </div>
            </div>

        </section>
    );
}

export default Card;
