/* eslint-disable no-case-declarations */
import { actions } from '../actions';

const reducer = (state, action) => {
  let index;
  let username;
  let newUser;
  let content;
  let myList;
  let trends;
  let originals;

  switch (action.type) {
    case actions.setMovies:
      const { userMovies, movies } = action.payload;

      if (!movies.length) return state;
      content = movies;
      myList = [];
      if (userMovies.length) {
        myList = movies.filter(({ _id }) => userMovies.some(({ movieId }) => (movieId === _id)));
        myList = myList.map((movie) => {
          let userMovieId = null;
          userMovies.forEach(({ movieId, _id }) => {
            if (movie._id === movieId) userMovieId = _id;
          });

          return { ...movie, userMovieId };
        });
        content = movies.map((movie) => {
          let inMyList = false;
          userMovies.forEach(({ movieId }) => {
            if (movie._id === movieId) inMyList = true;
          });

          return { ...movie, inMyList };
        });
      }
      trends = content.filter((e) => e.contentRating === 'R');
      originals = content.filter((e) => e.contentRating === 'G');
      return {
        ...state,
        content,
        myList,
        trends,
        originals,
      };
    case actions.setFavorites:
      const item = state.myList.some(({ _id }) => _id === action.payload._id);
      if (item) return state;
      content = state.content;
      index = content.findIndex(({ _id }) => _id === action.payload._id);
      content[index].inMyList = true;
      trends = content.filter((e) => e.contentRating === 'R');
      originals = content.filter((e) => e.contentRating === 'G');

      return {
        ...state,
        content,
        myList: [
          ...state.myList,
          action.payload,
        ],
        trends,
        originals,
      };
    case actions.deleteFavorite:
      let movieId;
      const newMyList = state.myList.filter((item) => {
        if (item.userMovieId === action.payload) {
          movieId = item._id;
          return false;
        }
        return true;
      });
      content = state.content;
      index = content.findIndex(({ _id }) => _id === movieId);
      content[index].inMyList = false;
      trends = content.filter((e) => e.contentRating === 'R');
      originals = content.filter((e) => e.contentRating === 'G');

      return {
        ...state,
        content,
        myList: newMyList,
        trends,
        originals,
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
    case actions.setError:
      console.log(payload);
      return state;
    default:
      return state;
  }
};

export default reducer;
