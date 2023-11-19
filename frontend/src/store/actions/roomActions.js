import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

import {
    handleGeRoomByRoomType,
    handleGetRoomTypeByHotel,

} from '../../services/hotelService'

//[GET] roomtypes
export const fetchRoomType = (hotelId) => {
    return async (dispatch) => {
        try {
            const response = await handleGetRoomTypeByHotel(hotelId);
            const roomTypes = response.roomTypes;
            dispatch(fetchRoomTypeSuccess(roomTypes));
        } catch (error) {
            dispatch(fetchRoomTypeFail());
        }
    };
};

export const fetchRoomTypeSuccess = (roomTypes) => ({
    type: actionTypes.FETCH_ROOMTYPE_SUCCESS,
    payload: roomTypes,
});

export const fetchRoomTypeFail = () => ({
    type: actionTypes.FETCH_ROOMTYPE_FAIL,
});

//[GET] room
export const fetchRoom = (roomTypeId) => {
    return async (dispatch) => {
        try {
            const response = await handleGeRoomByRoomType(roomTypeId);
            const rooms = response.rooms;
            dispatch(fetchRoomSuccess(rooms));
        } catch (error) {
            dispatch(fetchRoomFail());
        }
    };
};

export const fetchRoomSuccess = (rooms) => ({
    type: actionTypes.FETCH_ROOM_SUCCESS,
    payload: rooms,
});

export const fetchRoomFail = () => ({
    type: actionTypes.FETCH_ROOM_FAIL,
});