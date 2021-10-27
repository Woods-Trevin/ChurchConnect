const CREATE_REPLY = 'reply/CREATE_REPLY';
const GET_REPLIES = 'reply/GET_REPLIES';
const UPDATE_REPLY = 'reply/UPDATE_REPLY';
const DELETE_REPLY = 'reply/DELETE_REPLY';


export const get_replies = (replies) => {
    return {
        type: GET_REPLIES,
        payload: replies
    }
}

export const create_reply = (replies) => {
    return {
        type: CREATE_REPLY,
        payload: replies
    }
}

export const update_reply = (replies) => {
    return {
        type: UPDATE_REPLY,
        payload: replies
    }
}

export const delete_reply = (replies) => {
    return {
        type: DELETE_REPLY,
        payload: replies
    }
}




export const GetReplies = (payload) => async (dispatch) => {
    const response = await fetch('/api/reply/')

    if (response.ok) {
        const data = await response.json()
        dispatch(get_replies(data.replies))
        return response
    }
}

export const CreateReply = (payload) => async (dispatch) => {
    const response = await fetch('/api/reply/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(create_reply(data.replies))
        return response
    }
}

export const UpdateReply = (payload) => async (dispatch) => {
    const response = await fetch(`/api/reply/${payload.idx}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(update_reply(data.replies))
        return response
    }
}

export const DeleteReply = (id) => async (dispatch) => {
    const response = await fetch(`/api/reply/${id}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(delete_reply(data.replies))
        return response
    }
}


export default function replyReducer(state = { replies: null }, action) {
    let newState;
    switch (action.type) {
        case GET_REPLIES:
            newState = Object.assign({}, state);
            newState.replies = action.payload;
            return newState;
        case CREATE_REPLY:
            newState = Object.assign({}, state);
            newState.replies = action.payload;
            return newState;
        case UPDATE_REPLY:
            newState = Object.assign({}, state);
            newState.replies = action.payload;
            return newState;
        case DELETE_REPLY:
            newState = Object.assign({}, state);
            newState.replies = action.payload;
            return newState;
        default:
            return state;
    }

}