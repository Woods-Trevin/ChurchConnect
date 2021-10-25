import { useParams, useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/event'
import './EventDisplay.css';
import CommentComponent from '../CommentsComponent';

export default function EventDisplay({ setUpdateEvent }) {
    const { eventId } = useParams()
    console.log(eventId, '---------------')
    const event = useSelector(state => state.event.currentevent)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(eventActions.GetOneEvent(eventId))
    }, [dispatch, eventId])


    function handleDelete(e) {
        e.preventDefault()
        dispatch(eventActions.DeleteEvent(eventId))
        history.push('/')
    }

    function handleUpdate(e) {
        e.preventDefault()
        setUpdateEvent(true)
    }


    return (
        <div className="EventDisplay_outmost_container">
            <div className="EventDisplay_inner_container">
                <div className="EventDisplay_item_container" >
                    <div className="EventDisplay_image_container" >
                        {/* {event?.imageURL} */}
                        <img className="eventDisplay_img_one" src={event?.imageURL} alt="alt" />
                        <img className="eventDisplay_img_two" src={event?.imageURLTwo} alt="alt" />
                        <img className="eventDisplay_img_three" src={event?.imageURLThree} alt="alt" />
                    </div>
                    <div className="eventDisplay_title" >
                        {event?.title}
                    </div>
                    <div className="eventDisplay_description" >
                        {event?.description}
                    </div>
                    <div className="eventDisplay_startDate" >
                        {event?.startDate}
                    </div>
                    <div className="eventDisplay_endDate">
                        {event?.endDate}
                    </div>
                    <div className="eventDisplay_startTime">
                        {event?.startTime}
                    </div>
                    <div className="eventDisplay_endTime" >
                        {event?.endTime}
                    </div>
                </div>
                <div className="eventDisplay_btn_ctnr">
                    <li className="eventDisplay_delete_btn" onClick={(e) => handleDelete(e)}>Delete</li>
                    <li className="eventDisplay_update_btn" onClick={(e) => handleUpdate(e)}>Update</li>
                </div>
            </div>
            <div className="eventDisplay_commentreply_ctnr">
                <CommentComponent eventId={eventId} />
            </div>
        </div>
    )
}