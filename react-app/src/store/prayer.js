const GIVE_PRAYER = "prayer/GIVE_PRAYER";
const GET_PRAYERS = "prayer/GET_PRAYERS";


const give_prayer = (prayers) => {
    return {
        type: GIVE_PRAYER,
        payload: prayers

    }
}

const get_prayers = (prayers) => {
    return {
        type: GET_PRAYERS,
        payload: prayers

    }
}



export const GivePrayer = (payload) => async (dispatch) => {
    const response = await fetch('/api/prayer/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = response.json();
        dispatch(give_prayer(data.prayers))
        return response;
    }

}

export const GetPrayers = () => async (dispatch) => {
    const response = await fetch('/api/prayer/')

    if (response.ok) {
        const data = response.json();
        dispatch(get_prayers(data.prayers))
        return response;
    }

}


const initialState = { prayers: null }
export default function prayerReducer(state = initialState, action) {
    let newState;
    switch (action) {
        case GIVE_PRAYER:
            newState = Object.assign({}, state)
            newState.prayers = action.payload
            return newState;
        case GET_PRAYERS:
            newState = Object.assign({}, state)
            newState.prayers = action.payload
            return newState;
        default:
            return state;
    }

}