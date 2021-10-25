export const CREATE_COMMENT = 'comment/CREATE_COMMENT';
export const UPDATE_COMMENT = 'comment/UPDATE_COMMENT';
export const DELETE_COMMENT = 'comment/DELETE_COMMENT';


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

export const UpdateComment = (payload) => async (dispatch) => {
    const response = await fetch(`/api/comment/${payload.idx}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)

    });

    if (response.ok) {
        const data = response.json();
        dispatch(update_comment(data));
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
        const data = response.json();
        dispatch(delete_comment(data));
        return response;
    }
}


// const initialState = { comments: null };
// export default function commentReducer(state = initialState, action) {
//     let newState;
//     switch (action.type) {
//         case CREATE_COMMENT:
//             newState = Object.assign({}, state);
//             newState.comments = action.payload;
//             return newState;
//         case UPDATE_COMMENT:
//             newState = Object.assign({}, state);
//             newState.updatedComment = action.payload;
//             return newState;
//         case DELETE_COMMENT:
//             newState = Object.assign({}, state);
//             newState.comments = action.payload;
//             return newState;
//         default:
//             return state;
//     }
// }