import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/event'
import './UpdateEventComponent.css';


export default function UpdateEventComponent({ setUpdateEvent }) {
    const { eventId } = useParams()
    console.log(eventId, '---------------')
    const event = useSelector(state => state.event.currentevent)


    const [updateImageOne, setUpdateImageOne] = useState(event?.imageURL)
    const [updateImageTwo, setUpdateImageTwo] = useState(event?.imageURLTwo)
    const [updateImageThree, setUpdateImageThree] = useState(event?.imageURLThree)
    const [updateEventTitle, setUpdateEventTitle] = useState(event?.title)
    const [updateEventDescription, setUpdateEventDescription] = useState(event?.description)
    const [updateEventStartDate, setUpdateEventStartDate] = useState(event?.startDate)
    const [updateEventEndDate, setUpdateEventEndDate] = useState(event?.endDate)
    const [updateEventStartTime, setUpdateEventStartTime] = useState(event?.startTime)
    const [updateEventEndTime, setUpdateEventEndTime] = useState(event?.endTime)

    console.log(updateEventStartTime, updateEventEndTime)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(eventActions.GetOneEvent(eventId))
    }, [dispatch, eventId])

    useEffect(() => {

    }, [])


    function UpdateEventHandler(e) {
        e.preventDefault()
        const payload = {
            imageURL: updateImageOne,
            imageURLTwo: updateImageTwo,
            imageURLThree: updateImageThree,
            title: updateEventTitle,
            description: updateEventDescription,
            startDate: updateEventStartDate,
            endDate: updateEventEndDate,
            startTime: updateEventStartTime,
            endTime: updateEventEndTime,
            idx: eventId
        }
        dispatch(eventActions.PatchEvent(payload))
    }

    return (
        <div>
            <h1>
                Update Event Component
            </h1>
            <div>
                <form onSubmit={UpdateEventHandler}>
                    <div>
                        <div>
                            <label>
                                <div>
                                    imageURL:
                                </div>
                                <input
                                    type="text"
                                    name="updateImageOne"
                                    value={updateImageOne}
                                    onChange={(e) => setUpdateImageOne(e.target.value)}
                                />
                            </label>
                            <label>
                                <div>
                                    imageURLTwo:
                                </div>
                                <input
                                    type="text"
                                    name="updateImageTwo"
                                    value={updateImageTwo}
                                    onChange={(e) => setUpdateImageTwo(e.target.value)}
                                />
                            </label>
                            <label>
                                <div>
                                    imageURLThree:
                                </div>
                                <input
                                    type="text"
                                    name="updateImageThree"
                                    value={updateImageThree}
                                    onChange={(e) => setUpdateImageThree(e.target.value)}
                                />
                            </label>
                            <label>
                                <div>
                                    Title:
                                </div>
                                <input
                                    type="text"
                                    name="updateEventTitle"
                                    value={updateEventTitle}
                                    onChange={(e) => setUpdateEventTitle(e.target.value)}
                                />
                            </label>
                            <label>
                                <div>
                                    Description:
                                </div>
                                <textarea
                                    type="text"
                                    name="updateEventDescription"
                                    value={updateEventDescription}
                                    onChange={(e) => setUpdateEventDescription(e.target.value)}
                                />
                            </label>
                            <label>
                                <div>
                                    Start Date:
                                </div>
                                <input
                                    type="date"
                                    name="updateEventStartDate"
                                    value={updateEventStartDate}
                                    onChange={(e) => setUpdateEventStartDate(e.target.value)}
                                />
                            </label>
                            <label>
                                <div>
                                    End Date:
                                </div>
                                <input
                                    type="date"
                                    name="updateEventEndDate"
                                    value={updateEventEndDate}
                                    onChange={(e) => setUpdateEventEndDate(e.target.value)}
                                />
                            </label>
                            <label>
                                <div>
                                    Start Time:
                                </div>
                                <input
                                    type="time"
                                    name="updateEventStartTime"
                                    value={updateEventStartTime}
                                    onChange={(e) => setUpdateEventStartTime(e.target.value)}
                                />
                            </label>
                            <label>
                                <div>
                                    End Time:
                                </div>
                                <input
                                    type="time"
                                    name="updateEventEndTime"
                                    value={updateEventEndTime}
                                    onChange={(e) => setUpdateEventEndTime(e.target.value)}
                                />
                            </label>
                        </div>
                        <button type="submit" className="eventForm_Btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}