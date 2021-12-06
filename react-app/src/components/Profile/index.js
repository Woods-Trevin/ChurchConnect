import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as profileActions from '../../store/profile'
import './Profile.css'

export default function Profile() {
    const dispatch = useDispatch()

    const [renderProfileView, setRenderProfileView] = useState(true)
    const [renderProfileUpdateView, setRenderProfileUpdateView] = useState(false)

    const currentUser = useSelector(state => state.session?.user)
    // console.log(currentUser?.id)

    const currentUserProfile = useSelector(state => state.currentUserProfile?.profile)
    // console.log(currentUserProfile)

    const userLocationSplit = currentUserProfile?.location?.split(',')
    console.log(userLocationSplit)

    const [profileImage, setProfileImage] = useState(null)
    const [address, setAddress] = useState(currentUserProfile?.location)
    const [homeChurch, setHomeChurch] = useState(currentUserProfile?.homeChurch)
    const [bio, setBio] = useState(currentUserProfile?.bio)
    console.log(currentUserProfile?.homeChurch)
    console.log(currentUserProfile?.bio)

    useEffect(() => {
        dispatch(profileActions.GetProfile(currentUser?.id))
    }, [profileImage, address, homeChurch, bio, renderProfileView, renderProfileUpdateView])

    // console.log(address)

    const handleUpdateProfileImage = (e) => {
        const currentFile = e.target.files[0];
        setProfileImage(currentFile);

    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", profileImage)
        formData.append("location", address)
        formData.append("homeChurch", homeChurch)
        formData.append("bio", bio)

        dispatch(profileActions.UpdateProfile(formData, currentUserProfile?.id))



    }

    return (
        <div className="profile_outmost_ctnr">
            <div className="profile_inner_ctnr">
                {renderProfileUpdateView &&
                    <form className="profileForm_ctnr" onSubmit={handleFormSubmit}>
                        <div className="profile_ctnr">
                            <img className="profile_pic_wide" src={currentUserProfile?.profilePicture} />
                            {/* <li className="update_profile_btn" onClick={() => {
                                setRenderProfileView(false);
                                setRenderProfileUpdateView(true);
                            }}>Update Profile</li> */}
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
                                            <div className="bio_label">
                                                Bio
                                            </div>
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
                        {/* <li className="user_location">{userCityState}</li> */}
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

                    </div>
                }
            </div>
        </div>
    )
}