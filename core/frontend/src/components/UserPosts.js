import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom';

const Userposts = ({ title, content }) => {
    const [data, setData] = useState(content)
    return (
        <div className='dashboard-subpage'>
            <h3>{title}</h3>
            <ul>
                {
                    data.map(post => {
                        return <li key={post.id}>
                            <div className=''>
                                <h4><Link to={`/details/${post.id}`}> {post.title}</Link></h4>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default Userposts;
