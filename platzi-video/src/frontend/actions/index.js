import axios from 'axios';

export const actions = {
  setFavorites: 'SET_FAVORITE',
  deleteFavorite: 'DELETE_FAVORITE',
  loginRequest: 'LOGIN_REQUEST',
  logoutRequest: 'LOGOUT_REQUEST',
  setError: 'SET_ERROR',
  registerRequest: 'REGISTER_REQUEST',
  getVideoSource: 'GET_VIDEO_SOURCE',
  searchItem: 'SEARCH_ITEMS',
};

export const setFavorite = (payload) => ({
  type: actions.setFavorites,
  payload,
});

export const deleteFavorite = (payload) => ({
  type: actions.deleteFavorite,
  payload,
});

export const loginRequest = (payload) => ({
  type: actions.loginRequest,
  payload,
});

export const logoutRequest = () => ({
  type: actions.logoutRequest,
});

export const setError = (payload) => ({
  type: actions.setError,
  payload,
});

export const registerRequest = (payload) => ({
  type: actions.registerRequest,
  payload,
});

export const getVideoSource = (payload) => ({
  type: actions.getVideoSource,
  payload,
});

export const searchItem = (payload) => ({
  type: actions.searchItem,
  payload,
});

export const registerUser = (payload, redirect) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => redirect.push('/login'))
      .catch((err) => dispatch(setError(err)));
  };
};
