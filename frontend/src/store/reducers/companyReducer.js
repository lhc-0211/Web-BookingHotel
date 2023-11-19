import actionTypes from '../actions/actionTypes';

const initialState = {
    companies: [],
    error: false,
    loading: false,
}

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_COMPANY_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.CREATE_COMPANY_SUCCESS:
            return {
                ...state,
                loading: false,
                company: action.payload
            };
        case actionTypes.CREATE_COMPANY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_COMPANIES_SUCCESS:
            return {
                ...state,
                companies: action.payload,
                error: false,
            };
        case actionTypes.FETCH_COMPANIES_FAIL:
            return {
                ...state,
                companies: [],
                error: true,
            };
        default:
            return state;
    }
}

export default companyReducer;
