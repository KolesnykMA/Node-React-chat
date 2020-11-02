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
    authService
        .login(request)
        .then(response => {
            const user = response.data.currentUser
            const uniqueUserId = user._id

            setAuthData(user, uniqueUserId)(dispatch, getRootState);
        })
        .catch(error => {
            console.log(error)
        })
}

// export const register = request => handleAuthResponse(authService.registration(request));

export const loadCurrentUser = () => async (dispatch, getRootState) => {
    const LoadedUserUniqueId = localStorage.getItem("user_Id")

    if (LoadedUserUniqueId) {
        authService.getCurrentUser(LoadedUserUniqueId)
            .then(response => {
                const user = response.data.data
                // const uniqueUserId = user._id

                setUser(user)(dispatch, getRootState);
            })
            .catch(error => {

            })
    }
};

export const logout = () => async (dispatch, getRootState) =>  setAuthData()(dispatch, getRootState);