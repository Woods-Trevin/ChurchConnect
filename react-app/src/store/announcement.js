const CREATE_ANNOUNCEMENT = 'announcement/CREATE_ANNOUNCEMENT'
const GET_ANNOUNCEMENTS = 'announcement/GET_ANNOUNCEMENTS'


const create_announcement = (announcement) => {
    return {
        type: CREATE_ANNOUNCEMENT,
        payload: announcement
    }
}

const get_announcement = (announcements) => {
    return {
        type: GET_ANNOUNCEMENTS,
        payload: announcements
    }
}


export const CreateAnnouncement = (payload) => async (dispatch) => {
    const response = await fetch('/api/announcement/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = response.json();
        dispatch(create_announcement(data));
        return response;
    }
}

export const GetAnnouncements = () => async (dispatch) => {
    const response = await fetch('/api/announcement/')

    if (response.ok) {
        const data = await response.json();
        // console.log(data.announcements);
        dispatch(get_announcement(data.announcements));
        return response;
    }
}

const initialState = { announcement: null }
export default function announcementReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_ANNOUNCEMENT:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case GET_ANNOUNCEMENTS:
            newState = Object.assign({}, state);
            newState.announcement = action.payload;
            return newState;
        default:
            return state;
    }
}