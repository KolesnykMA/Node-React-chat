import * as authService from '../../api/authService';
import { SET_USER } from './actionTypes';

const setUserToken = id => {
    return localStorage.setItem('token', id)
}

const setUser = user => async dispatch => dispatch({
    type: SET_USER,
    user
});

const setAuthData = (user = null, token = '') => (dispatch, getRootState) => {
    setUserToken(token);
    setUser(user)(dispatch, getRootState);
};

export const login = (request) => async (dispatch, getRootState) => {
    const response = await authService.login(request);
    const { currentUser, token } = response.data;

    setAuthData(currentUser, token)(dispatch, getRootState);
}

export const register = async (request) => {
    const registerUser = await authService.register(request)
}

export const loadCurrentUser = () => async (dispatch, getRootState) => {
    const user = await authService.getUserByToken()

    if (user.data) {
        await setUser(user.data)(dispatch, getRootState);
    }
};

export const logoutCurrentUser = () => async (dispatch, getRootState) => {
    setAuthData()(dispatch, getRootState);
}