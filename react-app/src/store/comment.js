const CREATE_COMMENT = 'comment/CREATE_COMMENT';


export const create_comment = (comments) => {
    return {
        type: CREATE_COMMENT,
        payload: comments
    }
}


export const CreateComment = (payload) => async (dispatch) => {
    const response = await fetch('/api/comment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)

    });

    if (response.ok) {
        const data = response.json();
        dispatch(create_comment(data.comments));
        return response;
    }
}


const initialState = { comments: null };
export default function commentReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_COMMENT:
            newState = Object.assign({}, state);
            newState.comments = action.payload;
            return newState;
        default:
            return state;
    }
}