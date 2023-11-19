import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

import {
    handleBooking

} from '../../services/hotelService'


// [CREATE_] 
export const createBookingStart = () => ({
    type: actionTypes.CREATE_BOOKING_START,
});

export const createBookingSuccess = (reservation) => ({
    type: actionTypes.CREATE_BOOKING_SUCCESS,
    payload: reservation,
});

export const createBookingFail = (error) => ({
    type: actionTypes.CREATE_BOOKING_FAIL,
    payload: error,
});

export const handleCUDReservation = (actionType, data) => async (dispatch) => {
    let startAction, successAction, failAction;

    if (actionType === 'CREATE') {
        startAction = createBookingStart();
        successAction = createBookingSuccess;
        failAction = createBookingFail;
    }
    try {
        dispatch(startAction);
        let response;

        if (actionType === 'CREATE') {
            response = await handleBooking(data);
        }

        const reservation = response.reservation;
        if (response && response.errCode === 0) {
            toast.success('Cập nhật thành công');
            dispatch(successAction(reservation));
        }
        else toast.error(`${response.message}`)
    } catch (error) {
        toast.error('Cập nhật thất bại')
        dispatch(failAction(error.message));
    }
};
