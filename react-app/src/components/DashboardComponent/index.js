import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as announcementActions from '../../store/announcement'
import './DashboardComponent.css';

export default function DashboardComponent() {
    const dispatch = useDispatch()

    const announcements = useSelector(state => state.announcement.announcement)
    console.log(announcements)


    useEffect(() => {
        dispatch(announcementActions.GetAnnouncements())
    }, [dispatch])


    return (
        <div className="Dashboard_outmost_ctnr">
            <h1>Dashboard Component</h1>
            <div>
                {announcements?.map((announcement) =>
                    <div >
                        <li>{announcement.imageURL}</li>
                        <li>{announcement.title}</li>
                        <li>{announcement.description}</li>
                        <p>-------------------------------------------</p>
                    </div>
                )}
            </div>
            <div>

            </div>
        </div>
    )
}