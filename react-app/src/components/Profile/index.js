import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as profileActions from '../../store/profile'
import './Profile.css'

export default function Profile() {
    const dispatch = useDispatch()

    const [profileImage, setProfileImage] = useState(null)
    const [address, setAddress] = useState("")
    const [cityState, setCityState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [homeChurch, setHomeChurch] = useState("")
    const [bio, setBio] = useState("")

    const [renderProfileView, setRenderProfileView] = useState(true)
    const [renderProfileUpdateView, setRenderProfileUpdateView] = useState(false)

    const currentUser = useSelector(state => state.session?.user)
    console.log(currentUser?.id)

    const


        console.log(address)

    const handleUpdateProfileImage = (e) => {
        const currentFile = e.target.files[0];
        setProfileImage(currentFile);

    }

    function handleFormSubmit(e) {
        e.preventDefault();

    }

    useEffect(() => {
        dispatch(profileActions.GetProfile(currentUser?.id))
    }, [profileImage, address])

    // console.log(profileImage)

    return (
        <div className="profile_outmost_ctnr">
            <h1>
                Profile Component
            </h1>
            <div className="profile_inner_ctnr">
                {renderProfileUpdateView &&
                    <div className="profile_ctnr">
                        <form className="profileForm_ctnr" onSubmit={handleFormSubmit}>
                            <label className="profileImg_ctnr">
                                <div className="profileImg_label">
                                    Image URL:
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
                            <label>
                                <div className="userAddress_label">
                                    Address
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    value={address}
                                    className="profileAddress_input"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </label>
                            <label>
                                <div className="cityState_label">
                                    {"City & State"}
                                </div>
                                <input
                                    type="text"
                                    name="cityState"
                                    value={cityState}
                                    className="profileCityState_input"
                                    onChange={(e) => setCityState(e.target.value)}
                                />
                            </label>
                            <label>
                                <div className="zipcode_label">
                                    Address
                                </div>
                                <input
                                    type="text"
                                    name="zipcode"
                                    value={zipcode}
                                    className="profileZipcode_input"
                                    onChange={(e) => setZipcode(e.target.value)}
                                />
                            </label>
                            <label>
                                <div className="homeChurch_label">
                                    Home Church
                                </div>
                                <input
                                    type="text"
                                    name="homechurch"
                                    value={homeChurch}
                                    className="profileHomeChurch_input"
                                    onChange={(e) => setHomeChurch(e.target.value)}
                                />
                            </label>
                            <label>
                                <div className="bio_label">
                                    Bio
                                </div>
                                <textarea
                                    name="bio"
                                    value={bio}
                                    className="profileBio_input"
                                    onChange={(e) => setBio(e.target.value)}
                                    rows="10" cols="50"
                                />
                            </label>
                        </form>
                    </div>
                }
                {renderProfileView &&
                    <div className="profile_ctnr">
                        <img src={ } />

                    </div>
                }
            </div>
        </div>
    )
}