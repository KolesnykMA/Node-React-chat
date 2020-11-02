import * as authService from '../../api/authService';
import { SET_USER } from './actionTypes';

const setUserUniqueId = id => {
    return localStorage.setItem('user_Id', id)
}

const setUser = user => async dispatch => dispatch({
    type: SET_USER,
    user
});

const setAuthData = (user = null, uniqueUserId = '') => (dispatch, getRootState) => {
    setUserUniqueId(uniqueUserId);
    setUser(user)(dispatch, getRootState);
};

export const login = (request) => async (dispatch, getRootState) => {
    const response = await authService.login(request);
    const loginUser = response.data.currentUser;
    setAuthData(loginUser, loginUser._id)(dispatch, getRootState);
}

export const register = async (request) => {
    const registerUser = await authService.register(request)
}

export const loadCurrentUser = () => async (dispatch, getRootState) => {
    const LoadedUserUniqueId = localStorage.getItem("user_Id")

    if (LoadedUserUniqueId) {
        const user = await authService.getCurrentUser(LoadedUserUniqueId)
        const loadedUser = user.data;
        setUser(loadedUser)(dispatch, getRootState);
    }
};

export const logoutCurrentUser = () => async (dispatch, getRootState) => {
    setAuthData()(dispatch, getRootState);
}