import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/event'
import './UpdateEventComponent.css';
import Footer from '../Footer';


export default function UpdateEventComponent({ setUpdateEvent }) {
    const { eventId } = useParams()
    // console.log(eventId, '---------------')
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

    let currentDateSlice;
    let startDateSlice;
    let endDateSlice;

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

        const currentDate = new Date()
        const currentDateFormatted = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        // console.log(currentDateFormatted)

        // const currentDateTimeSlice = startTime.slice(0, -3)
        // splitStartTimeStr = startTimeSlice.split(':')
        currentDateSlice = currentDateFormatted.split('-')
        startDateSlice = updateEventStartDate.split('-')
        endDateSlice = updateEventEndDate.split('-')
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
            (Number(startDateSlice[0]) > Number(endDateSlice[0]))) {

            errors.push('End Date cannot be behind the Start Date.')
            // console.log('5th case')

        }

        if (Number(currentDateSlice[1]) > Number(startDateSlice[1]) &&
            (Number(startDateSlice[0]) === Number(startDateSlice[0]))) {
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
            // console.log('9th case')
        }


        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const startDate = new Date(new Date(updateEventStartDate).setDate(new Date(updateEventStartDate).getDate() + 1)).toLocaleDateString(undefined, options)
        const endDate = new Date(new Date(updateEventEndDate).setDate(new Date(updateEventEndDate).getDate() + 1)).toLocaleDateString(undefined, options)
        // console.log(startDate)
        // console.log(endDate)

        const startTime = new Date('1970-01-01T' + updateEventStartTime + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })
        const endTime = new Date('1970-01-01T' + updateEventEndTime + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })

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
        }



        setValidationErrors(errors)
    }, [dispatch, eventId, updateImageOne, updateImageTwo, updateImageThree, updateEventTitle, updateEventDescription, updateEventStartDate, updateEventEndDate, updateEventStartTime, updateEventEndTime])


    function UpdateEventHandler(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("imageOne", updateImageOne)
        formData.append("imageTwo", updateImageTwo)
        formData.append("imageThree", updateImageThree)
        formData.append("title", updateEventTitle)
        formData.append("description", updateEventDescription)
        formData.append("startDate", updateEventStartDate)
        formData.append("endDate", updateEventEndDate)
        formData.append("startTime", updateEventStartTime)
        formData.append("endTime", updateEventEndTime)
        // formData.append("idx", eventId)


        // const payload = {
        //     imageURL: updateImageOne,
        //     imageURLTwo: updateImageTwo,
        //     imageURLThree: updateImageThree,
        //     title: updateEventTitle,
        //     description: updateEventDescription,
        //     startDate: updateEventStartDate,
        //     endDate: updateEventEndDate,
        //     startTime: updateEventStartTime,
        //     endTime: updateEventEndTime,
        //     idx: eventId
        // }
        dispatch(eventActions.PatchEvent(formData, eventId))
        // setUpdateEvent(false)
        history.push(`/`)
        history.go(0);


    }

    const handleUpdateImageOne = (e) => {
        const currentFile = e.target.files[0];
        setUpdateImageOne(currentFile);
    }

    const handleUpdateImageTwo = (e) => {
        const currentFile = e.target.files[0];
        setUpdateImageTwo(currentFile);
    }

    const handleUpdateImageThree = (e) => {
        const currentFile = e.target.files[0];
        setUpdateImageThree(currentFile);
    }

    return (
        <div className="updateEvent_outer_ctnr">
            <div className="updateEvent_inner_ctnr">
                <ul className="updateEvent_errors">
                    {validationErrors.map((error, idx) =>
                        <li key={idx} >{error}</li>
                    )}
                </ul>
                <div className="updateEvent_form_wrapper" >
                    <form className="updateEvent_form_innerWrapper" onSubmit={UpdateEventHandler}>
                        <div className="updateEvent_items_ctnr">
                            <h3 className="updateEvent_instruction">
                                Edit Event
                            </h3>
                            <label className="updateEvent_imageURLOne_ctnr">
                                <div className="updateEvent_imageURLOne_label">
                                    Image URL:
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="updateImageOne"
                                    className="updateEvent_imageURLOne_input"
                                    onChange={handleUpdateImageOne}
                                />
                            </label>
                            <label className="updateEvent_imageURLTwo_ctnr" >
                                <div className="updateEvent_imageURLTwo_label" >
                                    imageURLTwo:
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="updateImageTwo"
                                    className="updateEvent_imageURLTwo_input"
                                    onChange={handleUpdateImageTwo}
                                />
                            </label>
                            <label className="updateEvent_imageURLThree_ctnr" >
                                <div className="updateEvent_imageURLThree_label" >
                                    imageURLThree:
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="updateImageThree"
                                    className="updateEvent_imageURLThree_input"
                                    onChange={handleUpdateImageThree}
                                />
                            </label>
                            <label className="updateEvent_title_ctnr" >
                                <div className="updateEvent_title_label">
                                    Title:
                                </div>
                                <input
                                    type="text"
                                    name="updateEventTitle"
                                    value={updateEventTitle}
                                    className="updateEvent_title_input"
                                    onChange={(e) => setUpdateEventTitle(e.target.value)}
                                />
                            </label>
                            <label className="updateEvent_description_ctnr" >
                                <div className="updateEvent_description_label" >
                                    Description:
                                </div>
                                <textarea
                                    type="text"
                                    name="updateEventDescription"
                                    value={updateEventDescription}
                                    className="updateEvent_description_input"
                                    onChange={(e) => setUpdateEventDescription(e.target.value)}
                                />
                            </label>
                            <label className="updateEvent_startDate_ctnr" >
                                <div className="updateEvent_startDate_label" >
                                    Start Date:
                                </div>
                                <input
                                    type="date"
                                    name="updateEventStartDate"
                                    value={updateEventStartDate}
                                    className="updateEvent_startDate_input"
                                    onChange={(e) => setUpdateEventStartDate(e.target.value)}
                                />
                            </label>
                            <label className="updateEvent_startTime_ctnr" >
                                <div className="updateEvent_startTime_label">
                                    Start Time:
                                </div>
                                <input
                                    type="time"
                                    name="updateEventStartTime"
                                    value={updateEventStartTime}
                                    className="updateEvent_startTime_input"
                                    onChange={(e) => setUpdateEventStartTime(e.target.value)}
                                />
                            </label>
                            <label className="updateEvent_endDate_ctnr" >
                                <div className="updateEvent_endDate_label">
                                    End Date:
                                </div>
                                <input
                                    type="date"
                                    name="updateEventEndDate"
                                    value={updateEventEndDate}
                                    className="updateEvent_endDate_input"
                                    onChange={(e) => setUpdateEventEndDate(e.target.value)}
                                />
                            </label>
                            <label className="updateEvent_endTime_ctnr" >
                                <div className="updateEvent_endTime_title" >
                                    End Time:
                                </div>
                                <input
                                    type="time"
                                    name="updateEventEndTime"
                                    value={updateEventEndTime}
                                    className="updateEvent_endTime_input"
                                    onChange={(e) => setUpdateEventEndTime(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="updateEventForm_Btn_ctnr">
                            <button type="submit" className="updateEventForm_Btn" disabled={validationErrors.length > 0}>
                                Submit
                            </button>
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