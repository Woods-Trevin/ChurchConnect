import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import * as commentActions from '../../store/comment'
import * as replyActions from '../../store/reply'
import './CommentComponent.css';
import CommentForm from "./commentform";
import Modal from '../Modal'
import ReplyForm from "./ReplyForm";


export default function CommentComponent({ eventId, announcementId, setCurrentEventComments }) {
    const dispatch = useDispatch()
    const [commentTextFieldVal, setCommentTextFieldVal] = useState("")
    const [hideCommentModal, setHideCommentModal] = useState(false);
    const [hideReplyModal, setHideReplyModal] = useState(false);
    const [commentId, setCommentId] = useState()
    const [replyId, setReplyId] = useState()
    const [replyCommentId, setReplyCommentId] = useState()
    const [commentText, setCommentText] = useState("")
    const [replyText, setReplyText] = useState("")
    const [allowReply, setAllowReply] = useState(false)
    const [viewReplies, setViewReplies] = useState(false)

    const [validationErrors, setValidationErrors] = useState([])
    const [replyValidationErrors, setReplyValidationErrors] = useState([])
    // const [viewReplyLabel, setViewReplyLabel] = useState(true)


    // console.log(eventId, '---------------EVENT ID----------')
    // console.log(announcementId, '---------------Announcement ID----------')
    const currentEvent = useSelector(state => state.event.currentevent)
    const currentAnnouncement = useSelector(state => state.announcement.current_announcement)
    // console.log(currentAnnouncement.id, '---------------Announcement')

    const comments = useSelector(state => state.comment.comments)
    const currentEventComments = comments?.filter(comment => comment.eventId === currentEvent?.id)
    const currentAnnouncementComments = comments?.filter(comment => comment.announcementId === currentAnnouncement?.id)
    // console.log(comments, "--------------------All Comments")

    const user = useSelector(state => state.session.user)

    const replies = useSelector(state => state.reply.replies)
    // console.log(replies, "--------------------------------------------------------All Replies")
    const currentCommentReplies = replies?.filter(reply => reply.comment_id === replyCommentId)
    // console.log(currentCommentReplies, '---------------current comment replies')
    console.log(replyText.length, '--------------------')



    // console.log(replyCommentId)

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
        setReplyText("")

    }



    useEffect(() => {
        setHideCommentModal(true)
        setHideReplyModal(true)

        const errors = [];
        const replyErrors = [];

        if (!commentTextFieldVal) errors.push('There was no entry. Please write your comment.')
        if (commentTextFieldVal.length > 400) errors.push('Comment is too long.')

        setValidationErrors(errors)

        if (replyText.length === 0) replyErrors.push('Cannot submit empty reply.')
        if (replyText.length > 400) replyErrors.push('Reply is too long.')
        setReplyValidationErrors(replyErrors)

    }, [dispatch, commentTextFieldVal, replyText])
    // console.log(commentId)
    // console.log(commentText)

    return (
        <div className="comments_outmost_ctnr">
            <div className="comments_inner_ctnr">
                <div className="comments_view">
                    {eventId && currentEventComments?.map((comment, idx) =>
                        <div>
                            <div key={idx} className="comments_in_view_outer_ctnr">
                                <div className="comments_in_view_ctnr">
                                    <li className="comments_in_view" >{comment?.text}</li>
                                    <li className="comments_username">
                                        <img className="comment_userIcon" src='https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png' alt="alt" />
                                        {comment?.username}
                                    </li>
                                </div>
                                <div className="accessory_btn_ctnr" >
                                    {
                                        user?.id === comment.userId &&
                                        <div className="comments_btns">
                                            <li className="eventComment_delete_btn" onClick={(e) => {
                                                dispatch(commentActions.DeleteComment({ id: comment?.id, replies: currentCommentReplies }))
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
                                    <div className="viewRepliesLabel_ctnr">
                                        <li className="viewReplies_text" onClick={() => {
                                            setViewReplies(true)
                                            setReplyCommentId(comment?.id)
                                            // setViewReplyLabel(false)
                                        }}>
                                            View Replies
                                        </li>
                                        <div className="repliesCount">
                                            {`(${replies?.filter(reply => reply.comment_id === comment?.id).length})`}
                                        </div>
                                    </div>


                                    {replyCommentId === comment?.id && <div>
                                        {viewReplies &&
                                            <div className="replies_inner_ctnr">
                                                <div className="replyText_items_ctnr" >
                                                    {currentCommentReplies?.map((reply, idx) =>
                                                        <div className="replyText_wrapper" key={idx}>
                                                            <div className="replyText_text_ctnr">
                                                                <li className="replyText text"> {reply?.text} </li>
                                                                <li className="replyText_username">
                                                                    <img className="replyText_userIcon" src='https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png' alt="alt" />
                                                                    {reply?.username}
                                                                </li>
                                                            </div>
                                                            {user?.id === reply?.userId && <div className="replyBtns_ctnr">
                                                                <li className="replyText delete" onClick={() => {
                                                                    dispatch(replyActions.DeleteReply(reply?.id))
                                                                }}>
                                                                    Delete
                                                                </li>
                                                                <li className="replyText edit" onClick={() => {
                                                                    setHideReplyModal(false)
                                                                    setReplyId(reply?.id)
                                                                    setReplyText(reply?.text)
                                                                }}>
                                                                    Edit
                                                                </li>
                                                            </div>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="allowReply_ctnr">
                                                    <div className="allowReply_form_ctnr">
                                                        <li className="allowReply_text" onClick={() => { setAllowReply(true) }}>
                                                            Reply
                                                        </li>
                                                        {allowReply &&
                                                            <form className="replyTF_ctnr" onSubmit={handleReplyCreation}>
                                                                {replyValidationErrors.map(error =>
                                                                    <li>{error}</li>
                                                                )}
                                                                <textarea
                                                                    type="text"
                                                                    name="reply_textField"
                                                                    value={replyText}
                                                                    className="replyTF"
                                                                    onChange={(e) => { setReplyText(e.target.value) }}
                                                                />
                                                                <button className="reply_submit_btn" type="submit" disabled={replyValidationErrors.length > 0}> Post </button>
                                                            </form>
                                                        }
                                                    </div>
                                                </div>
                                                <li className="hideReplies_text" onClick={() => {
                                                    setViewReplies(false)
                                                    // setViewReplyLabel(true)
                                                }}>
                                                    Hide Replies
                                                </li>
                                            </div>
                                        }
                                    </div>}

                                </div>
                            </div>

                        </div>
                    )}
                    {announcementId && currentAnnouncementComments?.map((comment, idx) =>
                        <div>
                            <div key={idx} className="comments_in_view_outer_ctnr">
                                <div className="comments_in_view_ctnr">
                                    <li className="comments_in_view" >{comment?.text}</li>
                                    <li className="comments_username">
                                        <img className="comment_userIcon" src='https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png' alt="alt" />
                                        {comment?.username}
                                    </li>
                                </div>
                                <div className="accessory_btn_ctnr" >
                                    {
                                        user?.id === comment.userId &&
                                        <div className="comments_btns">
                                            <li className="eventComment_delete_btn" onClick={(e) => {
                                                dispatch(commentActions.DeleteComment({ id: comment?.id, replies: currentCommentReplies }))
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
                                    <div className="viewRepliesLabel_ctnr">
                                        <li className="viewReplies_text" onClick={() => {
                                            setViewReplies(true)
                                            setReplyCommentId(comment?.id)
                                            // setViewReplyLabel(false)
                                        }}>
                                            View Replies
                                        </li>
                                        <div className="repliesCount">
                                            {`(${replies?.filter(reply => reply.comment_id === comment?.id).length})`}
                                        </div>
                                    </div>


                                    {replyCommentId === comment?.id && <div>
                                        {viewReplies &&
                                            <div className="replies_inner_ctnr">
                                                <div className="replyText_items_ctnr" >
                                                    {currentCommentReplies?.map((reply, idx) =>
                                                        <div className="replyText_wrapper" key={idx}>
                                                            <div className="replyText_text_ctnr">
                                                                <li className="replyText text"> {reply?.text} </li>
                                                                <li className="replyText_username">
                                                                    <img className="replyText_userIcon" src='https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png' alt="alt" />
                                                                    {reply?.username}
                                                                </li>
                                                            </div>
                                                            {user?.id === reply?.userId && <div className="replyBtns_ctnr">
                                                                <li className="replyText delete" onClick={() => {
                                                                    dispatch(replyActions.DeleteReply(reply?.id))
                                                                }}>
                                                                    Delete
                                                                </li>
                                                                <li className="replyText edit" onClick={() => {
                                                                    setHideReplyModal(false)
                                                                    setReplyId(reply?.id)
                                                                    setReplyText(reply?.text)
                                                                }}>
                                                                    Edit
                                                                </li>
                                                            </div>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="allowReply_ctnr">
                                                    <div className="allowReply_form_ctnr">
                                                        <li className="allowReply_text" onClick={() => { setAllowReply(true) }}>
                                                            Reply
                                                        </li>
                                                        {allowReply &&
                                                            <form className="replyTF_ctnr" onSubmit={handleReplyCreation}>
                                                                {replyValidationErrors.map(error =>
                                                                    <li>{error}</li>
                                                                )}
                                                                <textarea
                                                                    type="text"
                                                                    name="reply_textField"
                                                                    value={replyText}
                                                                    className="replyTF"
                                                                    onChange={(e) => { setReplyText(e.target.value) }}
                                                                />
                                                                <button className="reply_submit_btn" type="submit" disabled={replyValidationErrors.length > 0}> Post </button>
                                                            </form>
                                                        }
                                                    </div>
                                                </div>
                                                <li className="hideReplies_text" onClick={() => {
                                                    setViewReplies(false)
                                                    // setViewReplyLabel(true)
                                                }}>
                                                    Hide Replies
                                                </li>
                                            </div>
                                        }
                                    </div>}

                                </div>
                            </div>
                        </div>
                    )}

                    <Modal title='Edit This Comment' onClose={() => setHideCommentModal(true)} hideCommentModal={hideCommentModal} >
                        <CommentForm commentId={commentId} commentText={commentText} setHideCommentModal={setHideCommentModal} />
                    </Modal>
                    <Modal title='Edit This Reply' onClose={() => setHideReplyModal(true)} hideReplyModal={hideReplyModal} >
                        <ReplyForm replyId={replyId} replyText={replyText} setHideReplyModal={setHideReplyModal} />
                    </Modal>
                </div>
                {eventId &&
                    <div>

                        <form onSubmit={handleEventCommentCreation}>
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
                                    <button className="post_comment_btn" type="submit" disabled={validationErrors.length > 0} >Post</button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
                {announcementId &&
                    <form onSubmit={handleAnnouncementCommentCreation}>
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
                                <button className="post_comment_btn" type="submit" disabled={validationErrors.length > 0} >Post</button>
                            </div>
                        </div>
                    </form>
                }
            </div>
        </div >
    )
}