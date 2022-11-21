import React from 'react';
import { Link } from 'react-router-dom'
import leftsideData from '../organizedData/leftsideData';

const Leftside = () => {
    return (
        <div className='leftside'>
            <ul>
                {
                    leftsideData.map(({ title, link, icon }) => {
                        return <li key={title}>
                            <Link to={link}> {icon} {title}</Link>
                        </li>
                    })
                }
            </ul>
        </div >
    );
}


export default Leftside;
