import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as commentActions from '../../store/comment'
import './CommentComponent.css'

export default function CommentForm({ commentId, commentText }) {
    const [updateCommentVal, setUpdateCommentVal] = useState(commentText)
    console.log(commentId)

    const dispatch = useDispatch()

    function handleCommentPatch(e) {
        // e.preventDefault();
        const payload = {
            text: updateCommentVal,
            idx: commentId,
        }
        dispatch(commentActions.UpdateComment(payload))



    }

    useEffect(() => {

    }, [dispatch])

    return (
        <div>
            <form onSubmit={handleCommentPatch}>
                <div className="comment_textField_wrapper">
                    <textarea
                        name='updateCommentVal'
                        value={updateCommentVal}
                        rows="4"
                        columns="30"
                        placeholder="Write a comment"
                        className="comment_textField"
                        onChange={(e) => setUpdateCommentVal(e.target.value)}
                    />
                    <div>
                        <button className="post_comment_btn" type="submit">update</button>
                    </div>
                </div>
            </form>
        </div>
    )
}