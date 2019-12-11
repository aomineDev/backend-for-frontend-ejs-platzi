/* eslint-disable no-case-declarations */
import { actions } from '../actions';

const reducer = (state, action) => {
  let index;
  let username;
  let newUser;

  switch (action.type) {
    case actions.setMovies:
      const { myMovies } = action.payload;
      const { movies } = action.payload;
      if (!movies) return state;
      return {
        ...state,
        content: movies,
        myList: myMovies.length === 0 ? myMovies : movies.filter((e) => myMovies.some((item) => item.movieId === e._id)),
        trends: movies.length === 0 ? movies : movies.filter((e) => e.contentRating === 'R'),
        originals: movies.length === 0 ? movies : movies.filter((e) => e.contentRating === 'G'),
      };
    case actions.setFavorites:
      const item = state.myList.some((item) => item.id === action.payload.id);
      if (item) return state;

      return {
        ...state,
        myList: [...state.myList, action.payload],
      };
    case actions.deleteFavorite:
      const newMyList = state.myList.filter((item) => item.id !== action.payload);
      return {
        ...state,
        myList: newMyList,
      };
    case actions.loginRequest:
      index = action.payload.email.indexOf('@');
      username = action.payload.email.substr(0, index);
      newUser = {
        ...action.payload,
        username,
      };

      return {
        ...state,
        user: newUser,
      };
    case actions.logoutRequest:
      return {
        ...state,
        user: {},
        content: [],
        results: [],
        myList: [],
      };
    case actions.getVideoSource:
      return {
        ...state,
        playing: state.content.find((item) => item.id === action.payload) || {},
      };
    case actions.searchItem:
      const results = action.payload !== '' ? state.content.filter((item) => item.title.toLowerCase().includes(action.payload.toLowerCase())) : [];
      return {
        ...state,
        results,
      };
    default:
      return state;
  }
};

export default reducer;
