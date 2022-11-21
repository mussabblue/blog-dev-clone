import React, { useState, useEffect } from 'react';
import dashboardData from '../organizedData/dashboardData';
import { useAppContext } from '../context/appContext';
import axios from 'axios';


const Dashboard = () => {
    const { account } = useAppContext()
    const [view, setView] = useState(1)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ list: [] })

    useEffect(() => {
        setLoading(true)
        axios.get('/blogs/dashboard_data/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${account.token}`
            }
        }).then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
        return () => setData([])

    }, []);
    if (loading) {
        <section className='dashboard'>
            <h1>Loading...</h1>
        </section>
    }
    const { Total_post_reactions, Total_post_views, Listings_created, Credits_available, list } = data;
    return (
        <section className='dashboard'>
            <h1>Dashboard</h1>
            <ul className='dashboard-header'>
                <li>
                    <h1>{Total_post_reactions}</h1>
                    <span>Total post reactions</span>
                </li>
                <li>
                    <h1>{Total_post_views}</h1>
                    <span>Total post views</span>
                </li>
                <li>
                    <h1>{Listings_created}</h1>
                    <span>Listings created</span>
                </li>
                <li>
                    <h1>{Credits_available}</h1>
                    <span>Credits available</span>
                </li>
            </ul>
            <div className='dashboard-body'>
                <ul>
                    {
                        list.map(item => {
                            const { id, title, count } = item;
                            return (
                                <li className={`dashboard-body-li ${view === id ? 'selected-li' : ""}`}
                                    key={id}
                                    onClick={() => setView(id)}
                                >
                                    <span>{title}</span> <span>{count}</span>
                                </li>
                            )
                        })

                    }

                </ul>
                <div>
                    {
                        list.map(item => {
                            const Component = dashboardData.filter(d => d.id === item.id)[0].compo;
                            if (item.id === view) return <Component key={item.id} {...item} />

                        })
                    }
                </div>
            </div>

        </section>
    );
}

export default Dashboard;
