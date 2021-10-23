import { useParams, useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/event'
import './EventDisplay.css';

export default function EventDisplay() {
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


    return (
        <div className="EventDisplay_outmost_container">
            <h1>
                Event Display Component
            </h1>
            <div>
                <div>
                    <div>
                        {event?.imageURL}
                    </div>
                    <div>
                        {event?.imageURLTwo}
                    </div>
                    <div>
                        {event?.imageURLThree}
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
            </div>
        </div>
    )
}