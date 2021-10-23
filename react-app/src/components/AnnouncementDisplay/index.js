import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as announcementActions from '../../store/announcement'
import './AnnouncementDisplay.css';


export default function AnnouncementDisplay() {
    const { announcementId } = useParams()
    const dispatch = useDispatch()
    console.log(announcementId)


    useEffect(() => {
        // dispatch(announcementActions.)
    }, [])


    return (
        <div className="announcementDisplay_outmost_ctnr">
            <h1>
                Announcement Display Component
            </h1>
        </div>
    )
}