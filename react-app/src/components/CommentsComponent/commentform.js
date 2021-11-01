import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as commentActions from '../../store/comment'
import './CommentComponent.css'

export default function CommentForm({ commentId, commentText, setHideCommentModal }) {
    const [updateCommentVal, setUpdateCommentVal] = useState(commentText)

    const [validationErrors, setValidationErrors] = useState([])

    // console.log(commentId)

    const dispatch = useDispatch()

    function handleCommentPatch(e) {
        e.preventDefault();
        const payload = {
            text: updateCommentVal,
            idx: commentId,
        };
        dispatch(commentActions.UpdateComment(payload));
        setHideCommentModal(true);


    }

    useEffect(() => {

        const errors = [];

        if (!updateCommentVal) errors.push('There was no entry. Please write your comment.')
        if (updateCommentVal.length > 400) errors.push('Comment is too long.')

        setValidationErrors(errors)

    }, [dispatch, updateCommentVal])

    return (
        <div>
            <ul>
                {validationErrors.map(error =>
                    <li>{error}</li>
                )}
            </ul>
            <form className="comment_form_wrapper" onSubmit={handleCommentPatch}>
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
                        <button className="post_comment_btn" type="submit" disabled={validationErrors.length > 0} >Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}