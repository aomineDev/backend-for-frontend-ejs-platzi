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
      if (id && email && name) {
        const index = email.indexOf('@');
        const username = email.substr(0, index);
        user = { id, email, name, username };
      };

      if (token) {
        const { data: { data } } = await axios({
          url: `${process.env.API_URL}/api/movies`,
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data) movieList = data;
      }

      initialState = {
        user,
        playing: null,
        content: movieList,
        results: [],
        myList: [],
        trends: movieList.filter((e) => e.contentRating === 'R'),
        originals: movieList.filter((e) => e.contentRating === 'G'),
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
