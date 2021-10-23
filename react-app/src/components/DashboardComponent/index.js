import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as announcementActions from '../../store/announcement'
import * as eventActions from '../../store/event'
import './DashboardComponent.css';

export default function DashboardComponent() {
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
                    <Link to={`/announcement/${announcement.id}`}>
                        <li>{announcement.imageURL}</li>
                        <li>{announcement.title}</li>
                        <li>{announcement.description}</li>
                        <p>-------------------------------------------</p>
                    </Link>
                )}
            </div>
            <div className="Dashboard_event_ctnr" >
                <div className="DashboardEvents_title_ctnr">
                    <h1>Events</h1>
                </div>
                <div className="DashboardEvents_items_ctnr" >
                    {events?.map(event =>
                        <Link to={`/event/${event.id}`}>
                            <li>{event.imageURL}</li>
                            <li>{event.imageURLTwo}</li>
                            <li>{event.imageURLThree}</li>
                            <li>{event.title}</li>
                            <li>{event.description}</li>
                            <li>{event.startDate}</li>
                            <li>{event.endDate}</li>
                            <li>{event.startTime}</li>
                            <li>{event.endTime}</li>
                            <p>------------------------------------------</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}