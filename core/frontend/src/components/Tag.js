import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


const Tag = ({ name, description, color }) => {
    const [hovered, setHovered] = useState(false)
    const newClr = 'red'
    // console.log(newClr)
    const onHover = () => {
        return hovered ? {
            backgroundColor: color + '3f',
            outline: `1px solid ${color}`
        } : {}
    }
    return (
        <article className='tagCard'>
            <div style={{ backgroundColor: color }}></div>
            <h3>
                <Link to=''
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={onHover()}
                >
                    <span style={{ color: color }}>#</span>
                    {name}
                </Link>
            </h3>
            <p>{description}</p>
            <p>777 Posts published</p>
            <button>Follow</button>
        </article>
    );
}

export default Tag;
