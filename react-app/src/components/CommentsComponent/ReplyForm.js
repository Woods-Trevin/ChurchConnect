import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as replyActions from '../../store/reply'
import './CommentComponent.css';

export default function ReplyForm({ replyId, replyText, setHideReplyModal }) {

    const [updateReplyVal, setUpdateReplyVal] = useState(replyText)
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

    }, [dispatch])

    return (
        <div>
            <div>
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
                            <button className="post_comment_btn" type="submit"> Update </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

