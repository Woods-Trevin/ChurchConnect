import { useEffect, useState } from 'react'
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

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // if (reload) {
    //     console.log('reloaded page')
    //     window.location.reload()

    // }


    useEffect(() => {
        dispatch(announcementActions.GetAnnouncements())
        dispatch(eventActions.GetEvents())
    }, [dispatch]);

    // function format



    return (
        <div className="Dashboard">
            <div className="Dashboard_intro_ctnr">
                <img src="https://community-impact-website.s3.amazonaws.com/uploads/wpengine/uploads/2019/01/concert-photo.jpg" alt="alt" className="splashPage_img" />
                <div className="CCBlurb_ctnr" >
                    <p className="CCBlurb">
                        ChurchConnect was made to bring members of a church community together by allowing communication between one another through the creation of Events and Announcements...
                    </p>
                </div>
                <div className="CCStarter_btn_ctnr" >
                    <Link to="/event" className="CCStarter_btn" >
                        Start By Creating an Event
                    </Link>
                </div>
            </div>
            <div className="Dashboard_outmost_ctnr">
                <div className="Dashboard_announcement_ctnr">
                    <div>
                        <h2>Select an Announcement</h2>
                    </div>
                    {announcements?.map((announcement) =>
                        <NavLink className='DashboardAnnouncements_link' to={`/announcement/${announcement.id}`} onClick={() => setUpdateAnnouncement(false)}>
                            <div className='DashboardAnnouncements_items_wrapper'>
                                {announcement?.imageURL && <img className='DashboardAnnouncement_item img' src={announcement?.imageURL} />}
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
                                <img className="EventImage one" src={event?.imageURL ? event?.imageURL : 'https://icon2.cleanpng.com/20180605/ijl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d2414b5.0787389815282337411478.jpg'} alt="alt" />
                                <img className="EventImage two" src={event?.imageURLTwo ? event?.imageURLTwo : 'https://icon2.cleanpng.com/20180605/ijl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d2414b5.0787389815282337411478.jpg'} alt="alt" />
                                <img className="EventImage three" src={event?.imageURLThree ? event?.imageURLThree : 'https://icon2.cleanpng.com/20180605/ijl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d2414b5.0787389815282337411478.jpg'} alt="alt" />
                            </div>}
                            <div className="DashboardEvent_items_ctnr">
                                <div className="startDateTime_ctnr">
                                    <p>Event Starts: </p>
                                    <li className="DashboardEvent_items startDate" >{new Date(new Date(event?.startDate).setDate(new Date(event?.startDate).getDate() + 1)).toLocaleDateString(undefined, options)}</li>
                                    <li className="DashboardEvent_items startTime" >{new Date('1970-01-01T' + event?.startTime + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })}</li>
                                </div>
                                <div className="endDateTime_ctnr">
                                    <p>Event Ends: </p>
                                    <li className="DashboardEvent_items endDate" >{new Date(new Date(event?.endDate).setDate(new Date(event?.endDate).getDate() + 1)).toLocaleDateString(undefined, options)}</li>
                                    <li className="DashboardEvent_items endTime" >{new Date('1970-01-01T' + event?.endTime + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })}</li>
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