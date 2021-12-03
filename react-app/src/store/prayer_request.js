const CREATE_PRAYER_REQUEST = 'prayer/CREATE_PRAYER_REQUEST';
const GET_PRAYERS = 'prayer/GET_PRAYERS';
const GET_ONE_PRAYER = 'prayer/GET_ONE_PRAYER';
const PATCH_PRAYER = 'prayer/PATCH_PRAYER';
const DELETE_PRAYER = 'prayer/DELETE_PRAYER';


const create_prayer = (prayer) => {
    return {
        type: CREATE_PRAYER_REQUEST,
        payload: prayer
    }
}

const get_prayers = (prayers) => {
    return {
        type: GET_PRAYERS,
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

const delete_prayer = (prayer) => {
    return {
        type: DELETE_PRAYER,
        payload: prayer
    }
}


export const CreatePrayer = (formData) => async (dispatch) => {
    const response = await fetch('/api/pr/', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: formData
    })

    if (response.ok) {
        const data = response.json();
        dispatch(create_prayer(data.prayer_requests));
        return response;
    }
}

export const GetPrayers = () => async (dispatch) => {
    const response = await fetch('/api/pr/')

    if (response.ok) {
        const data = await response.json();
        // console.log(data.announcements);
        dispatch(get_prayers(data.prayer_requests));
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

export const DeletePrayer = (payload) => async (dispatch) => {
    const response = await fetch(`/api/pr/${payload.announcementId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json();
        // console.log(data.announcements);
        dispatch(delete_prayer(data));
        return response;
    }
}

const initialState = { prayer: null }
export default function prayerRequestReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_PRAYER_REQUEST:
            newState = Object.assign({}, state);
            newState.prayers = action.payload;
            return newState;
        case GET_PRAYERS:
            newState = Object.assign({}, state);
            newState.prayers = action.payload;
            return newState;
        case GET_ONE_PRAYER:
            newState = Object.assign({}, state);
            newState.current_prayer = action.payload;
            return newState;
        case PATCH_PRAYER:
            newState = Object.assign({}, state);
            newState.prayers = action.payload;
            return newState;
        case DELETE_PRAYER:
            return state;
        default:
            return state;
    }
}