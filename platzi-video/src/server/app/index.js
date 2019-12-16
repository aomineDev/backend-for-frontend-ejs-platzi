/* eslint-disable consistent-return */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import Routes from '../../frontend/routes/serverRoutes';
import Layout from '../../frontend/Layout/Layout';
import reducer from '../../frontend/reducers';
import render from '../render';

require('dotenv').config();

const getMovies = async (token) => {
  try {
    const { data: { data: movies } } = await axios.get(
      `${process.env.API_URL}/api/movies`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return movies;
  } catch (error) {
    console.log(error);
  }
};

const getUserMovies = async (token, id) => {
  try {
    const { data: { data: userMovies } } = await axios({
      url: `${process.env.API_URL}/api/user-movies?userId=${id}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return userMovies;
  } catch (error) {
    console.log(error);
  }
};

const main = async (req, res, next) => {
  let initialState;
  try {
    try {
      const { id, email, name, token } = req.cookies;
      let user = {};
      let content = [];
      let myList = [];
      let trends = [];
      let originals = [];

      if (id && email && name && token) {
        // Fetch User
        const index = email.indexOf('@');
        const username = email.substr(0, index);
        user = { id, email, name, username };

        // Fetch initialState
        const response = await Promise.all([getMovies(token), getUserMovies(token, id)]);
        const movies = response[0];
        const userMovies = response[1];

        if (movies.length) {
          content = movies;
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
        }
      };

      initialState = {
        user,
        playing: null,
        content,
        results: [],
        myList,
        trends,
        originals,
      };
    } catch (error) {
      console.log(error);
    }
    const store = createStore(reducer, initialState);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={{}}
        >
          <Layout>
            {renderRoutes(Routes())}
          </Layout>
        </StaticRouter>
      </Provider>,
    );
    const preloadedState = store.getState();
    res.send(render(html, preloadedState));
  } catch (error) {
    next(error);
  }
};

export default main;
