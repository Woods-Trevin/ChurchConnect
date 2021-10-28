import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as announcementActions from '../../store/announcement'
import * as eventActions from '../../store/event'
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
        <div className="Dashboard_outmost_ctnr">
            <div className="Dashboard_announcement_ctnr">
                <div>
                    <h1>Announcements</h1>
                </div>
                {announcements?.map((announcement) =>
                    <Link className='DashboardAnnouncements_link' to={`/announcement/${announcement.id}`} onClick={() => setUpdateAnnouncement(false)}>
                        <div className='DashboardAnnouncements_items_wrapper'>
                            {/* <li className='DashboardAnnouncement_item url'>{announcement.imageURL}</li> */}
                            <img className='DashboardAnnouncement_item img' src={announcement?.imageURL} />
                            <li className='DashboardAnnouncement_item title'>{announcement.title}</li>
                            <li className='DashboardAnnouncement_item description'>{announcement.description}</li>
                        </div>
                    </Link>
                )}
            </div>
            <div className="Dashboard_event_ctnr" >
                <div className="DashboardEvents_title_ctnr">
                    <h1 className="DashboardEvents_title">Events</h1>
                </div>
                <div className="DashboardEvents_items_outter_ctnr" >
                    {events?.map(event =>
                        <Link className="DashboardEvents_inner_ctnr" to={`/event/${event.id}`}>
                            <div className="DashboardEvents_items_wrapper" >
                                <img className="DashboardEvents_item imgOne" src={event.imageURL} />
                                <img className="DashboardEvents_item imgTwo" src={event.imageURLTwo} />
                                <img className="DashboardEvents_item imgThree" src={event.imageURLThree} />
                                <li className="DashboardEvents_item title" >{event.title}</li>
                                <li className="DashboardEvents_item description" >{event.description}</li>
                                <li className="DashboardEvents_item startDate" >{event.startDate}</li>
                                <li className="DashboardEvents_item endDate" >{event.endDate}</li>
                                <li className="DashboardEvents_item startTime" >{event.startTime}</li>
                                <li className="DashboardEvents_item endTime" >{event.endTime}</li>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}