import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as announcementActions from '../../store/announcement'
import * as commentActions from '../../store/comment'
import * as replyActions from '../../store/reply'
import { createBrowserHistory } from 'history'
import './AnnouncementDisplay.css';
import CommentComponent from '../CommentsComponent';
import Footer from '../Footer'

// const history = createBrowserHistory()
export default function AnnouncementDisplay({ setUpdateAnnouncement }) {
    const { announcementId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        dispatch(announcementActions.GetOneAnnouncement(announcementId))
        dispatch(commentActions.GetComments())
        dispatch(replyActions.GetReplies())
    }, [dispatch, announcementId, history])


    const current_announcement = useSelector(state => state.announcement.current_announcement)
    console.log(current_announcement)
    const current_user = useSelector(state => state.session.user)
    console.log(current_user, 'current user')

    const comments = useSelector(state => state.comment.comments)

    const replies = useSelector(state => state.reply.replies)

    console.log(comments, '---------------COMMENTS')
    console.log(replies, '---------------REPLIES')

    const currentAnnouncementComments = comments?.filter(comment => comment?.announcementId === current_announcement?.id)
    console.log('current announcement comments---------', currentAnnouncementComments)

    const currentAnnouncementCommentsReplies = [];
    for (let i = 0; i < currentAnnouncementComments?.length; i++) {
        const currentElement = currentAnnouncementComments[i];
        for (let i = 0; i < replies?.length; i++) {
            if (replies[i].comment_id === currentElement.id) {
                currentAnnouncementCommentsReplies.push(replies[i]);
            }
        }
    }
    console.log(currentAnnouncementCommentsReplies);




    function handleAnnouncementUpdate(e) {
        e.preventDefault();
        setUpdateAnnouncement(true);
    }

    function handleAnnouncementDeletion(e) {
        e.preventDefault();
        const payload = {
            announcementId: announcementId,
            comments: currentAnnouncementComments,
            replies: currentAnnouncementCommentsReplies
        }
        dispatch(announcementActions.DeleteAnnouncement(payload));
        history.push('/');
        history.go(0);

    }


    return (
        <div className="announcementDisplay_outmost_ctnr" >
            <div className="announcementDisplay_inner_ctnr" >
                <div className="announcementDisplay_img_ctnr" >
                    {current_announcement?.imageURL &&
                        <img className="announcementDisplay_img" src={current_announcement?.imageURL} />}

                </div>
                <div className="announcementDisplay_title" >
                    {current_announcement?.title}
                </div>
                <div className="announcementDisplay_description" >
                    {current_announcement?.description}
                </div>
                {((current_user?.id === current_announcement?.userId) && current_user) &&
                    <div className="announcementDisplay_btn_ctnr">
                        <div className="announcementDisplay_update_btn" >
                            <li className="announcementDisplay_btn" onClick={(e) => handleAnnouncementUpdate(e)} >
                                Update
                            </li>
                        </div>
                        <div className="announcementDisplay_delete_btn" >
                            <li className="announcementDisplay_btn" onClick={(e) => handleAnnouncementDeletion(e)} >
                                Delete
                            </li>
                        </div>
                    </div>
                }
            </div>
            <div className="announcementDisplay_commentreplies_ctnr">
                <CommentComponent announcementId={announcementId} />
            </div>
        </div>
    )
}