import { SET_USER } from './actionTypes';

export default (state = {}, action) => {

  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isAuthorized: Boolean(action.user?.email),
        isLoading: false
      };
    default:
      return state;
  }
};