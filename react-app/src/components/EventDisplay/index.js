import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/event'
import * as commentActions from '../../store/comment'
import * as replyActions from '../../store/reply'
import './EventDisplay.css';
import CommentComponent from '../CommentsComponent';
import Footer from '../Footer';

export default function EventDisplay({ setUpdateEvent }) {
    const { eventId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        dispatch(eventActions.GetOneEvent(eventId))
        dispatch(commentActions.GetComments())
        dispatch(replyActions.GetReplies())
    }, [dispatch, eventId])


    console.log(eventId, '---------------')
    const user = useSelector(state => state.session.user)
    const event = useSelector(state => state.event.currentevent)
    // console.log(event?.comments, '---------------')
    const comments = useSelector(state => state.comment.comments)

    const replies = useSelector(state => state.reply.replies)

    console.log(comments, '---------------COMMENTS')
    console.log(replies, '---------------REPLIES')

    const currentEventComments = comments?.filter(comment => comment?.eventId === event?.id)
    console.log('current event comments---------', currentEventComments)
    // const currentEventReplies = replies?.filter(reply => reply.id === eventId)

    const currentEventCommentsReplies = [];
    for (let i = 0; i < currentEventComments?.length; i++) {
        const currentElement = currentEventComments[i];
        for (let i = 0; i < replies?.length; i++) {
            if (replies[i].comment_id === currentElement.id) {
                currentEventCommentsReplies.push(replies[i]);
            }
        }
    }
    console.log(currentEventCommentsReplies);

    // const [currentEventComments, setCurrentEventComments] = useState([])
    // console.log(currentEventComments, '---------------CURRENT EVENT COMMENTS')

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    function handleDelete(e) {
        e.preventDefault()
        const payload = {
            eventId: eventId,
            comments: currentEventComments,
            replies: currentEventCommentsReplies,

        }
        dispatch(eventActions.DeleteEvent(payload))
        history.push('/')
    }

    function handleUpdate(e) {
        e.preventDefault()
        setUpdateEvent(true)
    }


    return (
        <div>
            <div className="EventDisplay_outmost_container">
                <div className="EventDisplay_inner_container">
                    <div className="EventDisplay_item_container" >
                        {(event?.imageURL || event?.imageURLTwo || event?.imageURLThree) && <div className="EventDisplay_image_container" >
                            {/* {event?.imageURL} */}
                            <img className="eventDisplay_img_one" src={event?.imageURL} alt="alt" />
                            <img className="eventDisplay_img_two" src={event?.imageURLTwo} alt="alt" />
                            <img className="eventDisplay_img_three" src={event?.imageURLThree} alt="alt" />
                        </div>}
                        <div className="eventDisplay_title" >
                            {event?.title}
                        </div>
                        <div className="eventDisplay_description" >
                            {event?.description}
                        </div>
                        <div className="eventDisplay_alldatetime_ctnr" >
                            <div className="eventDisplay_startDateTime_ctnr" >
                                <div className="eventDisplay_startDate" >
                                    {new Date(new Date(event?.startDate).setDate(new Date(event?.startDate).getDate() + 1)).toLocaleDateString(undefined, options)}
                                </div>
                                <div className="eventDisplay_startTime">
                                    {new Date('1970-01-01T' + event?.startTime + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })}
                                </div>
                            </div>
                            <div className="eventDisplay_endDateTime_ctnr" >
                                <div className="eventDisplay_endDate">
                                    {new Date(new Date(event?.endDate).setDate(new Date(event?.endDate).getDate() + 1)).toLocaleDateString(undefined, options)}
                                </div>
                                <div className="eventDisplay_endTime" >
                                    {new Date('1970-01-01T' + event?.endTime + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {((user?.id === event?.userId) && user) && <div className="eventDisplay_btn_ctnr">
                        <li className="eventDisplay_delete_btn" onClick={(e) => handleDelete(e)}>Delete</li>
                        <li className="eventDisplay_update_btn" onClick={(e) => handleUpdate(e)}>Update</li>
                    </div>}
                </div>
                <div className="eventDisplay_commentreply_ctnr">
                    <CommentComponent eventId={eventId} />
                </div>
            </div >
            <div className="eventDisplay_Footer">
                <Footer />
            </div>
        </div>
    )
}