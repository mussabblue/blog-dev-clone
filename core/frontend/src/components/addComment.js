import React, { useRef, useState } from 'react';

const Addcomment = ({ noMargin, handleOnComment, contentID, isComment }) => {
    const commentRef = useRef(null)
    const btnRef = useRef()
    const [showBtn, setShowBtn] = useState(false)

    const onClick = () => {
        if (commentRef) {
            handleOnComment(commentRef.current.value, contentID)
            commentRef.current.value = ""
        }
    }
    const isActive = () => {
        return document.activeElement === commentRef.current;
    }
    const handleBtnUnfocus = (e) => {
        if (btnRef.current && showBtn && !btnRef.current.contains(e.target) && !isActive()) {
            setShowBtn(false)
        }
    }
    document.addEventListener('mousedown', handleBtnUnfocus)

    const styles = () => {
        return isComment ? {} : { marginLeft: 0 }
    }
    return (
        <aside className={`comment-box ${noMargin && 'no-margin'}`}>
            <div>
                {isComment && <img src="/media/default.jpg" className='img-crcl' />}
                <textarea placeholder='add to the discussion' data-provide="markdown" ref={commentRef} onFocus={() => setShowBtn(true)}></textarea>
            </div>
            {showBtn && <button className='btn-primary' onClick={onClick} ref={btnRef}
                style={styles()}
            >Submit</button>}
        </aside>
    );
}

export default Addcomment;
