import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import * as commentActions from '../../store/comment'
import * as replyActions from '../../store/reply'
import './CommentComponent.css';
import CommentForm from "./commentform";
import Modal from '../Modal'


export default function CommentComponent({ eventId, announcementId }) {
    const dispatch = useDispatch()
    const [commentTextFieldVal, setCommentTextFieldVal] = useState("")
    const [hideCommentModal, setHideCommentModal] = useState(false);
    const [commentId, setCommentId] = useState()
    const [replyCommentId, setReplyCommentId] = useState()
    const [commentText, setCommentText] = useState("")
    const [replyText, setReplyText] = useState("")
    const [allowReply, setAllowReply] = useState(false)
    const [viewReplies, setViewReplies] = useState(false)
    // const [viewReplyLabel, setViewReplyLabel] = useState(true)


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

    const replies = useSelector(state => state.reply.replies)
    console.log(replies)
    const currentCommentReplies = replies?.filter(reply => reply.comment_id === replyCommentId)
    console.log(currentCommentReplies, '---------------current comment replies')




    console.log(replyCommentId)

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

    function handleReplyCreation(e) {
        e.preventDefault();
        const payload = {
            text: replyText,
            commentId: replyCommentId,
            userId: user?.id,
        }
        dispatch(replyActions.CreateReply(payload))
        setAllowReply(false);

    }



    useEffect(() => {
        setHideCommentModal(true)

        dispatch(commentActions.GetComments())
        dispatch(replyActions.GetReplies())
    }, [dispatch])
    // console.log(commentId)
    // console.log(commentText)

    return (
        <div className="comments_outmost_ctnr">
            <div className="comments_view">
                {eventId && currentEventComments?.map((comment, idx) =>
                    <div>
                        <div key={idx} className="comments_in_view_ctnr">
                            <div>
                                <li className="comments_in_view" >{comment?.text}</li>
                            </div>
                            <div className="accessory_btn_ctnr" >
                                {
                                    user?.id === comment.userId &&
                                    <div className="comments_btns">
                                        <li className="eventComment_delete_btn" onClick={(e) => {
                                            dispatch(commentActions.DeleteComment({ id: comment?.id, eventId: currentEvent?.id }))
                                        }}>
                                            Delete
                                        </li>
                                        <li className="eventComment_edit_btn" onClick={() => {
                                            setHideCommentModal(false)
                                            setCommentId(comment?.id)
                                            setCommentText(comment?.text)
                                        }} >
                                            Edit
                                        </li>
                                    </div>
                                }

                            </div>
                            <div className="replies_outmost_ctnr">
                                <li className="viewReplies_text" onClick={() => {
                                    setViewReplies(true)
                                    setReplyCommentId(comment?.id)
                                    // setViewReplyLabel(false)
                                }}>
                                    View Replies
                                </li>
                                {replyCommentId === comment?.id && <div>
                                    {viewReplies &&
                                        <div className="replies_inner_ctnr">
                                            <div className="replyItems_ctnr" >
                                                {currentCommentReplies?.map((reply, idx) =>
                                                    <div key={idx}>
                                                        <li> {reply?.text} </li>
                                                    </div>
                                                )}
                                            </div>
                                            <li className="hideReplies_text" onClick={() => {
                                                setViewReplies(false)
                                                // setViewReplyLabel(true)
                                            }}>
                                                Hide Replies
                                            </li>
                                            <div className="allowReply_ctnr">
                                                <li className="allowReply_text" onClick={() => { setAllowReply(true) }}>
                                                    Reply
                                                </li>

                                            </div>
                                        </div>
                                    }
                                    <div>
                                        {allowReply &&
                                            <form onSubmit={handleReplyCreation}>
                                                <input
                                                    type="text"
                                                    name="reply_textField"
                                                    value={replyText}
                                                    onChange={(e) => { setReplyText(e.target.value) }}
                                                />
                                                <button type="submit" > submit </button>
                                            </form>
                                        }
                                    </div>
                                </div>}

                            </div>
                        </div>

                    </div>
                )}
                {announcementId && currentAnnouncementComments?.map((comment, idx) =>
                    <div>
                        <div key={idx} className="comments_in_view_ctnr">
                            <div>
                                <li className="comments_in_view" >{comment?.text}</li>
                            </div>
                            <div className="accessory_btn_ctnr" >
                                {
                                    user?.id === comment.userId &&
                                    <div className="comments_btns">
                                        <li className="eventComment_delete_btn" onClick={(e) => {
                                            dispatch(commentActions.DeleteComment({ id: comment?.id, eventId: currentEvent?.id }))
                                        }}>
                                            Delete
                                        </li>
                                        <li className="eventComment_edit_btn" onClick={() => {
                                            setHideCommentModal(false)
                                            setCommentId(comment?.id)
                                            setCommentText(comment?.text)
                                        }} >
                                            Edit
                                        </li>
                                    </div>
                                }

                            </div>
                            <div className="replies_outmost_ctnr">
                                <li className="viewReplies_text" onClick={() => {
                                    setViewReplies(true)
                                    setReplyCommentId(comment?.id)
                                    // setViewReplyLabel(false)
                                }}>
                                    View Replies
                                </li>
                                {replyCommentId === comment?.id && <div>
                                    {viewReplies &&
                                        <div className="replies_inner_ctnr">
                                            <div className="replyItems_ctnr" >
                                                {currentCommentReplies?.map((reply, idx) =>
                                                    <div key={idx}>
                                                        <li> {reply?.text} </li>
                                                    </div>
                                                )}
                                            </div>
                                            <li className="hideReplies_text" onClick={() => {
                                                setViewReplies(false)
                                                // setViewReplyLabel(true)
                                            }}>
                                                Hide Replies
                                            </li>
                                            <div className="allowReply_ctnr">
                                                <li className="allowReply_text" onClick={() => { setAllowReply(true) }}>
                                                    Reply
                                                </li>

                                            </div>
                                        </div>
                                    }
                                    <div>
                                        {allowReply &&
                                            <form onSubmit={handleReplyCreation}>
                                                <input
                                                    type="text"
                                                    name="reply_textField"
                                                    value={replyText}
                                                    onChange={(e) => { setReplyText(e.target.value) }}
                                                />
                                                <button type="submit" > submit </button>
                                            </form>
                                        }
                                    </div>
                                </div>}

                            </div>
                        </div>

                    </div>
                )}

                <Modal title='Edit This Comment' onClose={() => setHideCommentModal(true)} hideCommentModal={hideCommentModal} >
                    <CommentForm commentId={commentId} commentText={commentText} setHideCommentModal={setHideCommentModal} />
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