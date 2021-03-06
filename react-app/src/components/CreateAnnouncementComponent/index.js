import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as announcementActions from '../../store/prayer_request'
import Footer from '../Footer'
import './CreateAnnouncementComponent.css'

export default function CreateAnnouncementComponent() {
    const [imageURL, setImageURL] = useState("")
    const [announcementTitle, setAnnouncementTitle] = useState("")
    const [prayerDescription, setPrayerDescription] = useState("")
    const [validationErrors, setValidationErrors] = useState([])

    console.log(imageURL)

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleAnnouncementCreation = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        // formData.append("image", imageURL)
        // formData.append("title", announcementTitle)
        formData.append("description", prayerDescription)
        formData.append("idx", user?.id)

        // const payload = {
        //     imageURL: imageURL,
        //     title: announcementTitle,
        //     description: announcementDescription,
        //     idx: user?.id
        // }
        const response = await dispatch(announcementActions.CreatePrayerRequest(formData))
        if (response.prayer_requests) {
            history.push('/')
            history.go(0);
        } else {
            validationErrors.push("The prayer request could not be made. Please check your prayer request information.")
        }

    }

    useEffect(() => {
        const errors = [];
        // if (imageURL.length > 1000) errors.push('Image size is too big');

        // const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        // if (!urlRegex.test(imageURL) && imageURL) errors.push('URL Entered is Not Valid.')


        // if (!announcementTitle) errors.push('Announcement must include a Title');
        // if (announcementTitle.length > 300) errors.push('Announcement Title is too long');
        if (!prayerDescription) errors.push('Prayer must include a Description');
        if (prayerDescription.length > 1000) errors.push('Prayer Description is too long');

        setValidationErrors(errors);
    }, [dispatch, imageURL, prayerDescription])

    // const handleCreateImage = (e) => {
    //     const currentFile = e.target.files[0];
    //     setImageURL(currentFile);
    // }



    return (
        <div>

            <div className="outmost_ctnr">
                <div className="createAnnouncement_instructions">
                    <h3 className="createAnnouncement_text_label" >Create a Prayer Request</h3>
                    <p>Have you ever needed prayer for something but did not know
                        how to pray? Maybe you arent a part of a church? Enter
                        anything you need prayer for and church followers everywhere
                        will put a word in with the man upstairs.
                    </p>
                </div>
                <div className="announcement_inner_ctnr">
                    <ul className="announcement_errors_ctnr">
                        {validationErrors.map((error, idx) =>
                            <li key={idx}>{error}</li>
                        )}
                    </ul>
                    <form className="announcementForm_outer_ctnr" onSubmit={handleAnnouncementCreation}>
                        <div className="announcementForm_ctnr">
                            <label className="announcementDescription_ctnr">
                                <div className="announcementDescription_label" >
                                    Prayer Request:
                                </div>
                                <textarea
                                    name='announcementDescription'
                                    value={prayerDescription}
                                    rows="10"
                                    cols="50"
                                    className="announcementDescription_input"
                                    onChange={(e) => setPrayerDescription(e.target.value)}
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
        </div>
    )
}