const CREATE_PRAYER_REQUEST = 'prayer/CREATE_PRAYER_REQUEST';
const GET_PRAYER_REQUEST = 'prayer/GET_PRAYER_REQUEST';
const GET_ONE_PRAYER = 'prayer/GET_ONE_PRAYER';
const PATCH_PRAYER = 'prayer/PATCH_PRAYER';
const DELETE_PRAYER = 'prayer/DELETE_PRAYER';


const create_prayer_request = (prayer) => {
    return {
        type: CREATE_PRAYER_REQUEST,
        payload: prayer
    }
}

const get_prayer_request = (prayers) => {
    return {
        type: GET_PRAYER_REQUEST,
        payload: prayers
    }
}

const get_one_prayer = (prayer) => {
    return {
        type: GET_ONE_PRAYER,
        payload: prayer
    }
}

const patch_prayer = (prayer) => {
    return {
        type: PATCH_PRAYER,
        payload: prayer
    }
}

const delete_prayer = (prayers) => {
    return {
        type: DELETE_PRAYER,
        payload: prayers
    }
}


export const CreatePrayerRequest = (formData) => async (dispatch) => {
    const response = await fetch('/api/pr/', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: formData
    })

    if (response.ok) {
        const data = response.json();
        dispatch(create_prayer_request(data.prayer_requests));
        return data;
    }
}

export const GetPrayerRequests = () => async (dispatch) => {
    const response = await fetch('/api/pr/')

    if (response.ok) {
        const data = await response.json();
        // console.log(data.announcements);
        dispatch(get_prayer_request(data.prayer_requests));
        return response;
    }
}

export const GetOnePrayer = (id) => async (dispatch) => {
    const response = await fetch(`/api/pr/${id}`)

    if (response.ok) {
        const data = await response.json();
        // console.log(data.announcements);
        dispatch(get_one_prayer(data.prayer_request));
        return response;
    }
}

export const PatchPrayer = (formData, announcementId) => async (dispatch) => {
    const response = await fetch(`/api/pr/${announcementId}`, {
        method: 'PATCH',
        // headers: { 'Content-Type': 'application/json' },
        body: formData
    })


    if (response.ok) {
        const data = await response.json();
        // console.log(data.announcements);
        dispatch(patch_prayer(data.prayer_requests));
        return response;
    }
}

export const DeletePrayer = (id) => async (dispatch) => {
    const response = await fetch(`/api/pr/${id}`, {
        method: 'DELETE',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json();
        // console.log(data.announcements);
        dispatch(delete_prayer(data.prayer_requests));
        return response;
    }
}

const initialState = { prayer_requests: null }
export default function prayerRequestReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_PRAYER_REQUEST:
            newState = Object.assign({}, state);
            newState.prayer_requests = action.payload;
            return newState;
        case GET_PRAYER_REQUEST:
            newState = Object.assign({}, state);
            newState.prayer_requests = action.payload;
            return newState;
        case GET_ONE_PRAYER:
            newState = Object.assign({}, state);
            newState.current_prayer_request = action.payload;
            return newState;
        case PATCH_PRAYER:
            newState = Object.assign({}, state);
            newState.prayer_requests = action.payload;
            return newState;
        case DELETE_PRAYER:
            newState = Object.assign({}, state);
            newState.prayer_requests = action.payload;
            return newState;
        default:
            return state;
    }
}