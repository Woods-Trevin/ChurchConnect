import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as profileActions from '../../store/profile'
import * as prayerRequestActions from '../../store/prayer_request'
import * as eventActions from '../../store/event'
import './Profile.css'
import { NavLink } from 'react-router-dom'

export default function Profile() {
    const dispatch = useDispatch()

    const [renderProfileView, setRenderProfileView] = useState(true)
    const [renderProfileUpdateView, setRenderProfileUpdateView] = useState(false)

    const currentUser = useSelector(state => state.session.user)
    // console.log(currentUser?.id)

    const currentUserProfile = useSelector(state => state.currentUserProfile.profile)
    // console.log(currentUserProfile)

    const userLocationSplit = currentUserProfile?.location?.split(',')
    // console.log(userLocationSplit)

    const [profileImage, setProfileImage] = useState("")
    const [address, setAddress] = useState()
    const [homeChurch, setHomeChurch] = useState()
    const [bio, setBio] = useState()
    // console.log(currentUserProfile?.homeChurch)
    // console.log(currentUserProfile?.bio)

    const [image_to_animate, set_image_to_animate] = useState(1)

    useEffect(() => {
        dispatch(profileActions.GetProfile(currentUser?.id))
        setAddress(currentUserProfile?.location)
        setHomeChurch(currentUserProfile?.homeChurch)
        setBio(currentUserProfile?.bio)
        dispatch(eventActions.GetEvents())
        dispatch(prayerRequestActions.GetPrayerRequests())

        const timeout = setTimeout(() => {
            if (image_to_animate < 3) {
                set_image_to_animate(image_to_animate + 1)
                console.log(image_to_animate)
            } else {
                set_image_to_animate(1)
            }
        }, 6000)

        return () => clearTimeout(timeout)

    }, [profileImage, renderProfileView, renderProfileUpdateView, image_to_animate])

    const events = useSelector(state => state.event.events)
    // console.log(events)
    const userEvents = []
    for (let i = 0; i < events?.length; i++) {
        if (events[i].userId === currentUser?.id) {
            userEvents.push(events[i])
        }
    }
    // console.log(userEvents)

    // console.log(address)

    const handleUpdateProfileImage = (e) => {
        const currentFile = e.target.files[0];
        setProfileImage(currentFile);

    }

    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(profileImage)
        console.log(address)
        console.log(bio)
        console.log(homeChurch)


        const formData = new FormData();
        formData.append("image", profileImage)
        formData.append("location", address)
        formData.append("homeChurch", homeChurch)
        formData.append("bio", bio)
        console.log(formData)

        dispatch(profileActions.UpdateProfile(formData, currentUserProfile?.id))
        setRenderProfileView(true);
        setRenderProfileUpdateView(false);



    }

    const imageURLRegex = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/

    return (
        <div className="profile_outmost_ctnr">
            <div className="profile_inner_ctnr">
                {renderProfileUpdateView &&
                    <form className="profileForm_ctnr" onSubmit={handleFormSubmit}>
                        <div className="profile_ctnr">
                            <img className="profile_pic_wide" src={currentUserProfile?.profilePicture} />
                            <li className="update_profile_btn" onClick={() => {
                                setRenderProfileView(true);
                                setRenderProfileUpdateView(false);
                            }}>Cancel</li>
                            <div className="update_location_ctnr">
                                <label className="address_ctnr">
                                    <div className="address_label">
                                        Address
                                    </div>
                                    <input
                                        type="text"
                                        name="address"
                                        value={address}
                                        className="profileAddress_input"
                                        placeholder={"Enter New Address"}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div className="profile_contents_ctnr">
                                <div className="profile_pic_ctnr">
                                    {/* <img className="profile_pic" src={currentUserProfile?.profilePicture} /> */}
                                    <label className="profileImg_ctnr">
                                        <div className="profileImg_label">
                                            Choose a New Profile Image:
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="profileImg"
                                            // value={imageURLOne}
                                            className="profileImg_input"
                                            onChange={handleUpdateProfileImage}
                                        />
                                    </label>
                                    <div className="profile_about_ctnr">
                                        <li className="profile_about_label">About</li>
                                        <label className="about_input_ctnr">
                                            <textarea
                                                name="bio"
                                                value={bio}
                                                className="profileBio_input"
                                                onChange={(e) => setBio(e.target.value)}
                                                rows="10" cols="30"
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="homeChurch_ctnr">
                                    <li className="homeChurch_label">Home Church:</li>
                                    <div className="homeChurch_box">
                                        {/* <li className="homeChurch">{currentUserProfile?.homeChurch}</li> */}
                                        <label className="homeChurch_input_ctnr">
                                            <input
                                                type="text"
                                                name="homechurch"
                                                value={homeChurch}
                                                className="profileHomeChurch_input"
                                                onChange={(e) => setHomeChurch(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="update_btn_ctnr">
                                <button type="submit" className="submit_form_btn">Submit Change</button>
                            </div>
                        </div>
                    </form>
                }
                {renderProfileView &&
                    <div className="profile_ctnr">
                        <img className="profile_pic_wide" src={currentUserProfile?.profilePicture} />
                        <li className="update_profile_btn" onClick={() => {
                            setRenderProfileView(false);
                            setRenderProfileUpdateView(true);
                        }}>Update Profile</li>
                        <li className="user_username">{currentUser?.username}</li>
                        {/* <li className="user_location">{}</li> */}
                        <div className="profile_contents_ctnr">
                            <div className="profile_pic_ctnr">
                                <img className="profile_pic" src={currentUserProfile?.profilePicture} />
                                <div className="profile_about_ctnr">
                                    <li className="profile_about_label">About</li>
                                    <li className="profile_about">{currentUserProfile?.bio}</li>
                                </div>
                            </div>
                            <div className="homeChurch_ctnr">
                                <li className="homeChurch_label">Home Church:</li>
                                <div className="homeChurch_box">
                                    <li className="homeChurch">{currentUserProfile?.homeChurch}</li>
                                </div>
                            </div>
                        </div>
                        <div className="prompts_ctnr">
                            <div className="profileEvents_prompt">
                                <h1> View Events You Created </h1>
                            </div>
                            <div className="profileAnnouncements_prompt">
                                <h1> View Prayer Requests You Created </h1>
                            </div>
                        </div>
                        <div className="userCreations_ctnr">
                            <div className="profileEvents_ctnr">
                                {userEvents?.map((event, idx) =>
                                    <NavLink className="profileEvent_navlink" to={`/event/${event?.id}`}>
                                        <div className="profileEvent_ctnr">
                                            <li className="profileEvent_title" >{event?.title}</li>
                                            <div className="profileEvent_img_ctnr">
                                                <div className={`imageOne_ctnr ${image_to_animate === 1 && "image--visible"} ${image_to_animate != 1 && "image--hidden"}`}>
                                                    <img className="profileEventImage one" src={event?.imageURL} />
                                                </div>
                                                <div className={`imageTwo_ctnr ${image_to_animate === 2 && "image--visible"} ${image_to_animate != 2 && "image--hidden"}`}>
                                                    <img className="profileEventImage two" src={event?.imageURLTwo} />
                                                </div>
                                                <div className={`imageThree_ctnr ${image_to_animate === 3 && "image--visible"} ${image_to_animate != 3 && "image--hidden"}`}>
                                                    <img className="profileEventImage three" src={event?.imageURLThree} />
                                                </div>
                                            </div>
                                            <li className="profileEvent_description">{event?.description}</li>
                                        </div>
                                    </NavLink>
                                )

                                }

                            </div>
                            <div className="pr_outmost_ctnr">

                            </div>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}