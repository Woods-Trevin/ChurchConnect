import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as announcementActions from '../../store/announcement'
import './CreateAnnouncementComponent.css'

export default function CreateAnnouncementComponent() {
    const [imageURL, setImageURL] = useState()
    const [announcementTitle, setAnnouncementTitle] = useState()
    const [announcementDescription, setAnnouncementDescription] = useState()

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    function handleAnnouncementCreation() {
        const payload = {
            imageURL: imageURL,
            title: announcementTitle,
            description: announcementDescription,
            idx: user.id
        }
        dispatch(announcementActions.CreateAnnouncement(payload))

    }


    return (
        <div className="announcement_outmost_ctnr">
            <h1>Create Announcement Component</h1>
            <form onSubmit={handleAnnouncementCreation}>
                <div>
                    <div>
                        <label>
                            <div>
                                Image URL:
                            </div>
                            <input
                                type='text'
                                name='imageURL'
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                Title:
                            </div>
                            <input
                                type='text'
                                name='announcementTitle'
                                value={announcementTitle}
                                onChange={(e) => setAnnouncementTitle(e.target.value)}
                            />
                        </label>
                        <label>
                            <div>
                                Description:
                            </div>
                            <input
                                type='text'
                                name='announcementDescription'
                                value={announcementDescription}
                                onChange={(e) => setAnnouncementDescription(e.target.value)}
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