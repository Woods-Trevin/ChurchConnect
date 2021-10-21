import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as eventActions from '../../store/event'
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

    const user = useSelector(state => state.session.user)
    // console.log(user.id)


    const dispatch = useDispatch();


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
            userId: user?.id

        }
        dispatch(eventActions.CreateEvent(payload))
    }


    return (
        <div>
            <h1>Create Event Component</h1>
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
                    <button type="submit" className="eventForm_Btn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}