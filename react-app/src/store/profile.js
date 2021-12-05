const CREATE_PROFILE = 'profile/CREATE_PROFILE';
const GET_PROFILE = 'profile/GET_PROFILE';
const UPDATE_PROFILE = 'profile/UPDATE_PROFILE';
const DELETE_PROFILE = 'profile/DELETE_PROFILE';


export const create_profile = (profile) => {
    return {
        type: CREATE_PROFILE,
        payload: profile
    }
}

export const get_profile = (profile) => {
    return {
        type: GET_PROFILE,
        payload: profile
    }
}

export const update_profile = (profile) => {
    return {
        type: UPDATE_PROFILE,
        payload: profile
    }
}

export const delete_profile = (profile) => {
    return {
        type: DELETE_PROFILE,
        payload: profile
    }
}


export const CreateProfile = (payload) => async (dispatch) => {
    const response = await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(create_profile(data.profile))
        return response
    }
}

export const GetProfile = (payload) => async (dispatch) => {
    const response = await fetch('')

    if (response.ok) {
        const data = await response.json()
        dispatch(get_profile(data.profile))
        return response
    }
}

export const UpdateProfile = (payload) => async (dispatch) => {
    const response = await fetch('')

    if (response.ok) {
        const data = await response.json()
        dispatch(update_profile(data.profile))
        return response
    }
}

export const DeleteProfile = (payload) => async (dispatch) => {
    const response = await fetch('')

    if (response.ok) {
        const data = await response.json()
        dispatch(delete_profile(data.profile))
        return response
    }
}


const initialState = { profile: null }
export default function profileReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_PROFILE:
            newState = Object.assign({}, state)
            newState.profile = action.payload
            return newState;
        case GET_PROFILE:
            newState = Object.assign({}, state)
            newState.profile = action.payload
            return newState;
        case UPDATE_PROFILE:
            newState = Object.assign({}, state)
            newState.profile = action.payload
            return newState;
        case DELETE_PROFILE:
            return state
        default:
            return state;
    }
}