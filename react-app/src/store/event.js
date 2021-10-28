import { DELETE_COMMENT } from './comment'


const CREATE_EVENT = 'event/CREATE_EVENT';
const GET_EVENTS = 'event/GET_EVENTS';
const GET_ONE_EVENT = 'event/GET_ONE_EVENT';
const PATCH_EVENT = 'event/PATCH_EVENT';
const DELETE_EVENT = 'event/DELETE_EVENT';


export const get_events = (events) => {
    return {
        type: GET_EVENTS,
        payload: events
    }
}

export const get_one_event = (event) => {
    return {
        type: GET_ONE_EVENT,
        payload: event
    }
}

export const create_event = (events) => {
    return {
        type: CREATE_EVENT,
        payload: events
    }
}

export const patch_event = (event) => {
    return {
        type: PATCH_EVENT,
        payload: event
    }
}

export const delete_event = (event) => {
    return {
        type: DELETE_EVENT,
        payload: event
    }
}




export const GetEvents = () => async (dispatch) => {
    const response = await fetch('/api/event/');

    if (response.ok) {
        const data = await response.json();
        dispatch(get_events(data.events));
        return response
    }

};

export const GetOneEvent = (id) => async (dispatch) => {
    const response = await fetch(`/api/event/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(get_one_event(data.event));
        return response
    }

};

export const CreateEvent = (payload) => async (dispatch) => {
    const response = await fetch('/api/event/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(create_event(data));
        return response
    }

};

export const PatchEvent = (payload) => async (dispatch) => {
    const response = await fetch(`/api/event/${payload.idx}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        if (data.events)
            dispatch(patch_event(data.events));
        return response
    }

};

export const DeleteEvent = (payload) => async (dispatch) => {
    const response = await fetch(`/api/event/${payload.eventId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(delete_event(data.events));
        return response
    }

};


const initialState = { events: null, currentevent: null };
export default function eventReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_EVENT:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        case GET_EVENTS:
            newState = Object.assign({}, state);
            newState.events = action.payload;
            return newState;
        case GET_ONE_EVENT:
            newState = Object.assign({}, state);
            newState.currentevent = action.payload;
            return newState;
        case PATCH_EVENT:
            newState = Object.assign({}, state);
            newState.events = action.payload;
            return newState;
        case DELETE_EVENT:
            newState = Object.assign({}, state);
            newState.events = action.payload;
            return newState;
        default:
            return state;
    }
}