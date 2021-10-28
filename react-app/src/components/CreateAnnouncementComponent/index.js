import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as announcementActions from '../../store/announcement'
import './CreateAnnouncementComponent.css'

export default function CreateAnnouncementComponent() {
    const [imageURL, setImageURL] = useState("")
    const [announcementTitle, setAnnouncementTitle] = useState("")
    const [announcementDescription, setAnnouncementDescription] = useState("")
    const [validationErrors, setValidationErrors] = useState([])

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    function handleAnnouncementCreation(e) {
        e.preventDefault()
        const payload = {
            imageURL: imageURL,
            title: announcementTitle,
            description: announcementDescription,
            idx: user.id
        }
        dispatch(announcementActions.CreateAnnouncement(payload))
        history.push('/')

    }

    useEffect(() => {
        const errors = [];
        if (imageURL.length > 1000) errors.push('Image size is too big');
        if (!announcementTitle) errors.push('Announcement must include a Title');
        if (announcementTitle.length > 300) errors.push('Announcement Title is too long');
        if (!announcementDescription) errors.push('Announcement must include a Description');
        if (announcementDescription.length > 1000) errors.push('Announcement Description is too long');

        setValidationErrors(errors);
    }, [dispatch, imageURL, announcementTitle, announcementDescription])


    return (
        <div className="announcement_outmost_ctnr">
            <ul>
                {validationErrors.map(error =>
                    <li>{error}</li>
                )}
            </ul>
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
                    <button type="submit" disabled={validationErrors.length > 0} >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}