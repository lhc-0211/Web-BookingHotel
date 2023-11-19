import actionTypes from '../actions/actionTypes';

const initialState = {
    guests: [],
    error: false,
    loading: false,
}

const guestReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_GUEST_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.CREATE_GUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                guest: action.payload
            };
        case actionTypes.CREATE_GUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_GUESTS_SUCCESS:
            return {
                ...state,
                guests: action.payload,
                error: false,
            };
        case actionTypes.FETCH_GUESTS_FAIL:
            return {
                ...state,
                guests: [],
                error: true,
            };
        default:
            return state;
    }
}

export default guestReducer;
