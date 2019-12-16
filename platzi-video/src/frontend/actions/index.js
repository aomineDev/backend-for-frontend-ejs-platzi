import axios from 'axios';

export const actions = {
  setMovies: 'SET_MOVIES',
  setFavorites: 'SET_FAVORITE',
  deleteFavorite: 'DELETE_FAVORITE',
  loginRequest: 'LOGIN_REQUEST',
  logoutRequest: 'LOGOUT_REQUEST',
  setError: 'SET_ERROR',
  getVideoSource: 'GET_VIDEO_SOURCE',
  searchItem: 'SEARCH_ITEMS',
};

export const setMovies = (payload) => ({
  type: actions.setMovies,
  payload,
});

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

export const getVideoSource = (payload) => ({
  type: actions.getVideoSource,
  payload,
});

export const searchItem = (payload) => ({
  type: actions.searchItem,
  payload,
});

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data: { user } }) => {
        document.cookie = `email=${user.email}`;
        document.cookie = `name=${user.name}`;
        document.cookie = `id=${user.id}`;
        dispatch(loginRequest(user));
      })
      .catch((err) => dispatch(setError(err)));
  };
};

export const logoutUser = (redirect) => {
  return (dispatch) => {
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
    dispatch(logoutRequest());
    redirect.push('/login');
  };
};

export const registerUser = (payload) => {
  return (dispatch) => {
    axios.post('/auth/sign-up', payload)
      .then(() => dispatch(loginUser(payload)))
      .catch((err) => dispatch(setError(err)));
  };
};

export const addFavorite = (payload) => {
  return async (dispatch) => {
    try {
      const { data: userMovieId } = await axios.post('/user-movies', { movieId: payload._id });
      const data = {
        ...payload,
        userMovieId,
      };
      dispatch(setFavorite(data));
    } catch (error) {
      dispatch(setError(error));
    }
  };
};

export const removeFavorite = (payload) => {
  return (dispatch) => {
    dispatch(deleteFavorite(payload));
    axios.delete(`/user-movies/${payload}`)
      .catch((err) => dispatch(setError(err)));
  };
};
