import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import * as commentActions from '../../store/comment'
import './CommentComponent.css';
import CommentForm from "./commentform";
import Modal from '../Modal'


export default function CommentComponent() {
    const dispatch = useDispatch()
    const currentEvent = useSelector(state => state.event.currentevent)
    const currentEventComments = useSelector(state => state.event.currentevent?.comments)
    // console.log(typeof (currentEventComments))
    const user = useSelector(state => state.session.user)
    // console.log(currentEvent)

    const [commentTextFieldVal, setCommentTextFieldVal] = useState()
    const [hide, setHide] = useState(false);
    const [commentId, setCommentId] = useState(0)
    const [commentText, setCommentText] = useState(0)
    // const [commentEventId, setCommentEventId] = useState()

    // console.log(commentTextFieldVal)
    function handleCommentCreation(e) {
        e.preventDefault();
        const payload = {
            text: commentTextFieldVal,
            eventId: currentEvent?.id,
            announcementId: null,
            userId: user?.id,
        }
        console.log(payload, "CREATE ACTION")
        dispatch(commentActions.CreateComment(payload))
    }

    // function handleCommentDeletion(e) {
    //     e.preventDefault()


    // }

    useEffect(() => {
        setHide(true)
    }, [dispatch])
    // console.log(commentId)
    // console.log(commentText)

    return (
        <div className="comments_outmost_ctnr">
            <div className="comments_view">
                {currentEventComments?.map(comment =>
                    <div className="comments_in_view_ctnr">
                        <li className="comments_in_view" >{comment?.text}</li>
                        {
                            user?.id === comment.userId &&
                            <div className="comments_btns">
                                <li onClick={(e) => {
                                    dispatch(commentActions.DeleteComment(comment?.id))
                                }}>
                                    delete
                                </li>
                                <li onClick={() => {
                                    setHide(false)
                                    setCommentId(comment?.id)
                                    setCommentText(comment?.text)
                                }} >
                                    edit
                                </li>
                            </div>
                        }
                    </div>
                )}
                <Modal title='Edit This Comment' onClose={() => setHide(true)} hide={hide} >
                    <CommentForm commentId={commentId} commentText={commentText} setHide={setHide} />
                </Modal>
            </div>
            <form onSubmit={handleCommentCreation}>
                <div className="comment_textField_wrapper">
                    <textarea
                        name='commentTextField'
                        value={commentTextFieldVal}
                        rows="4"
                        columns="30"
                        placeholder="Write a comment"
                        className="comment_textField"
                        onChange={(e) => setCommentTextFieldVal(e.target.value)}
                    />
                    <div>
                        <button className="post_comment_btn" type="submit">Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}