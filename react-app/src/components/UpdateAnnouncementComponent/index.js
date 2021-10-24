import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as announcementActions from '../../store/announcement'
import './UpdateAnnouncementComponent.css';

export default function UpdateAnnouncementComponent({ setUpdateAnnouncement }) {
    const current_announcement = useSelector(state => state.announcement.current_announcement)
    console.log(current_announcement)

    const [updateAnnouncementURL, setUpdateAnnouncementURL] = useState(current_announcement?.imageURL)
    const [updateAnnouncementTitle, setUpdateAnnouncementTitle] = useState(current_announcement?.title)
    const [updateAnnouncementDescription, setUpdateAnnouncementDescription] = useState(current_announcement?.description)


    const dispatch = useDispatch()

    const { announcementId } = useParams();

    function handleAnnouncementPatch(e) {
        e.preventDefault()
        const payload = {
            imageURL: updateAnnouncementURL,
            title: updateAnnouncementTitle,
            description: updateAnnouncementDescription,
            idx: announcementId

        }
        dispatch(announcementActions.PatchAnnouncement(payload));
    }

    useEffect(() => {
        setUpdateAnnouncement(true);
    }, [dispatch])


    return (
        <div>
            <h1> Update Announcement Component </h1>
            <form onSubmit={handleAnnouncementPatch}>
                <div>
                    <div>
                        <label>
                            <div>
                                Image URL:
                            </div>
                            <input
                                type='text'
                                name='updateAnnouncementURL'
                                value={updateAnnouncementURL}
                                onChange={(e) => setUpdateAnnouncementURL(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                Title:
                            </div>
                            <input
                                type='text'
                                name='updateAnnouncementTitle'
                                value={updateAnnouncementTitle}
                                onChange={(e) => setUpdateAnnouncementTitle(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                Description:
                            </div>
                            <input
                                type='text'
                                name='updateAnnouncementDescription'
                                value={updateAnnouncementDescription}
                                onChange={(e) => setUpdateAnnouncementDescription(e.target.value)}
                            />
                        </label>
                    </div>
                    <button type="submit" >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}