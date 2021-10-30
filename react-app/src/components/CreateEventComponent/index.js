import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as eventActions from '../../store/event'
import Footer from '../Footer'
import './CreateEventComponent.css'

export default function CreateEventComponent() {
    const [imageURLOne, setImageURLOne] = useState('')
    const [imageURLTwo, setImageURLTwo] = useState('')
    const [imageURLThree, setImageURLThree] = useState('')
    const [eventTitle, setEventTitle] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventStartDate, setEventStartDate] = useState('')
    const [eventEndDate, setEventEndDate] = useState('')
    const [eventStartTime, setEventStartTime] = useState('')
    const [eventEndTime, setEventEndTime] = useState('')

    const [validationErrors, setValidationErrors] = useState([])

    const user = useSelector(state => state.session.user)
    // console.log(user.id)


    const dispatch = useDispatch();
    const history = useHistory();


    function handleEventSubmit(e) {
        e.preventDefault();

        const payload = {
            imageURL: imageURLOne,
            imageURLTwo: imageURLTwo,
            imageURLThree: imageURLThree,
            title: eventTitle,
            description: eventDescription,
            startDate: eventStartDate,
            endDate: eventEndDate,
            startTime: eventStartTime,
            endTime: eventEndTime,
            idx: user.id

        }
        dispatch(eventActions.CreateEvent(payload))
        history.push('/')
    }

    useEffect(() => {
        const errors = [];

        if (imageURLOne.length > 700) errors.push('Image url is too long');
        if (imageURLTwo.length > 700) errors.push('Image url is too long');
        if (imageURLThree.length > 700) errors.push('Image url is too long');
        if (!eventTitle) errors.push('Event must include a Title');
        if (eventTitle.length > 200) errors.push('Event title is too long');
        if (!eventDescription) errors.push('Event must include a Description');
        if (eventDescription.length > 1000) errors.push('Event description is too long');
        if (!eventStartDate) errors.push('Event must include a Start Date')
        if (!eventEndDate) errors.push('Event must include a End Date')
        if (!eventStartTime) errors.push('Event must include a Start Time')
        if (!eventEndTime) errors.push('Event must include a End Time')

        setValidationErrors(errors)


    }, [dispatch, imageURLOne, imageURLTwo, imageURLThree, eventTitle, eventDescription, eventStartDate, eventEndDate, eventStartTime, eventEndTime])


    return (
        <div>
            <ul>
                {validationErrors.map(error =>
                    <li>{error}</li>
                )}
            </ul>
            <form onSubmit={handleEventSubmit}>
                <div>
                    <div>
                        <label>
                            <div>
                                imageURL:
                            </div>
                            <input
                                type="text"
                                name="imageURLOne"
                                value={imageURLOne}
                                onChange={(e) => setImageURLOne(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                imageURLTwo:
                            </div>
                            <input
                                type="text"
                                name="imageURLTwo"
                                value={imageURLTwo}
                                onChange={(e) => setImageURLTwo(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                imageURLThree:
                            </div>
                            <input
                                type="text"
                                name="imageURLThree"
                                value={imageURLThree}
                                onChange={(e) => setImageURLThree(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                Title:
                            </div>
                            <input
                                type="text"
                                name="eventTitle"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                Description:
                            </div>
                            <textarea
                                type="text"
                                name="eventDescription"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                Start Date:
                            </div>
                            <input
                                type="date"
                                name="eventStartDate"
                                value={eventStartDate}
                                onChange={(e) => setEventStartDate(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                End Date:
                            </div>
                            <input
                                type="date"
                                name="eventEndDate"
                                value={eventEndDate}
                                onChange={(e) => setEventEndDate(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                Start Time:
                            </div>
                            <input
                                type="time"
                                name="eventStartTime"
                                value={eventStartTime}
                                onChange={(e) => setEventStartTime(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                End Time:
                            </div>
                            <input
                                type="time"
                                name="eventEndTime"
                                value={eventEndTime}
                                onChange={(e) => setEventEndTime(e.target.value)}
                            />
                        </label>
                    </div>
                    <button type="submit" className="eventForm_Btn" disabled={validationErrors.length > 0} >
                        Submit
                    </button>
                </div>
            </form>
            <div>
                <Footer />
            </div>
        </div>
    )
}