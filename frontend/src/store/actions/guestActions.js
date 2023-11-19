import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

import {
    handleCreateGuest,
    handleGetGuest,

} from '../../services/guestService'
//[GET] guests
export const fetchGuests = () => {
    return async (dispatch) => {
        try {
            const response = await handleGetGuest('ALL');
            const guests = response.guests;
            dispatch(fetchGuestsSuccess(guests));
        } catch (error) {
            dispatch(fetchGuestsFail());
        }
    };
};

export const fetchGuestsSuccess = (guests) => ({
    type: actionTypes.FETCH_GUESTS_SUCCESS,
    payload: guests,
});

export const fetchGuestsFail = () => ({
    type: actionTypes.FETCH_GUESTS_FAIL,
});
// [CREATE_GUEST]
export const createGuestStart = () => ({
    type: actionTypes.CREATE_GUEST_START,
});

export const createGuestSuccess = (guest) => ({
    type: actionTypes.CREATE_GUEST_SUCCESS,
    payload: guest,
});

export const createGuestFail = (error) => ({
    type: actionTypes.CREATE_GUEST_FAIL,
    payload: error,
});

export const handleCUDGuest = (actionType, guestData) => async (dispatch) => {
    let startAction, successAction, failAction;

    if (actionType === 'CREATE') {
        startAction = createGuestStart();
        successAction = createGuestSuccess;
        failAction = createGuestFail;
    }
    //  else if (actionType === 'EDIT') {
    //     startAction = editGuestStart();
    //     successAction = editGuestSuccess;
    //     failAction = editGuestFail;
    // } else if (actionType === 'DELETE') {
    //     startAction = deleteGuestStart();
    //     successAction = deleteGuestSuccess;
    //     failAction = deleteGuestFail;
    // }

    try {
        dispatch(startAction);
        let response;

        if (actionType === 'CREATE') {
            response = await handleCreateGuest(guestData);
        }

        const guest = response.guest;
        if (response && response.errCode === 0) {
            toast.success('Cập nhật thành công');
            dispatch(successAction(guest));
        }
        else toast.error(`${response.message}`)
    } catch (error) {
        toast.error('Cập nhật thất bại')
        dispatch(failAction(error.message));
    }
};