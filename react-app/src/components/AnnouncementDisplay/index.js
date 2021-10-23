import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as announcementActions from '../../store/announcement'
import './AnnouncementDisplay.css';


export default function AnnouncementDisplay({ setUpdateAnnouncement }) {
    const { announcementId } = useParams()
    const dispatch = useDispatch()
    console.log(announcementId)

    const current_announcement = useSelector(state => state.announcement.current_announcement)
    console.log(current_announcement)

    useEffect(() => {
        dispatch(announcementActions.GetOneAnnouncement(announcementId))
        // setUpdateAnnouncement(false);
    }, [dispatch])

    function handleAnnouncementUpdate(e) {
        e.preventDefault();
        setUpdateAnnouncement(true);
    }

    function handleAnnouncementDeletion(e) {
        e.preventDefault();
        dispatch(announcementActions.DeleteAnnouncement(announcementId));
        // console.log('This Works!!!')
    }


    return (
        <div className="announcementDisplay_outmost_ctnr">
            <h1>
                Announcement Display Component
            </h1>

            <div>
                {/* <img className="announcementDisplay_img" src={current_announcement?.imageURL} /> */}
                {current_announcement?.imageURL}
            </div>
            <div>
                {current_announcement?.title}
            </div>
            <div>
                {current_announcement?.description}
            </div>
            <div>
                <li onClick={(e) => handleAnnouncementUpdate(e)} >
                    Update
                </li>
            </div>
            <div>
                <li onClick={(e) => handleAnnouncementDeletion(e)} >
                    Delete
                </li>
            </div>
        </div>
    )
}