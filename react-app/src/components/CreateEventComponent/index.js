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

    const [imageURLView, setImageURLView] = useState(true)
    const [titleDescriptionView, setTitleDescriptionView] = useState(false)
    const [dateTimeView, setDateTimeView] = useState(false)
    const [endOfForm, setEndOfForm] = useState(false)

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

    console.log(imageURLOne, imageURLTwo, imageURLThree, eventTitle, eventDescription, eventStartDate, eventEndDate, eventStartTime, eventEndTime)

    return (
        <div className="createEvent_outmost_ctnr">
            <div className="createEvent_instructions">
                <h3 className="createEvent_text_label" >Create an Announcement</h3>
                <p className="createEvent_text">Events are integral for community members to communicate with each other. Events can be anything from a garage sale to a wedding. The Youth are welcome to post their events here as well so they can coordinate with other youth members to plan their gatherings. Complete the form fully and share with everyone what you have going on in life.</p>
            </div>
            <div className="createEvent_inner_ctnr" >
                <ul className="createEvent_errors">
                    {validationErrors.map(error =>
                        <li>{error}</li>
                    )}
                </ul>
                <form className="eventForm_ctnr" onSubmit={handleEventSubmit}>
                    <div className="conditionalRender_wrapper">
                        {imageURLView &&
                            <div className="eventImgURL_outer_ctnr" >
                                <div className="conditionalRender_btns_ctnr">
                                    <li className="conditionalRender_save" onClick={() => {
                                        setImageURLView(false);
                                        setTitleDescriptionView(true);
                                        setDateTimeView(false);
                                    }} >
                                        Save
                                    </li>
                                </div>
                                <p className="eventImg_instruction">
                                    You can add up to 3 images
                                </p>
                                <label className="eventImgURLOne_ctnr">
                                    <div className="eventImgURLOne_label">
                                        Image URL:
                                    </div>
                                    <input
                                        type="text"
                                        name="imageURLOne"
                                        value={imageURLOne}
                                        className="eventImgURLOne_input"
                                        onChange={(e) => setImageURLOne(e.target.value)}
                                    />
                                </label>
                                <label className="eventImgURLTwo_ctnr" >
                                    <div className="eventImgURLTwo_label" >
                                        imageURLTwo:
                                    </div>
                                    <input
                                        type="text"
                                        name="imageURLTwo"
                                        value={imageURLTwo}
                                        className="eventImgURLTwo_input"
                                        onChange={(e) => setImageURLTwo(e.target.value)}
                                    />
                                </label>
                                <label className="eventImgURLThree_ctnr" >
                                    <div className="eventImgURLThree_label" >
                                        imageURLThree:
                                    </div>
                                    <input
                                        type="text"
                                        name="imageURLThree"
                                        value={imageURLThree}
                                        className="eventImgURLThree_input"
                                        onChange={(e) => setImageURLThree(e.target.value)}
                                    />
                                </label>
                            </div>
                        }
                        {titleDescriptionView &&
                            <div className="createEvent_titleDescription_ctnr">
                                <div className="createEvent_btns_ctnr">
                                    <li className="createEvent_btn_back" onClick={() => {
                                        setImageURLView(true);
                                        setTitleDescriptionView(false);
                                        setDateTimeView(false);
                                    }} >
                                        Back
                                    </li>
                                    <li className="createEvent_btn_save" onClick={() => {
                                        setImageURLView(false);
                                        setTitleDescriptionView(false);
                                        setDateTimeView(true);
                                        setEndOfForm(true);
                                    }} >
                                        Save
                                    </li>
                                </div>
                                <div className="createEvent_inputs_ctnr">
                                    <p className="eventDescription_instruction">
                                        Add an Event Title and Description
                                    </p>
                                    <label className="createEventTitle_ctnr">
                                        <div className="createEventTitle_label">
                                            Title:
                                        </div>
                                        <input
                                            type="text"
                                            name="eventTitle"
                                            value={eventTitle}
                                            className="createEventTitle_input"
                                            onChange={(e) => setEventTitle(e.target.value)}
                                        />
                                    </label>
                                    <label className="createEventDescription_ctnr" >
                                        <div className="createEventDescription_label" >
                                            Description:
                                        </div>
                                        <textarea
                                            type="text"
                                            name="eventDescription"
                                            value={eventDescription}
                                            className="createEventDescription_input"
                                            onChange={(e) => setEventDescription(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </div>
                        }
                        {dateTimeView &&
                            <div className="createEvent_datetime_ctnr">
                                <div className="createEvent_btns_ctnr">
                                    <li className="createEvent_btn_back" onClick={() => {
                                        setImageURLView(false);
                                        setTitleDescriptionView(true);
                                        setDateTimeView(false);
                                    }} >
                                        Back
                                    </li>
                                </div>
                                <p className="dateTime_instruction">
                                    Add Event Date and Time
                                </p>
                                <div className="createEvent_input_ctnr" >
                                    <label className="createEvent_startDate_wrapper" >
                                        <div className="createEvent_startDate_label" >
                                            Start Date:
                                        </div>
                                        <input
                                            type="date"
                                            name="eventStartDate"
                                            value={eventStartDate}
                                            className="createEvent_startDate_input"
                                            onChange={(e) => setEventStartDate(e.target.value)}
                                        />
                                    </label>
                                    <label className="createEvent_endDate_wrapper" >
                                        <div className="createEvent_endDate_label" >
                                            End Date:
                                        </div>
                                        <input
                                            type="date"
                                            name="eventEndDate"
                                            value={eventEndDate}
                                            className="createEvent_endDate_input"
                                            onChange={(e) => setEventEndDate(e.target.value)}
                                        />
                                    </label>
                                    <label className="createEvent_startTime_wrapper" >
                                        <div className="createEvent_startTime_label" >
                                            Start Time:
                                        </div>
                                        <input
                                            type="time"
                                            name="eventStartTime"
                                            value={eventStartTime}
                                            className="createEvent_startTime_input"
                                            onChange={(e) => setEventStartTime(e.target.value)}
                                        />
                                    </label>
                                    <label className="createEvent_endTime_wrapper" >
                                        <div className="createEvent_endTime_label" >
                                            End Time:
                                        </div>
                                        <input
                                            type="time"
                                            name="eventEndTime"
                                            value={eventEndTime}
                                            className="createEvent_endTime_input"
                                            onChange={(e) => setEventEndTime(e.target.value)}
                                        />
                                    </label>
                                </div>
                                {endOfForm &&
                                    <div className="eventForm_Btn_ctnr" >
                                        <button type="submit" className="eventForm_Btn" disabled={validationErrors.length > 0} >
                                            Submit
                                        </button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}