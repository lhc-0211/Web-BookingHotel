
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

import {
    handleCreateCity,
    handleGetCity,
    handleEditCity,
    handleDeleteCity,
    handleGetCityFind,


} from '../../services/siteService'

//[GET] city
export const fetchCities = (id) => {
    return async (dispatch) => {
        try {
            const response = await handleGetCity(id);
            const cities = response.cities;
            dispatch(fetchCitiesSuccess(cities));
        } catch (error) {
            dispatch(fetchCitiesFail());
        }
    };
};

export const fetchCitiesSuccess = (cities) => ({
    type: actionTypes.FETCH_CITIES_SUCCESS,
    payload: cities,
});

export const fetchCitiesFail = () => ({
    type: actionTypes.FETCH_CITIES_FAIL,
});

// [CREATE_CITY] và [EDIT_CITY]
export const createCityStart = () => ({
    type: actionTypes.CREATE_CITY_START,
});

export const createCitySuccess = (city) => ({
    type: actionTypes.CREATE_CITY_SUCCESS,
    payload: city,
});

export const createCityFail = (error) => ({
    type: actionTypes.CREATE_CITY_FAIL,
    payload: error,
});

export const editCityStart = () => ({
    type: actionTypes.EDIT_CITY_START,
});

export const editCitySuccess = (city) => ({
    type: actionTypes.EDIT_CITY_SUCCESS,
    payload: city,
});

export const editCityFail = (error) => ({
    type: actionTypes.EDIT_CITY_FAIL,
    payload: error,
});

export const deleteCityStart = () => ({
    type: actionTypes.DELETE_CITY_START,
});

export const deleteCitySuccess = (city) => ({
    type: actionTypes.DELETE_CITY_SUCCESS,
    payload: city,
});

export const deleteCityFail = (error) => ({
    type: actionTypes.DELETE_CITY_FAIL,
    payload: error,
});

export const handleCUDCity = (actionType, cityData) => async (dispatch) => {
    let startAction, successAction, failAction;

    if (actionType === 'CREATE') {
        startAction = createCityStart();
        successAction = createCitySuccess;
        failAction = createCityFail;
    } else if (actionType === 'EDIT') {
        startAction = editCityStart();
        successAction = editCitySuccess;
        failAction = editCityFail;
    } else if (actionType === 'DELETE') {
        startAction = deleteCityStart();
        successAction = deleteCitySuccess;
        failAction = deleteCityFail;
    }

    try {
        dispatch(startAction);
        let response;

        if (actionType === 'CREATE') {
            response = await handleCreateCity(cityData);
        } else if (actionType === 'EDIT') {
            response = await handleEditCity(cityData);
        } else if (actionType === 'DELETE') {
            response = await handleDeleteCity(cityData.id);
        }

        const city = response.city;
        if (response && response.errCode === 0) {
            toast.success('Cập nhật thành công');
            dispatch(successAction(city));
        }
        else toast.error(`${response.message}`)
    } catch (error) {
        toast.error('Cập nhật thất bại')
        dispatch(failAction(error.message));
    }
};

//[FIND_CITY_POSITION] city  search city by position
export const fetchFindCities = (position) => {
    return async (dispatch) => {
        try {
            const response = await handleGetCityFind(position);
            const citiesFind = response.citiesFind;
            dispatch(fetchFindCitiesSuccess(citiesFind));
        } catch (error) {
            dispatch(fetchFindCitiesFail());
        }
    };
};

export const fetchFindCitiesSuccess = (citiesFind) => ({
    type: actionTypes.FIND_POSITION_CITIES_SUCCESS,
    payload: citiesFind,
});

export const fetchFindCitiesFail = () => ({
    type: actionTypes.FIND_POSITION_CITIES_FAIL,
});
