import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as announcementActions from '../../store/announcement'
import './AnnouncementDisplay.css';
import CommentComponent from '../CommentsComponent';


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
        <div className="announcementDisplay_outmost_ctnr" >
            <div className="announcementDisplay_inner_ctnr" >
                <div className="announcementDisplay_img_ctnr" >
                    <img className="announcementDisplay_img" src={current_announcement?.imageURL} />
                    {/* {current_announcement?.imageURL} */}
                </div>
                <div className="announcementDisplay_title" >
                    {current_announcement?.title}
                </div>
                <div className="announcementDisplay_description" >
                    {current_announcement?.description}
                </div>
                <div className="announcementDisplay_btn_ctnr">
                    <div className="announcementDisplay_update_btn" >
                        <li className="announcementDisplay_btn" onClick={(e) => handleAnnouncementUpdate(e)} >
                            Update
                        </li>
                    </div>
                    <div className="announcementDisplay_delete_btn" >
                        <li className="announcementDisplay_btn" onClick={(e) => handleAnnouncementDeletion(e)} >
                            Delete
                        </li>
                    </div>
                </div>
            </div>
            <div className="announcementDisplay_commentreplies_ctnr">
                <CommentComponent announcementId={announcementId} />
            </div>
        </div>
    )
}