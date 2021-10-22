import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as announcementActions from '../../store/announcement'
import './DashboardComponent.css';

export default function DashboardComponent() {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(announcementActions.GetAnnouncements())
    }, [dispatch])


    return (
        <div className="Dashboard_outmost_ctnr">
            <h1>Dashboard Component</h1>
            <div>

            </div>
            <div>

            </div>
        </div>
    )
}