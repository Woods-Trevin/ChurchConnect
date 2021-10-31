import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/event'
import './UpdateEventComponent.css';
import Footer from '../Footer';


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

    const [validationErrors, setValidationErrors] = useState([])
    // console.log(updateEventStartTime, updateEventEndTime)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(eventActions.GetOneEvent(eventId))
        const errors = [];

        if (updateImageOne.length > 700) errors.push('Image url is too long');
        if (updateImageTwo.length > 700) errors.push('Image url is too long');
        if (updateImageThree.length > 700) errors.push('Image url is too long');
        if (!updateEventTitle) errors.push('Event must include a Title');
        if (updateEventTitle.length > 200) errors.push('Event title is too long');
        if (!updateEventDescription) errors.push('Event must include a Description');
        if (updateEventDescription.length > 1000) errors.push('Event description is too long');
        if (!updateEventStartDate) errors.push('Event must include a Start Date')
        if (!updateEventEndDate) errors.push('Event must include a End Date')
        if (!updateEventStartTime) errors.push('Event must include a Start Time')
        if (!updateEventEndTime) errors.push('Event must include a End Time')

        setValidationErrors(errors)
    }, [dispatch, eventId, updateImageOne, updateImageTwo, updateImageThree, updateEventTitle, updateEventDescription, updateEventStartDate, updateEventEndDate, updateEventStartTime, updateEventEndTime])


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
        const errors = dispatch(eventActions.PatchEvent(payload))
        console.log(errors)
    }

    return (
        <div className="updateEvent_outer_ctnr">
            <div className="updateEvent_inner_ctnr">
                <ul className="updateEvent_errors">
                    {validationErrors.map(error =>
                        <li>{error}</li>
                    )}
                </ul>
                <div className="updateEvent_form_wrapper" >
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
                            <div className="updateEventForm_Btn_ctnr">
                                <button type="submit" className="updateEventForm_Btn" disabled={validationErrors.length > 0}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="updateEvent_Footer">
                <Footer />
            </div>
        </div>
    )
}