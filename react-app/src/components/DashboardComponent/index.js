import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import * as announcementActions from '../../store/announcement'
import * as eventActions from '../../store/event'
import Footer from '../Footer'
import './DashboardComponent.css';

export default function DashboardComponent({ setUpdateAnnouncement }) {
    const dispatch = useDispatch()

    const announcements = useSelector(state => state.announcement.announcements)
    const events = useSelector(state => state.event.events)
    console.log(announcements)


    useEffect(() => {
        dispatch(announcementActions.GetAnnouncements())
        dispatch(eventActions.GetEvents())

    }, [dispatch])


    return (
        <div className="Dashboard">
            <div className="Dashboard_outmost_ctnr">
                <div className="Dashboard_announcement_ctnr">
                    <div>
                        <h2>Select an Announcement</h2>
                    </div>
                    {announcements?.map((announcement) =>
                        <NavLink className='DashboardAnnouncements_link' to={`/announcement/${announcement.id}`} onClick={() => setUpdateAnnouncement(false)}>
                            <div className='DashboardAnnouncements_items_wrapper'>
                                <img className='DashboardAnnouncement_item img' src={announcement?.imageURL} />
                                <li className='DashboardAnnouncement_item title'>{announcement.title}</li>
                                <li className='DashboardAnnouncement_item description'>{announcement.description}</li>
                            </div>
                        </NavLink>
                    )}
                </div>
                <div className="Dashboard_event_ctnr_title">
                    <h2>Select an Event</h2>
                </div>
                <div className="Dashboard_event_ctnr" >
                    {events?.map((event) =>
                        <NavLink className="NavLink_ctnr" to={`/event/${event?.id}`}>
                            <div className="Dashboard_event_title">
                                {event?.title}
                            </div>
                            {(event?.imageURL || event.imageURLTwo || event.imageURLThree) && <div className="eventImage_ctnr" >
                                <img className="EventImage one" src={event?.imageURL} alt="alt" />
                                <img className="EventImage two" src={event?.imageURLTwo} alt="alt" />
                                <img className="EventImage three" src={event?.imageURLThree} alt="alt" />
                            </div>}
                            <div className="DashboardEvent_items_ctnr">
                                <div className="startDateTime_ctnr">
                                    <p>Event Starts: </p>
                                    <li className="DashboardEvent_items startDate" >{event?.startDate}</li>
                                    <li className="DashboardEvent_items startTime" >{event?.startTime}</li>
                                </div>
                                <div className="endDateTime_ctnr">
                                    <p>Event Ends: </p>
                                    <li className="DashboardEvent_items endDate" >{event?.endDate}</li>
                                    <li className="DashboardEvent_items endTime" >{event?.endTime}</li>
                                </div>
                            </div>
                        </NavLink>

                    )}
                </div>
            </div>
            <div className="Footer_ctnr">
                <Footer />
            </div>
        </div>
    )
}