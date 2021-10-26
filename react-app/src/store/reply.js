const CREATE_REPLY = 'reply/CREATE_REPLY';


export const create_reply = (replies) => {
    return {
        type: CREATE_REPLY,
        payload: replies
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
        case CREATE_REPLY:
            newState = Object.assign({}, state);
            newState.replies = action.payload;
            return newState;
        default:
            return state;
    }

}