import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as announcementActions from '../../store/announcement'
import './UpdateAnnouncementComponent.css';
import Footer from '../Footer';

export default function UpdateAnnouncementComponent({ setUpdateAnnouncement }) {
    const current_announcement = useSelector(state => state.announcement.current_announcement)
    console.log(current_announcement)

    const history = useHistory();

    const [updateAnnouncementURL, setUpdateAnnouncementURL] = useState(current_announcement?.imageURL)
    const [updateAnnouncementTitle, setUpdateAnnouncementTitle] = useState(current_announcement?.title)
    const [updateAnnouncementDescription, setUpdateAnnouncementDescription] = useState(current_announcement?.description)

    const [validationErrors, setValidationErrors] = useState([])


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
        history.push('/')
    }

    useEffect(() => {
        setUpdateAnnouncement(true);
        const errors = [];

        if (updateAnnouncementURL.length > 1000) errors.push('Image size is too big');
        if (!updateAnnouncementTitle) errors.push('Announcement must include a Title');
        if (updateAnnouncementTitle.length > 300) errors.push('Announcement Title is too long');
        if (!updateAnnouncementDescription) errors.push('Announcement must include a Description');
        if (updateAnnouncementDescription.length > 1000) errors.push('Announcement Description is too long');

        setValidationErrors(errors);
    }, [dispatch, updateAnnouncementURL, updateAnnouncementTitle, updateAnnouncementDescription])


    return (
        <div className="updateAnnouncement_outer_ctnr" >
            <div className="updateAnnouncement_inner_ctnr">
                <div className="updateAnnouncement_instruction">
                    <h3> Edit Announcement</h3>
                </div>
                <div className="updateAnnouncement_items_ctnr">
                    <ul className="updateAnnouncement_errors">
                        {validationErrors.map(error =>
                            <li>{error}</li>
                        )}
                    </ul>
                    <form className="updateAnnouncement_form_outerwrapper" onSubmit={handleAnnouncementPatch}>
                        <div className="updateAnnouncement_form_innerwrapper">
                            <label className="updateAnnouncement_imageURL_ctnr">
                                <div className="updateAnnouncement_imageURL_label">
                                    Image URL:
                                </div>
                                <input
                                    type='text'
                                    name='updateAnnouncementURL'
                                    value={updateAnnouncementURL}
                                    className="updateAnnouncement_imageURL_input"
                                    onChange={(e) => setUpdateAnnouncementURL(e.target.value)}
                                />
                            </label>
                            <label className="updateAnnouncement_title_ctnr">
                                <div className="updateAnnouncement_title_label">
                                    Title:
                                </div>
                                <input
                                    type='text'
                                    name='updateAnnouncementTitle'
                                    value={updateAnnouncementTitle}
                                    className="updateAnnouncement_title_input"
                                    onChange={(e) => setUpdateAnnouncementTitle(e.target.value)}
                                />
                            </label>
                            <label className="updateAnnouncement_description_ctnr">
                                <div className="updateAnnouncement_description_label">
                                    Description:
                                </div>
                                <input
                                    type='text'
                                    name='updateAnnouncementDescription'
                                    value={updateAnnouncementDescription}
                                    className="updateAnnouncement_description_input"
                                    onChange={(e) => setUpdateAnnouncementDescription(e.target.value)}
                                />
                            </label>
                            <div className="updateAnnouncement_submitBtn_ctnr">
                                <button className="updateAnnouncement_submitBtn" type="submit" disabled={validationErrors.length > 0} >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="updateAnnouncement_Footer">
                <Footer />
            </div>
        </div>
    )
}