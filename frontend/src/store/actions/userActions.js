import actionTypes from './actionTypes';

export const userLoginSuccess = (userData) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: userData
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    return {
        type: actionTypes.PROCESS_LOGOUT
    }
}



