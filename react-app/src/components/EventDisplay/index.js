import { useParams, useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/event'
import './EventDisplay.css';

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
            <h1>
                Event Display Component
            </h1>
            <div>
                <div>
                    <div>
                        {/* {event?.imageURL} */}
                        <img className="eventDisplay_img_one" src={event?.imageURL} alt="alt" />
                        <img className="eventDisplay_img_two" src={event?.imageURLTwo} alt="alt" />
                        <img className="eventDisplay_img_three" src={event?.imageURLThree} alt="alt" />
                    </div>
                    <div>
                        {event?.title}
                    </div>
                    <div>
                        {event?.description}
                    </div>
                    <div>
                        {event?.startDate}
                    </div>
                    <div>
                        {event?.endDate}
                    </div>
                    <div>
                        {event?.startTime}
                    </div>
                    <div>
                        {event?.endTime}
                    </div>
                </div>
                <li className="eventDisplay_delete_btn" onClick={(e) => handleDelete(e)}>Delete</li>
                <li className="eventDisplay_update_btn" onClick={(e) => handleUpdate(e)}>Update</li>
            </div>
        </div>
    )
}