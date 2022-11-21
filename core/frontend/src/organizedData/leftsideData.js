import { FcHome, FcList, FcTodoList, FcAbout } from 'react-icons/fc'
import { FaMicrophone, FaTags } from 'react-icons/fa'
import { BsFillCameraReelsFill } from 'react-icons/bs'
import { GrContact } from 'react-icons/gr'

import React from 'react';

export default [
    {
        title: 'Home',
        link: '',
        icon: <FcHome style={{ 'marginRight': '.3em' }} />

    },
    {
        title: 'Reading List',
        link: '',
        icon: <FcList style={{ 'marginRight': '.3em' }} />

    },
    {
        title: 'Listings',
        link: '',
        icon: <FcTodoList style={{ 'marginRight': '.3em' }} />

    },
    {
        title: 'Podcasts',
        link: '',
        icon: <FaMicrophone style={{ 'marginRight': '.3em' }} />

    },
    {
        title: 'Videos',
        link: '',
        icon: <BsFillCameraReelsFill style={{ 'marginRight': '.3em' }} />

    },
    {
        title: 'Tags',
        link: '/tags',
        icon: <FaTags style={{ 'marginRight': '.3em' }} />

    },
    {
        title: 'About',
        link: '',
        icon: <FcAbout style={{ 'marginRight': '.3em' }} />

    },
    {
        title: 'Contact',
        link: '',
        icon: <GrContact style={{ 'marginRight': '.3em' }} />

    },
]


