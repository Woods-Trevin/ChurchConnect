const CREATE_REPLY = 'reply/CREATE_REPLY';
const GET_REPLIES = 'reply/GET_REPLIES';


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
        default:
            return state;
    }

}