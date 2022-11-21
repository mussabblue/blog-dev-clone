import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import autosize from 'autosize'
// import MDEditor, { commands } from '@uiw/react-md-editor';
import { Bars } from 'react-loading-icons'
import { AiOutlineClose } from 'react-icons/ai'
import { publish_post } from '../store/actions/blogs';
import { useAppContext } from '../context/appContext';

const Post = () => {
    const { dispatch, blogs, errors, theTags } = useAppContext()
    const navigate = useNavigate()
    const [tags, setTags] = useState('')
    const [tagsList, setTagList] = useState([
        { tag: "Python" },
        { tag: "JavaScript" },
        { tag: "Java" },
        { tag: "Python1" },
        { tag: "JavaScript1" },
        { tag: "Java1" },
        { tag: "Python2" },
        { tag: "JavaScript2" },
        { tag: "Java2" },
    ])

    const [selectedTags, setSelectedTags] = useState([])
    const [focused, setFocused] = useState(false)
    const [inputFocus, setInputFocus] = useState(false)
    const [tagOptions, setTagOptions] = useState(false)
    const [error, setError] = useState(false)

    const [cover, setCover] = useState("")
    const tagRef = useRef()
    const coverImage = useRef(null)
    const titleRef = useRef()
    const postRef = useRef()



    useEffect(() => {
        if (focused && inputFocus) {
            setTagOptions(true)
        }
        if (!focused && tagRef.current !== document.activeElement) {
            setTagOptions(false)
        }

    }, [focused, inputFocus]);

    useEffect(() => {
        if (blogs.published) {
            titleRef.current.value = ""
            postRef.current.value = ""
            setCover("")

        }
    }, [blogs.published]);


    useEffect(() => {
        if ("title" in errors.data) {
            setError(true)
        }
    }, [errors]);

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
    const tagFocus = () => setInputFocus(true)
    const tagBlur = () => setInputFocus(false)



    const adjustTitle = (e) => {
        autosize(e.target)
    }

    const addTag = tag => {
        setSelectedTags(prev => [...prev, tag])
        setTagList(prev => prev.filter(t => t.id !== tag.id))
        tagRef.current.focus()
    }

    const removeTag = tag => {
        setSelectedTags(prev => prev.filter(t => t.id !== tag.id))
        setTagList(prev => [...prev, tag])
    }

    const coverOnChage = e => {
        console.log(e.target.files)
        setCover(e.target.files[0])
    }

    const onChange = () => {
        setError(false)
    }
    const publishPost = () => {
        let formData = new FormData()
        formData.append('title', titleRef.current.value)
        formData.append('content', postRef.current.value)
        formData.append('cover_image', cover)
        formData.append('tags', selectedTags)
        dispatch(publish_post(formData))
    }

    return (
        <section className='post' >
            <div className='post-header'>
                <Link to='' className='logo-link'><h2 className='logo'>Blog</h2></Link>

                <div>
                    <span>Create Post</span>
                    <ul>
                        <li>
                            Edit
                        </li>
                        <li className='inactive'>
                            Preview
                        </li>
                    </ul>
                    <button onClick={() => navigate('/')}>X</button>
                </div>
            </div>
            <div className='post-body'>

                {
                    error && <aside className='post-error-alert'>
                        <h3>Whoops, something went wrong!</h3>
                    </aside>
                }

                <ul>

                    <li>
                        <label htmlFor='file-upload' className='custom-file-upload'>
                            <input type="file" id='file-upload' ref={coverImage} onChange={coverOnChage} />
                            Add a cover image
                        </label>
                    </li>
                    <li>
                        <textarea placeholder='New post title here...' onKeyDown={adjustTitle} rows='1' ref={titleRef} onChange={onChange} />
                    </li>
                    <li className='tag-options'
                        onMouseEnter={onFocus}
                        onMouseLeave={onBlur}
                    >
                        <label>
                            <ul>
                                {
                                    selectedTags.map(tag => {
                                        return <li key={tag.id} className='selected-tag'>
                                            {tag.name}
                                            <AiOutlineClose className='icon' onClick={() => removeTag(tag)} />
                                        </li>
                                    })
                                }
                            </ul>
                            <input type='text' placeholder={selectedTags.length > 0 ? 'Add another' : 'Add up to 4 tags'}
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                onFocus={tagFocus}
                                onBlur={tagBlur}
                                ref={tagRef}

                            />
                        </label>
                        {(tagOptions && selectedTags.length < 4) && <article >
                            <ul className='tags' >
                                <li className='top-tag' >Top tags</li>
                                {
                                    theTags.tags.map(tag => {
                                        return <li key={tag.id} onClick={() => addTag(tag)}>{tag.name}</li>
                                    })
                                }
                            </ul>
                        </article>
                        }
                    </li>

                </ul>
                <div className="post-container">
                    <textarea placeholder='Write your post content here...' onKeyDown={adjustTitle} rows='1' ref={postRef} onChange={onChange} />

                </div>
            </div>

            <div className='post-footer'>
                <button className='btn-primary' onClick={publishPost}>Publish</button>
                <button className='btn-transparent'>Save draft</button>
                {
                    blogs.processing && <Bars strokeOpacity={.125} speed={1} className='posting-loader' fill='rgb(121, 158, 226)' />
                }

            </div>

        </section>
    );
}

export default Post;
