import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as replyActions from '../../store/reply'
import './CommentComponent.css';

export default function ReplyForm({ replyId, replyText, setHideReplyModal }) {

    const [updateReplyVal, setUpdateReplyVal] = useState(replyText)
    const [validationErrors, setValidationErrors] = useState([])
    console.log(replyId, replyText)

    const dispatch = useDispatch();

    function handleReplyPatch(e) {
        e.preventDefault();
        const payload = {
            text: updateReplyVal,
            idx: replyId,
        };
        dispatch(replyActions.UpdateReply(payload));
        setHideReplyModal(true);
    }

    useEffect(() => {
        const errors = [];

        if (!updateReplyVal) errors.push('There was no entry. Please write your comment.')
        if (updateReplyVal.length > 400) errors.push('Comment is too long.')

        setValidationErrors(errors)
    }, [dispatch, updateReplyVal])

    return (
        <div>
            <div>
                {validationErrors.map(error =>
                    <li>{error}</li>
                )}
                <form onSubmit={handleReplyPatch}>
                    <div className="comment_textField_wrapper">
                        <textarea
                            name='updateReplyVal'
                            value={updateReplyVal}
                            rows="4"
                            columns="30"
                            placeholder="Edit Your Reply..."
                            className="reply_textField"
                            onChange={(e) => setUpdateReplyVal(e.target.value)}
                        />
                        <div>
                            <button className="post_comment_btn" type="submit" disabled={validationErrors.length > 0} >Update </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

