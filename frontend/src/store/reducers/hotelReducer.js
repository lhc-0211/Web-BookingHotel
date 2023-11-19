import actionTypes from '../actions/actionTypes';

const initialState = {
    hotels: [],
    hotelsFindByCity: [],
    hotelsFindByCategory: [],
    hotelsFindByCompany: [],
    error: false,
    loading: false,
}

const hotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HOTELS_SUCCESS:
            return {
                ...state,
                hotels: action.payload,
                error: false,
            };
        case actionTypes.FETCH_HOTELS_FAIL:
            return {
                ...state,
                hotels: [],
                error: true,
            };
        case actionTypes.CREATE_HOTEL_START:
        case actionTypes.EDIT_HOTEL_START:
        case actionTypes.DELETE_HOTEL_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.CREATE_HOTEL_SUCCESS:
        case actionTypes.EDIT_HOTEL_SUCCESS:
        case actionTypes.DELETE_HOTEL_SUCCESS:
            return {
                ...state,
                loading: false,
                hotel: action.payload
            };
        case actionTypes.CREATE_HOTEL_FAIL:
        case actionTypes.EDIT_HOTEL_FAIL:
        case actionTypes.DELETE_HOTEL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FIND_HOTEL_CITIES_SUCCESS:
            return {
                ...state,
                hotelsFindByCity: action.payload,
                error: false,
            };
        case actionTypes.FIND_HOTEL_CITIES_FAIL:
            return {
                ...state,
                hotelsFindByCity: [],
                error: true,
            };
        case actionTypes.FIND_HOTEL_CATEGORY_SUCCESS:
            return {
                ...state,
                hotelsFindByCategory: action.payload,
                error: false,
            };
        case actionTypes.FIND_HOTEL_CATEGORY_FAIL:
            return {
                ...state,
                hotelsFindByCategory: [],
                error: true,
            };
        case actionTypes.FIND_HOTEL_COMPANY_SUCCESS:
            return {
                ...state,
                hotelsFindByCompany: action.payload,
                error: false,
            };
        case actionTypes.FIND_HOTEL_COMPANY_FAIL:
            return {
                ...state,
                hotelsFindByCompany: [],
                error: true,
            };

        case actionTypes.CREATE_BOOKING_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                reservation: action.payload
            };
        case actionTypes.CREATE_BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default hotelReducer;
