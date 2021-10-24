import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import * as commentActions from '../../store/comment'
import './CommentComponent.css';


export default function CommentComponent() {
    const dispatch = useDispatch()
    const currentEvent = useSelector(state => state.event.currentevent)
    const user = useSelector(state => state.session.user)
    console.log(currentEvent)

    const [commentTextFieldVal, setCommentTextFieldVal] = useState()
    // const [commentUserId, setCommentUserID] = useState()
    // const [commentEventId, setCommentEventId] = useState()

    console.log(commentTextFieldVal)
    function handleCommentCreation(e) {
        e.preventDefault();
        const payload = {
            text: commentTextFieldVal,
            eventId: currentEvent?.id,
            announcementId: null,
            userId: user?.id,
        }
        console.log(payload)
        dispatch(commentActions.CreateComment(payload))
    }

    // useEffect(() => {
    //     setCommentUserID(user?.id)
    //     setCommentEventId(currentEvent?.id)
    // }, [dispatch])


    return (
        <div>
            <h1>Comment Component</h1>
            <form onSubmit={handleCommentCreation}>
                <div className="comment_textField_wrapper">
                    <textarea
                        name='commentTextField'
                        value={commentTextFieldVal}
                        rows="5"
                        columns="30"
                        placeholder="Write a comment"
                        className="comment_textField"
                        onChange={(e) => setCommentTextFieldVal(e.target.value)}
                    />
                </div>
                <div>
                    <button className="" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}