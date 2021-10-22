const CREATE_ANNOUNCEMENT = 'announcement/CREATE_ANNOUNCEMENT'


const create_announcement = (announcement) => {
    return {
        type: CREATE_ANNOUNCEMENT,
        payload: announcement
    }
}


export const CreateAnnouncement = (payload) => async (dispatch) => {
    const response = await fetch('/api/announcements/', {
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

const initialState = { announcement: null }
export default function announcementReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_ANNOUNCEMENT:
            return state;
        default:
            return state;
    }
}