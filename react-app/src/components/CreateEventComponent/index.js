import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as eventActions from '../../store/event'
import Footer from '../Footer'
import './CreateEventComponent.css'

export default function CreateEventComponent() {
    const [imageURLOne, setImageURLOne] = useState(null)
    const [imageURLTwo, setImageURLTwo] = useState(null)
    const [imageURLThree, setImageURLThree] = useState(null)
    const [eventTitle, setEventTitle] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventStartDate, setEventStartDate] = useState('')
    const [eventEndDate, setEventEndDate] = useState('')
    const [eventStartTime, setEventStartTime] = useState('')
    const [eventEndTime, setEventEndTime] = useState('')

    console.log(imageURLOne, imageURLTwo, imageURLThree)

    const [validationErrors, setValidationErrors] = useState([])

    const [imageURLView, setImageURLView] = useState(true)
    const [titleDescriptionView, setTitleDescriptionView] = useState(false)
    const [dateTimeView, setDateTimeView] = useState(false)
    const [endOfForm, setEndOfForm] = useState(false)

    const user = useSelector(state => state.session.user)
    // console.log(user.id)


    const dispatch = useDispatch();
    const history = useHistory();



    const handleEventSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("imageOne", imageURLOne)
        formData.append("imageTwo", imageURLTwo)
        formData.append("imageThree", imageURLThree)
        formData.append("title", eventTitle)
        formData.append("description", eventDescription)
        formData.append("startDate", eventStartDate)
        formData.append("endDate", eventEndDate)
        formData.append("startTime", eventStartTime)
        formData.append("endTime", eventEndTime)
        formData.append("id", user?.id)

        // const payload = {
        //     title: eventTitle,
        //     description: eventDescription,
        //     startDate: eventStartDate,
        //     endDate: eventEndDate,
        //     startTime: eventStartTime,
        //     endTime: eventEndTime,
        //     idx: user.id

        // }
        const response = await dispatch(eventActions.CreateEvent(formData))
        if (response.events) {
            let pos = validationErrors.indexOf("Something was wrong with the information given in this form")
            validationErrors.splice(pos, 1)
            history.push('/')
            history.go(0);

        } else {
            validationErrors.push("Something was wrong with the information given in this form")
        }
    }

    let currentDateSlice;
    let startDateSlice;
    let endDateSlice;

    useEffect(() => {
        const errors = [];

        // if (imageURLOne.length > 700) errors.push('Image url is too long');
        // if (imageURLTwo.length > 700) errors.push('Image url is too long');
        // if (imageURLThree.length > 700) errors.push('Image url is too long');

        // const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        // if (!urlRegex.test(imageURLOne) && imageURLOne) {
        //     errors.push('First URL entered is not valid.')
        // }
        // if (!urlRegex.test(imageURLTwo) && imageURLTwo) {
        //     errors.push('Second URL entered is not valid.')
        // }
        // if (!urlRegex.test(imageURLThree) && imageURLThree) {
        //     errors.push('Third URL entered is not valid.')
        // }



        if (!eventTitle) errors.push('Event must include a Title');
        if (eventTitle.length > 200) errors.push('Event title is too long');
        if (!eventDescription) errors.push('Event must include a Description');
        if (eventDescription.length > 1000) errors.push('Event description is too long');
        if (!eventStartDate) errors.push('Event must include a Start Date')
        if (!eventEndDate) errors.push('Event must include a End Date')
        if (!eventStartTime) errors.push('Event must include a Start Time')
        if (!eventEndTime) errors.push('Event must include a End Time')

        const currentDate = new Date()
        const currentDateFormatted = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        // console.log(currentDateFormatted)

        // const currentDateTimeSlice = startTime.slice(0, -3)
        // splitStartTimeStr = startTimeSlice.split(':')
        currentDateSlice = currentDateFormatted.split('-')
        startDateSlice = eventStartDate.split('-')
        endDateSlice = eventEndDate.split('-')
        // console.log(currentDateSlice)
        // console.log(startDateSlice)
        // console.log(endDateSlice)
        // (Number(currentDateSlice[2]) > Number(startDateSlice[2]) || Number(currentDateSlice[2]) > Number(endDateSlice[2]))
        if ((Number(currentDateSlice[1]) > Number(startDateSlice[1]) || Number(currentDateSlice[1]) > Number(endDateSlice[1])) &&
            (Number(currentDateSlice[0]) > Number(startDateSlice[0]) || Number(currentDateSlice[0]) > Number(endDateSlice[0]))) {
            errors.push('Start/End Date cannot be behind the current date.')
            // console.log('base case')
        }

        if (Number(currentDateSlice[1]) === Number(startDateSlice[1])) {
            if (Number(currentDateSlice[2]) > Number(startDateSlice[2])) {
                errors.push('Start Date cannot be behind the current date.')
                // console.log('start date day case')
            }
        }
        if (Number(currentDateSlice[1]) === Number(endDateSlice[1])) {
            if (Number(currentDateSlice[2]) > Number(endDateSlice[2])) {
                errors.push('End Date cannot be behind the current date.')
                // console.log('start date day case2')
            }
        }

        if (Number(currentDateSlice[1]) === Number(endDateSlice[1])) {
            if (Number(currentDateSlice[2]) > Number(endDateSlice[2]) &&
                (Number(currentDateSlice[0]) > Number(endDateSlice[0]))) {
                errors.push('End Date cannot be behind the current date.')
                // console.log('start date day case3')
            }
        }
        if (Number(currentDateSlice[1]) === Number(endDateSlice[1])) {
            if (Number(endDateSlice[2]) < Number(currentDateSlice[2]) &&
                (Number(endDateSlice[0]) < Number(currentDateSlice[0]))) {
                errors.push('End Date cannot be behind the current date.')
                // console.log('end date day case')
            }
        }


        if (Number(startDateSlice[1]) === Number(endDateSlice[1])) {
            if (Number(startDateSlice[2]) > Number(endDateSlice[2]) &&
                (Number(startDateSlice[0]) > Number(endDateSlice[0]))) {
                errors.push('End Date cannot be behind the Start Date.')
                // console.log('4th case')
            }
        }

        if ((Number(startDateSlice[1]) > Number(endDateSlice[1])) &&
            (Number(startDateSlice[0]) > Number(endDateSlice[0]) || Number(startDateSlice[0]) === Number(endDateSlice[0]))) {

            errors.push('End Date cannot be behind the Start Date.')
            // console.log('5th case')

        }

        if (Number(currentDateSlice[1]) > Number(startDateSlice[1]) &&
            (Number(currentDateSlice[0]) === Number(startDateSlice[0]))) {
            errors.push('Start Date cannot be behind the Current Date.')
            // console.log('5.5th case')
        }

        if (Number(currentDateSlice[1]) > Number(endDateSlice[1]) &&
            (Number(startDateSlice[0]) === Number(endDateSlice[0]))) {
            errors.push('End Date cannot be behind the Current Date.')
            // console.log('6th case')
        }

        if (Number(startDateSlice[0]) > Number(endDateSlice[0])) {
            errors.push('End Date Year cannot be behind the Start Date Year.')
            // console.log('7th case')
        }

        if (Number(currentDateSlice[0]) > Number(endDateSlice[0])) {
            errors.push('End Date Year cannot be behind the Current Year.')
            // console.log('8th case')
        }

        if (Number(currentDateSlice[0]) > Number(startDateSlice[0])) {
            errors.push('Start Date Year cannot be behind the Current Year.')
            // console.log('9 th case')
        }




        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const startDate = new Date(new Date(eventStartDate).setDate(new Date(eventStartDate).getDate() + 1)).toLocaleDateString(undefined, options)
        const endDate = new Date(new Date(eventEndDate).setDate(new Date(eventEndDate).getDate() + 1)).toLocaleDateString(undefined, options)
        // console.log(startDate)
        // console.log(endDate)

        const startTime = new Date('1970-01-01T' + eventStartTime + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })
        const endTime = new Date('1970-01-01T' + eventEndTime + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })

        // console.log(startTime)
        // console.log(startTime.length)
        // console.log(startTime.slice(0, -3))
        // console.log(startTime.slice(5), 'slice 5')

        // console.log(endTime)
        // console.log(endTime.length)
        // console.log(endTime.slice(0, -2))
        // console.log(endTime.slice(5), 'slice 5')


        let startTimeSlice = ""
        let splitStartTimeStr = ""
        if (startTime.length === 8) {
            startTimeSlice = startTime.slice(0, -3)
            splitStartTimeStr = startTimeSlice.split(':')
            // console.log(splitStartTimeStr)
        } else {
            startTimeSlice = startTime.slice(0, -2)
            splitStartTimeStr = startTimeSlice.split(':')
            // console.log(splitStartTimeStr)
        }

        let endTimeSlice = ""
        let splitEndTimeStr = ""
        if (startTime.length === 8) {
            endTimeSlice = endTime.slice(0, -3)
            splitEndTimeStr = endTimeSlice.split(':')
            // console.log(splitEndTimeStr)
        } else {
            endTimeSlice = endTime.slice(0, -2)
            splitEndTimeStr = endTimeSlice.split(':')
            // console.log(splitEndTimeStr)
        }

        if (startDate === endDate) {
            if (Number(splitStartTimeStr[0]) > Number(splitEndTimeStr[0]) && startTime.slice(5).includes('PM') && endTime.slice(5).includes('AM')) {
                errors.push('Start Time cannot be after End Time')
                // console.log("start time greater than end time case")
            }
            if (startTime.slice(5).includes('PM') && endTime.slice(5).includes('AM')) {
                errors.push('Start Time cannot be after End Time')
                // console.log("PM AM Case")
            }
            if (Number(splitStartTimeStr[1]) > Number(splitEndTimeStr[1]) && Number(splitStartTimeStr[0]) === Number(splitEndTimeStr[0])) {
                errors.push('Start Time cannot be after End Time')
                // console.log("minutes Case")
            }
            if (Number(splitStartTimeStr[0]) > Number(splitEndTimeStr[0]) && !(startTime.slice(5).includes('AM') || endTime.slice(5).includes('PM'))) {
                errors.push('Start Time cannot be after End Time')
                // console.log('base error case')
            }
            if (Number(splitStartTimeStr[0]) > Number(splitEndTimeStr[0]) && (startTime.slice(5).includes('AM') && endTime.slice(5).includes('AM') || startTime.slice(5).includes('PM') && endTime.slice(5).includes('PM'))) {
                errors.push('Start Time cannot be after End Time')
                // console.log('second to last case')

            }
            if (Number(splitStartTimeStr[0]) < Number(splitEndTimeStr[0])) {
                if (startTime.slice(5).includes('PM') && endTime.slice(5).includes('AM')) {
                    errors.push('Start Time cannot be after End Time')
                    // console.log('last case')
                }
            }

            // if ((Number(splitStartTimeStr[0]) < Number(splitEndTimeStr[0]) && !(Number(splitStartTimeStr[0]) < Number(splitEndTimeStr[0]))) &&
            //     startTime.slice(5).includes('AM') && endTime.slice(5).includes('AM')) {
            //     errors.push('Start Time cannot be after End Time')
            // }

            // if (Number(splitStartTimeStr[0]) < Number(splitEndTimeStr[0]) &&
            //     startTime.slice(5).includes('AM') && endTime.slice(5).includes('AM')) {
            //     errors.push('Start Time cannot be after End Time')
            // }
        }


        setValidationErrors(errors)


    }, [dispatch, currentDateSlice, startDateSlice, endDateSlice, imageURLOne, imageURLTwo, imageURLThree, eventTitle, eventDescription, eventStartDate, eventEndDate, eventStartTime, eventEndTime])
    // console.log(imageURLOne, imageURLTwo, imageURLThree, eventTitle, eventDescription, eventStartDate, eventEndDate, eventStartTime, eventEndTime)


    const handleUpdateImageOne = (e) => {
        const currentFile = e.target.files[0];
        setImageURLOne(currentFile);
    }

    const handleUpdateImageTwo = (e) => {
        const currentFile = e.target.files[0];
        setImageURLTwo(currentFile);
    }

    const handleUpdateImageThree = (e) => {
        const currentFile = e.target.files[0];
        setImageURLThree(currentFile);
    }


    return (
        <div className="createEvent_outmost_ctnr">
            <div className="createEvent_instructions">
                <h3 className="createEvent_text_label" >Create an Event</h3>
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
                                        type="file"
                                        accept="image/*"
                                        name="imageOne"
                                        // value={imageURLOne}
                                        className="eventImgURLOne_input"
                                        onChange={handleUpdateImageOne}
                                    />
                                </label>
                                <label className="eventImgURLTwo_ctnr" >
                                    <div className="eventImgURLTwo_label" >
                                        Image URL:
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="imageTwo"
                                        // value={imageURLTwo}
                                        className="eventImgURLTwo_input"
                                        onChange={handleUpdateImageTwo}
                                    />
                                </label>
                                <label className="eventImgURLThree_ctnr" >
                                    <div className="eventImgURLThree_label" >
                                        Image URL:
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="imageThree"
                                        // value={imageURLThree}
                                        className="eventImgURLThree_input"
                                        onChange={handleUpdateImageThree}
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