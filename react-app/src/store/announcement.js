const CREATE_ANNOUNCEMENT = 'announcement/CREATE_ANNOUNCEMENT';
const GET_ANNOUNCEMENTS = 'announcement/GET_ANNOUNCEMENTS';
const GET_ONE_ANNOUNCEMENT = 'announcement/GET_ONE_ANNOUNCEMENT';
const PATCH_ANNOUNCEMENT = 'announcement/PATCH_ANNOUNCEMENT';
const DELETE_ANNOUNCEMENT = 'announcement/DELETE_ANNOUNCEMENT';


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

const get_one_announcement = (announcement) => {
    return {
        type: GET_ONE_ANNOUNCEMENT,
        payload: announcement
    }
}

const patch_announcement = (announcement) => {
    return {
        type: PATCH_ANNOUNCEMENT,
        payload: announcement
    }
}

const delete_announcement = (announcement) => {
    return {
        type: DELETE_ANNOUNCEMENT,
        payload: announcement
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

export const GetOneAnnouncement = (id) => async (dispatch) => {
    const response = await fetch(`/api/announcement/${id}`)

    if (response.ok) {
        const data = await response.json();
        // console.log(data.announcements);
        dispatch(get_one_announcement(data.announcement));
        return response;
    }
}

export const PatchAnnouncement = (payload) => async (dispatch) => {
    const response = await fetch(`/api/announcement/${payload.idx}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        const data = await response.json();
        // console.log(data.announcements);
        dispatch(patch_announcement(data));
        return response;
    }
}

export const DeleteAnnouncement = (id) => async (dispatch) => {
    const response = await fetch(`/api/announcement/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json();
        // console.log(data.announcements);
        dispatch(delete_announcement(data));
        return response;
    }
}

const initialState = { announcements: null }
export default function announcementReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_ANNOUNCEMENT:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case GET_ANNOUNCEMENTS:
            newState = Object.assign({}, state);
            newState.announcements = action.payload;
            return newState;
        case GET_ONE_ANNOUNCEMENT:
            newState = Object.assign({}, state);
            newState.current_announcement = action.payload;
            return newState;
        case PATCH_ANNOUNCEMENT:
            return state;
        case DELETE_ANNOUNCEMENT:
            return state;
        default:
            return state;
    }
}