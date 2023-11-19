import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

import {
    handleGetHotel,
    handleCreateHotel,
    handleEditHotel,
    handleDeleteHotel,
    handleGetHotelByCity,
    handleGetHotelByCategory,
    handleGetHotelByCompany,


} from '../../services/hotelService'

//[GET] hotel
export const fetchHotels = () => {
    return async (dispatch) => {
        try {
            const response = await handleGetHotel('ALL');
            const hotels = response.hotels;
            dispatch(fetchHotelsSuccess(hotels));
        } catch (error) {
            dispatch(fetchHotelsFail());
        }
    };
};

export const fetchHotelsSuccess = (hotels) => ({
    type: actionTypes.FETCH_HOTELS_SUCCESS,
    payload: hotels,
});

export const fetchHotelsFail = () => ({
    type: actionTypes.FETCH_HOTELS_FAIL,
});
// [CREATE_HOTEL] và [EDIT_HOTEL]
export const createHotelStart = () => ({
    type: actionTypes.CREATE_HOTEL_START,
});

export const createHotelSuccess = (hotel) => ({
    type: actionTypes.CREATE_HOTEL_SUCCESS,
    payload: hotel,
});

export const createHotelFail = (error) => ({
    type: actionTypes.CREATE_HOTEL_FAIL,
    payload: error,
});

export const editHotelStart = () => ({
    type: actionTypes.EDIT_HOTEL_START,
});

export const editHotelSuccess = (hotel) => ({
    type: actionTypes.EDIT_HOTEL_SUCCESS,
    payload: hotel,
});

export const editHotelFail = (error) => ({
    type: actionTypes.EDIT_HOTEL_FAIL,
    payload: error,
});

export const deleteHotelStart = () => ({
    type: actionTypes.DELETE_HOTEL_START,
});

export const deleteHotelSuccess = (hotel) => ({
    type: actionTypes.DELETE_HOTEL_SUCCESS,
    payload: hotel,
});

export const deleteHotelFail = (error) => ({
    type: actionTypes.DELETE_HOTEL_FAIL,
    payload: error,
});

export const handleCUDHotel = (actionType, hotelData) => async (dispatch) => {
    let startAction, successAction, failAction;

    if (actionType === 'CREATE') {
        startAction = createHotelStart();
        successAction = createHotelSuccess;
        failAction = createHotelFail;
    } else if (actionType === 'EDIT') {
        startAction = editHotelStart();
        successAction = editHotelSuccess;
        failAction = editHotelFail;
    } else if (actionType === 'DELETE') {
        startAction = deleteHotelStart();
        successAction = deleteHotelSuccess;
        failAction = deleteHotelFail;
    }

    try {
        dispatch(startAction);
        let response;

        if (actionType === 'CREATE') {
            response = await handleCreateHotel(hotelData);
        } else if (actionType === 'EDIT') {
            response = await handleEditHotel(hotelData);
        } else if (actionType === 'DELETE') {
            response = await handleDeleteHotel(hotelData.id);
        }

        const hotel = response.hotel;
        if (response && response.errCode === 0) {
            toast.success('Cập nhật thành công');
            dispatch(successAction(hotel));
        }
        else toast.error(`${response.message}`)
    } catch (error) {
        toast.error('Cập nhật thất bại')
        dispatch(failAction(error.message));
    }
};

//[FIND_CITY_POSITION] city  search hotel by cityId
export const fetchFindHotelsByCity = (cityId, categoryId) => {
    return async (dispatch) => {
        try {
            const response = await handleGetHotelByCity(cityId, categoryId);
            const hotelsFindByCity = response.hotelsFindByCity;
            dispatch(fetchFindHotelsByCitySuccess(hotelsFindByCity));
        } catch (error) {
            dispatch(fetchFindHotelsByCityFail());
        }
    };
};

export const fetchFindHotelsByCitySuccess = (hotelsFindByCity) => ({
    type: actionTypes.FIND_HOTEL_CITIES_SUCCESS,
    payload: hotelsFindByCity,
});

export const fetchFindHotelsByCityFail = () => ({
    type: actionTypes.FIND_HOTEL_CITIES_FAIL,
});

//[FIND_HOTEL_CATEGORY] city  search hotel by categoryId
export const fetchFindHotelsByCategory = (categoryId) => {
    return async (dispatch) => {
        try {
            const response = await handleGetHotelByCategory(categoryId);
            const hotelsFindByCategory = response.hotelsFindByCategory;
            dispatch(fetchFindHotelsByCategorySuccess(hotelsFindByCategory));
        } catch (error) {
            dispatch(fetchFindHotelsByCategoryFail());
        }
    };
};

export const fetchFindHotelsByCategorySuccess = (hotelsFindByCategory) => ({
    type: actionTypes.FIND_HOTEL_CATEGORY_SUCCESS,
    payload: hotelsFindByCategory,
});

export const fetchFindHotelsByCategoryFail = () => ({
    type: actionTypes.FIND_HOTEL_CATEGORY_FAIL,
});

//[FIND_HOTEL_COMPANY] city  search hotel by companyId
export const fetchFindHotelsByCompany = (companyId) => {
    return async (dispatch) => {
        try {
            const response = await handleGetHotelByCompany(companyId);
            const hotelsFindByCompany = response.hotelsFindByCompany;
            dispatch(fetchFindHotelsByCompanySuccess(hotelsFindByCompany));
        } catch (error) {
            dispatch(fetchFindHotelsByCompanyFail());
        }
    };
};

export const fetchFindHotelsByCompanySuccess = (hotelsFindByCompany) => ({
    type: actionTypes.FIND_HOTEL_COMPANY_SUCCESS,
    payload: hotelsFindByCompany,
});

export const fetchFindHotelsByCompanyFail = () => ({
    type: actionTypes.FIND_HOTEL_COMPANY_FAIL,
});