import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'react-loading-icons';
import Card from './card';


const RelevantBlogs = () => {
    const state = useSelector(state => state.blogs)
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    if (state.blogs.length) {
        return (
            <>
                {
                    state.blogs.map(blog => <Card key={blog.id} {...blog} />)
                }
            </>
        )
    }
    return (
        <section className=''>
            <div className='loading'>
                <Grid stroke="#333" strokeOpacity={.125} speed={1} className='loading-loader' fill='rgb(121, 158, 226)' />
            </div>
        </section>
    );
}


export default RelevantBlogs;
