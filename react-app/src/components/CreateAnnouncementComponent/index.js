import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as announcementActions from '../../store/announcement'
import Footer from '../Footer'
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
            <div className="createAnnouncement_instructions">
                <h1>Create Announcement Instruction</h1>
            </div>
            <div className="announcement_inner_ctnr">
                <ul>
                    {validationErrors.map(error =>
                        <li>{error}</li>
                    )}
                </ul>
                <form onSubmit={handleAnnouncementCreation}>
                    <div className="announcementForm_ctnr">
                        <label className="announcementImageURL_ctnr">
                            <div className="announcementImageURL_label">
                                Image URL:
                            </div>
                            <input
                                type='text'
                                name='imageURL'
                                value={imageURL}
                                className='announcementURL_input'
                                onChange={(e) => setImageURL(e.target.value)}
                            />
                        </label>
                        <label className="announcementTitle_ctnr" >
                            <div className="announcementTitle_label" >
                                Title:
                            </div>
                            <input
                                type='text'
                                name='announcementTitle'
                                value={announcementTitle}
                                className="announcementTitle_input"
                                onChange={(e) => setAnnouncementTitle(e.target.value)}
                            />
                        </label>
                        <label className="announcementDescription_ctnr">
                            <div className="announcementDescription_label" >
                                Description:
                            </div>
                            <input
                                type='text'
                                name='announcementDescription'
                                value={announcementDescription}
                                className="announcementDescription_input"
                                onChange={(e) => setAnnouncementDescription(e.target.value)}
                            />
                        </label>
                    </div>
                    <button className="announcementForm_btn" type="submit" disabled={validationErrors.length > 0} >
                        Submit
                    </button>
                </form>
            </div>
            <div className="announcementFooter_ctnr">
                <Footer />
            </div>
        </div>
    )
}