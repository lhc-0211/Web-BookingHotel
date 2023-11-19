import actionTypes from '../actions/actionTypes';

const initialState = {
    roomTypes: [],
    rooms: [],
    error: false,
    loading: false,
}

const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROOMTYPE_SUCCESS:
            return {
                ...state,
                roomTypes: action.payload,
                error: false,
            };
        case actionTypes.FETCH_ROOMTYPE_FAIL:
            return {
                ...state,
                roomTypes: [],
                error: true,
            };
        case actionTypes.FETCH_ROOM_SUCCESS:
            return {
                ...state,
                rooms: action.payload,
                error: false,
            };
        case actionTypes.FETCH_ROOM_FAIL:
            return {
                ...state,
                rooms: [],
                error: true,
            };
        default:
            return state;
    }
}

export default roomReducer;
