import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as prayerRequestActions from '../../store/prayer_request'
import './UpdateAnnouncementComponent.css';
import Footer from '../Footer';

export default function UpdateAnnouncementComponent() {
    const { announcementId } = useParams();

    let current_prayer_request = useSelector(state => state.prayer_request?.current_prayer_request?.description)
    console.log(current_prayer_request)

    const history = useHistory();

    // const [updateAnnouncementURL, setUpdateAnnouncementURL] = useState("")
    // const [updateAnnouncementTitle, setUpdateAnnouncementTitle] = useState(current_announcement?.title)
    const [updatePrayerDescription, setUpdatePrayerDescription] = useState(current_prayer_request)

    // console.log(updateAnnouncementURL) 
    const [validationErrors, setValidationErrors] = useState([])


    const dispatch = useDispatch()

    // console.log(announcementId)

    const handleAnnouncementPatch = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        // formData.append("image", updateAnnouncementURL)
        // formData.append("title", updateAnnouncementTitle)
        formData.append("description", updatePrayerDescription)

        // const payload = {
        //     imageURL: updateAnnouncementURL,
        //     title: updateAnnouncementTitle,
        //     description: updateAnnouncementDescription,
        //     idx: announcementId

        // }
        const response = await dispatch(prayerRequestActions.PatchPrayer(formData, announcementId));
        if (response.prayer_requests) {
            history.push('/')
            history.go(0);
        } else {
            validationErrors.push("Update was not possible. Please view the information given in the form.")
        }
    }

    useEffect(() => {
        // setUpdateAnnouncement(true);
        dispatch(prayerRequestActions.GetOnePrayer(announcementId))
        // setUpdatePrayerDescription(current_prayer_request?.description)

        setUpdatePrayerDescription(current_prayer_request)



        const errors = [];

        // if (updateAnnouncementURL.length > 1000) errors.push('Image size is too big');
        // if (!updateAnnouncementTitle) errors.push('Announcement must include a Title');
        // if (updateAnnouncementTitle.length > 300) errors.push('Announcement Title is too long');
        if (!updatePrayerDescription) errors.push('Prayer Request must include a Description');
        if (updatePrayerDescription?.length > 1000) errors.push('Prayer Request Description is too long');

        setValidationErrors(errors);
    }, [dispatch, updatePrayerDescription, current_prayer_request])


    // const handleUpdateImage = (e) => {
    //     const currentFile = e.target.files[0];
    //     setUpdateAnnouncementURL(currentFile);
    // }

    return (
        <div className="updateAnnouncement_outer_ctnr" >
            <div className="updateAnnouncement_inner_ctnr">
                <div className="updateAnnouncement_instruction">
                    <h3> Edit Announcement</h3>
                </div>
                <div className="updateAnnouncement_items_ctnr">
                    <ul className="updateAnnouncement_errors">
                        {validationErrors.map((error, idx) =>
                            <li key={idx} >{error}</li>
                        )}
                    </ul>
                    <form className="updateAnnouncement_form_outerwrapper" onSubmit={handleAnnouncementPatch}>
                        <div className="updateAnnouncement_form_innerwrapper">
                            {/* <label className="updateAnnouncement_imageURL_ctnr">
                                <div className="updateAnnouncement_imageURL_label">
                                    Image URL:
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name='updateAnnouncementURL'
                                    className="updateAnnouncement_imageURL_input"
                                    onChange={handleUpdateImage}
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
                            </label> */}
                            <label className="updateAnnouncement_description_ctnr">
                                <div className="updateAnnouncement_description_label">
                                    Description:
                                </div>
                                <input
                                    type="text"
                                    name='updateAnnouncementDescription'
                                    defaultValue={updatePrayerDescription}
                                    className="updateAnnouncement_description_input"
                                    onChange={(e) => setUpdatePrayerDescription(e.target.value)}
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