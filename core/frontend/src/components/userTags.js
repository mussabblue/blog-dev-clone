import React from 'react';
import Tag from './Tag';
import { useAppContext } from '../context/appContext';

const UserTags = () => {
    const { theTags } = useAppContext();

    return (
        <div className='tagsSection'>
            <div className='tags-header'>
                <h1>Top tags</h1>
                <ul>
                    <li><input type='text' placeholder='Search for tag' /></li>
                    <li><h3>Following tags</h3></li>
                </ul>
            </div>

            <div className='tags-body'>
                {
                    theTags.tags.map(tag => <Tag key={tag.name} {...tag} />)
                }
            </div>
        </div>
    );
}

export default UserTags;
