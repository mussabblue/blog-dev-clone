import React, { useState, useEffect } from 'react';
import Blogs from '../components/blogs';
import Leftside from '../components/leftSide';
import RelevantBlogs from '../components/relevantBlogs'
import TopBlogs from '../components/TopBlogs';
import { useAppContext } from '../context/appContext';


const data = [
    {
        page: 1,
        title: 'Relevant',
        comp: RelevantBlogs
    },
    {
        page: 2,
        title: 'Latest',
        comp: Blogs
    },
    {
        page: 3,
        title: 'Top',
        comp: TopBlogs
    },

]
const Home = () => {
    const { page, setPage } = useAppContext()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <main>
            <div>
                <Leftside />
            </div>
            <div>
                <aside className='main_header'>
                    <ul>
                        {
                            data.map(item => {
                                return <li className={page === item.page ? 'active' : ''}
                                    onClick={() => setPage(item.page)}
                                    key={item.page}
                                > {item.title} </li>
                            })
                        }
                    </ul>
                </aside>
                {
                    data.map(item => {
                        if (item.page === page) {
                            return <item.comp key={item.page} />
                        }
                    })
                }

            </div>
            <div>
                <h1>  right side</h1>
            </div>

        </main>
    );
}

export default Home;
