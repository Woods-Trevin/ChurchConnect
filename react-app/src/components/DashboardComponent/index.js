import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import * as prayerRequestActions from '../../store/prayer_request'
import * as eventActions from '../../store/event'
import * as prayerActions from '../../store/prayer'
import Footer from '../Footer'
import './DashboardComponent.css';






export default function DashboardComponent({ setUpdateAnnouncement }) {
    const dispatch = useDispatch()

    const prayer_requests = useSelector(state => state.prayer_request.prayer_requests)
    const pr_length = prayer_requests?.length
    const events = useSelector(state => state.event.events)
    const eventsLength = events?.length
    // console.log(eventsLength)
    const currentUserId = useSelector(state => state.session.user?.id)
    // console.log(currentUserId)
    const prayers = useSelector(state => state.prayer.prayers)
    // console.log(prayers)

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    // const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const imageURLRegex = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/






    function handlePrayerCreateDelete(announcementId, userId) {
        // console.log(announcementId)
        // console.log(userId)
        // const prayerWithPRIdExist = prayers.find(pr => pr.prayer_request_id === announcementId)
        // const prayerWithUserIdExist = prayers.find(pr => pr.userId === currentUserId)
        const currentPrayer = prayers?.find(pr => pr.userId === currentUserId && pr.prayer_request_id === announcementId)

        console.log(currentPrayer)

        if (currentPrayer) {
            // console.log("delete should trigger")
            dispatch(prayerActions.DeletePrayer(currentPrayer.id))
        } else {
            dispatch(prayerActions.GivePrayer({ user_id: currentUserId, pr_id: announcementId }))
            // console.log("creation should trigger")
        }


    }

    // const [image_to_animate, set_image_to_animate] = useState(1)
    let image_to_animate = 0;

    useEffect(() => {
        dispatch(prayerRequestActions.GetPrayerRequests())
        dispatch(prayerActions.GetPrayers())
        dispatch(eventActions.GetEvents())

        const interval = setInterval(() => {
            if (image_to_animate < 4) {
                image_to_animate += 1
                console.log(image_to_animate, "WHEN BELOW 5");
            } else {
                image_to_animate = 1
                console.log(image_to_animate, "WHEN REACHING 5");
            }

        }, 2000)

        return () => clearInterval(interval)


    }, [dispatch]);


    return (
        <div className="Dashboard">
            <div className="Dashboard_intro_ctnr">
                <div className="animated_images_ctnr">
                    <div className="animated_images_inner_ctnr">
                        <div className="animated_images_rowOne">
                            <div className="rowOne imageOne"></div>
                            <div className="rowOne imageTwo"></div>
                            <div className="rowOne imageThree"></div>
                            <div className="rowOne imageFour"></div>
                            <div className="rowOne imageFive"></div>
                            <div className="rowOne imageSix"></div>
                            <div className="rowOne imageSeven"></div>
                            <div className="rowOne imageEight"></div>
                            <div className="rowOne imageNine"></div>
                            <div className="rowOne imageTen"></div>
                        </div>
                        <div className="animated_images_rowTwo">
                            <div className="rowTwo imageOne"></div>
                            <div className="rowTwo imageTwo"></div>
                            <div className="rowTwo imageThree"></div>
                            <div className="rowTwo imageFour"></div>
                            <div className="rowTwo imageFive"></div>
                            <div className="rowTwo imageSix"></div>
                            <div className="rowTwo imageSeven"></div>
                            <div className="rowTwo imageEight"></div>
                            <div className="rowTwo imageNine"></div>
                            <div className="rowTwo imageTen"></div>
                        </div>
                        <div className="animated_images_rowThree">
                            <div className="rowThree imageOne"></div>
                            <div className="rowThree imageTwo"></div>
                            <div className="rowThree imageThree"></div>
                            <div className="rowThree imageFour"></div>
                            <div className="rowThree imageFive"></div>
                            <div className="rowThree imageSix"></div>
                            <div className="rowThree imageSeven"></div>
                            <div className="rowThree imageEight"></div>
                            <div className="rowThree imageNine"></div>
                            <div className="rowThree imageTen"></div>
                        </div>
                        <div className="animated_images_rowFour">
                            <div className="rowFour imageOne"></div>
                            <div className="rowFour imageTwo"></div>
                            <div className="rowFour imageThree"></div>
                            <div className="rowFour imageFour"></div>
                            <div className="rowFour imageFive"></div>
                            <div className="rowFour imageSix"></div>
                            <div className="rowFour imageSeven"></div>
                            <div className="rowFour imageEight"></div>
                            <div className="rowFour imageNine"></div>
                            <div className="rowFour imageTen"></div>
                        </div>
                    </div>
                    <p className="CC_intro_text">
                        Church Connect
                    </p>

                </div>
                <div className="CCBlurb_ctnr" >
                    <p className="CCBlurb">
                        ChurchConnect was made to bring members of a church community together by allowing communication between one another through the creation of Events and Announcements...
                    </p>
                    <div className="CCStarter_btn_ctnr" >
                        <Link to="/event" className="CCStarter_btn" >
                            Start By Creating an Event
                        </Link>
                    </div>
                </div>
            </div>
            <div className="Dashboard_outmost_ctnr">
                <div className="Dashboard_pr_ctnr">
                    {/* <div>
                        <h3 className="selectAnnouncement_prompt" >
                            Select an Announcement
                        </h3>
                        <h3 className="scrollAnnouncement_prompt">
                            Scroll to View More
                        </h3>
                    </div> */}
                    <div className="Dashboard_pr_view">
                        {
                            prayer_requests?.map((prayer_request, idx) =>
                                <li key={idx} className='DashboardAnnouncements_link' to={`/announcement/${prayer_request.id}`} onClick={() => setUpdateAnnouncement(false)}>
                                    <div className='DashboardAnnouncements_items_wrapper'>
                                        {/* {imageURLRegex.test(announcement?.imageURL) && <img className='DashboardAnnouncement_item img' src={announcement?.imageURL} />} */}
                                        {/* <li className='DashboardAnnouncement_item title'>{announcement.title}</li> */}
                                        <li className='DashboardAnnouncement_item description'>{prayer_request.description}</li>
                                        <li className='DashboardAnnouncement_item username'>~ {prayer_request.user?.username}</li>
                                        <div className='prayer_ctnr'>
                                            <li className='prayer_ctn'>{`${prayers?.filter(prayer => prayer.prayer_request_id === prayer_request.id).length}`}</li>
                                            <li className="prayer_btn" onClick={() => handlePrayerCreateDelete(prayer_request.id)} />
                                        </div>
                                    </div>
                                </li>
                            )
                        }

                    </div>

                </div >
                {/* <div className="Dashboard_event_ctnr_title">
                    <h3 className="selectEvent_prompt" >
                        Select an Event
                    </h3>
                    <h3 className="swipeEvent_prompt">
                        Swipe to View More
                    </h3>
                </div> */}
                <div className="Dashboard_event_ctnr" >
                    {events?.map((event, idx) =>
                        <NavLink key={idx} className="NavLink_ctnr" to={`/event/${event?.id}`}>
                            <div className="Dashboard_event_title">
                                {event?.title}
                            </div>
                            {(imageURLRegex.test(event?.imageURL) || imageURLRegex.test(event.imageURLTwo) || imageURLRegex.test(event.imageURLThree)) &&
                                <div className="eventImage_ctnr" >
                                    <img className="EventImage one" src={imageURLRegex.test(event?.imageURL) ? event?.imageURL : 'https://icon2.cleanpng.com/20180605/ijl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d2414b5.0787389815282337411478.jpg'} alt="alt" />
                                    <img className="EventImage two" src={imageURLRegex.test(event?.imageURLTwo) ? event?.imageURLTwo : 'https://icon2.cleanpng.com/20180605/ijl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d2414b5.0787389815282337411478.jpg'} alt="alt" />
                                    <img className="EventImage three" src={imageURLRegex.test(event?.imageURLThree) ? event?.imageURLThree : 'https://icon2.cleanpng.com/20180605/ijl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d2414b5.0787389815282337411478.jpg'} alt="alt" />
                                </div>
                            }
                            <div className="DashboardEvent_items_ctnr">
                                <div className="startDateTime_ctnr">
                                    <p>Event Starts: </p>
                                    <li className="DashboardEvent_items startDate" >{new Date(new Date(event?.startDate).setDate(new Date(event?.startDate).getDate() + 1)).toLocaleDateString(undefined, options)}</li>
                                    <li className="DashboardEvent_items startTime" >{new Date('1970-01-01T' + event?.startTime + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })}</li>
                                </div>
                                <div className="endDateTime_ctnr">
                                    <p>Event Ends: </p>
                                    <li className="DashboardEvent_items endDate" >{new Date(new Date(event?.endDate).setDate(new Date(event?.endDate).getDate() + 1)).toLocaleDateString(undefined, options)}</li>
                                    <li className="DashboardEvent_items endTime" >{new Date('1970-01-01T' + event?.endTime + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' })}</li>
                                </div>
                            </div>
                        </NavLink>

                    )
                    }
                </div >
            </div >
        </div >
    )
}