export const GET_COMMENTS = 'comment/GET_COMMENTS';
export const CREATE_COMMENT = 'comment/CREATE_COMMENT';
export const UPDATE_COMMENT = 'comment/UPDATE_COMMENT';
export const DELETE_COMMENT = 'comment/DELETE_COMMENT';


export const get_comments = (comments) => {
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}

export const create_comment = (comments) => {
    return {
        type: CREATE_COMMENT,
        payload: comments
    }
}

export const update_comment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        payload: comment
    }
}

export const delete_comment = (comments) => {
    return {
        type: DELETE_COMMENT,
        payload: comments
    }
}


export const GetComments = () => async (dispatch) => {
    const response = await fetch('/api/comment/');

    if (response.ok) {
        const data = await response.json();
        dispatch(get_comments(data.comments));
        return response;
    }
}

export const CreateComment = (payload) => async (dispatch) => {
    const response = await fetch('/api/comment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)

    });

    if (response.ok) {
        const data = await response.json();
        dispatch(create_comment(data.comments));
        return response;
    }
}

export const UpdateComment = (payload) => async (dispatch) => {
    const response = await fetch(`/api/comment/${payload.idx}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)

    });

    if (response.ok) {
        const data = await response.json();
        dispatch(update_comment(data.comments));
        return response;
    }
}

export const DeleteComment = (payload) => async (dispatch) => {
    console.log(payload.id)
    const response = await fetch(`/api/comment/${payload.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data.comments);
        dispatch(delete_comment(data.comments));
        return response;
    }
}



export default function commentReducer(state = { comments: null }, action) {
    let newState;
    switch (action.type) {
        case GET_COMMENTS:
            newState = Object.assign({}, state);
            newState.comments = action.payload;
            return newState;
        case CREATE_COMMENT:
            newState = Object.assign({}, state);
            newState.comments = action.payload;
            return newState;
        case UPDATE_COMMENT:
            newState = Object.assign({}, state);
            newState.comments = action.payload;
            return newState;
        case DELETE_COMMENT:
            newState = Object.assign({}, state);
            newState.comments = action.payload;
            return newState;
        default:
            return state;
    }
}