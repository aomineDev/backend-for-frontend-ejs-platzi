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

const main = async (req, res, next) => {
  let initialState;
  try {
    try {
      const { id, email, name, token } = req.cookies;
      let user = {};
      let movieList = [];
      let myList = [];
      if (id && email && name) {
        const index = email.indexOf('@');
        const username = email.substr(0, index);
        user = { id, email, name, username };
      };

      if (token) {
        try {
          const { data: { data: movies } } = await axios({
            url: `${process.env.API_URL}/api/movies`,
            method: 'get',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { data: { data: userMovies } } = await axios({
            url: `${process.env.API_URL}/api/user-movies?userId=${id}`,
            method: 'get',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (movies) movieList = movies;
          if (userMovies) myList = userMovies;
        } catch (error) {
          console.log(error);
        }
      }

      initialState = {
        user,
        playing: null,
        content: movieList,
        results: [],
        myList: myList.length === 0 ? myList : movieList.filter((e) => myList.some((item) => item.movieId === e._id)),
        trends: movieList.length === 0 ? movieList : movieList.filter((e) => e.contentRating === 'R'),
        originals: movieList.length === 0 ? movieList : movieList.filter((e) => e.contentRating === 'G'),
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
