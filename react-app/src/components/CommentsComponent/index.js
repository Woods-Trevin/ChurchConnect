import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import * as commentActions from '../../store/comment'
import './CommentComponent.css';
import CommentForm from "./commentform";
import Modal from '../Modal'


export default function CommentComponent({ eventId, announcementId }) {
    const dispatch = useDispatch()
    console.log(eventId, '---------------EVENT ID----------')
    console.log(announcementId, '---------------Announcement ID----------')
    const currentEvent = useSelector(state => state.event.currentevent)
    const currentAnnouncement = useSelector(state => state.announcement.current_announcement)
    // console.log(currentAnnouncement.id, '---------------Announcement')

    const comments = useSelector(state => state.comment.comments)
    const currentEventComments = comments?.filter(comment => comment.eventId === currentEvent?.id)
    const currentAnnouncementComments = comments?.filter(comment => comment.announcementId === currentAnnouncement?.id)
    console.log(comments)

    const user = useSelector(state => state.session.user)


    const [commentTextFieldVal, setCommentTextFieldVal] = useState("")
    const [hide, setHide] = useState(false);
    const [commentId, setCommentId] = useState()
    const [commentText, setCommentText] = useState()


    function handleEventCommentCreation(e) {
        e.preventDefault();

        const payload = {
            text: commentTextFieldVal,
            eventId: eventId,
            announcementId: null,
            userId: user?.id,
        }
        console.log(payload, "CREATE ACTION")
        dispatch(commentActions.CreateComment(payload))
        setCommentTextFieldVal("")


    }

    function handleAnnouncementCommentCreation(e) {
        e.preventDefault();

        const payload = {
            text: commentTextFieldVal,
            eventId: null,
            announcementId: announcementId,
            userId: user?.id,
        }
        console.log(payload, "CREATE ACTION")
        dispatch(commentActions.CreateComment(payload))
        setCommentTextFieldVal("")
    }



    useEffect(() => {
        setHide(true)

        dispatch(commentActions.GetComments())
    }, [dispatch])
    // console.log(commentId)
    // console.log(commentText)

    return (
        <div className="comments_outmost_ctnr">
            <div className="comments_view">
                {eventId && currentEventComments?.map((comment, idx) =>
                    <div key={idx} className="comments_in_view_ctnr">
                        <li className="comments_in_view" >{comment?.text}</li>
                        {
                            user?.id === comment.userId &&
                            <div className="comments_btns">
                                <li onClick={(e) => {
                                    dispatch(commentActions.DeleteComment({ id: comment?.id, eventId: currentEvent?.id }))
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
                {announcementId && currentAnnouncementComments?.map((comment, idx) =>
                    <div key={idx} className="comments_in_view_ctnr">
                        <li className="comments_in_view" >{comment?.text}</li>
                        {
                            user?.id === comment.userId &&
                            <div className="comments_btns">
                                <li onClick={(e) => {
                                    dispatch(commentActions.DeleteComment({ id: comment?.id, eventId: currentEvent?.id }))
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
            {eventId && <form onSubmit={handleEventCommentCreation}>
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
            </form>}
            {announcementId && <form onSubmit={handleAnnouncementCommentCreation}>
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
            </form>}
        </div>
    )
}