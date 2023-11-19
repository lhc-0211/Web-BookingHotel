import actionTypes from '../actions/actionTypes';

const initialState = {
    cities: [],
    citiesFind: [],
    categories: [],
    error: false,
    loading: false,

}

const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CITIES_SUCCESS:
            return {
                ...state,
                cities: action.payload,
                error: false,
            };
        case actionTypes.FETCH_CITIES_FAIL:
            return {
                ...state,
                cities: [],
                error: true,
            };
        //[CREATE_CITY] , [EDIT_CITY] và [DELETE_CITY]
        case actionTypes.CREATE_CITY_START:
        case actionTypes.EDIT_CITY_START:
        case actionTypes.DELETE_CITY_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.CREATE_CITY_SUCCESS:
        case actionTypes.EDIT_CITY_SUCCESS:
        case actionTypes.DELETE_CITY_SUCCESS:
            return {
                ...state,
                loading: false,
                city: action.payload
            };
        case actionTypes.CREATE_CITY_FAIL:
        case actionTypes.EDIT_CITY_FAIL:
        case actionTypes.DELETE_CITY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                error: false,
            };
        case actionTypes.FETCH_CATEGORIES_FAIL:
            return {
                ...state,
                categories: [],
                error: true,
            };
        case actionTypes.CREATE_CATEGORY_START:
        case actionTypes.EDIT_CATEGORY_START:
        case actionTypes.DELETE_CATEGORY_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.CREATE_CATEGORY_SUCCESS:
        case actionTypes.EDIT_CATEGORY_SUCCESS:
        case actionTypes.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload
            };
        case actionTypes.CREATE_CATEGORY_FAIL:
        case actionTypes.EDIT_CATEGORY_FAIL:
        case actionTypes.DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FIND_POSITION_CITIES_SUCCESS:
            return {
                ...state,
                citiesFind: action.payload,
                error: false,
            };
        case actionTypes.FIND_POSITION_CITIES_FAIL:
            return {
                ...state,
                citiesFind: [],
                error: true,
            };
        default:
            return state;
    }
}

export default cityReducer;