const CREATE_EVENT = 'event/CREATE_EVENT';


export const create_event = (events) => {
    return {
        type: CREATE_EVENT,
        payload: events
    }
}




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


const initialState = { event: null }
export default function eventReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_EVENT:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}