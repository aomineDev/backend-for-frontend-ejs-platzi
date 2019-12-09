import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from '../../frontend/routes/serverRoutes';
import Layout from '../../frontend/Layout/Layout';
import reducer from '../../frontend/reducers';
// import initialState from '../../frontend/initialState';
import render from '../render';

const main = (req, res, next) => {
  let initialState;
  try {
    try {
      const { id, email, name } = req.cookies;
      // let user = {
      //   id: 0,
      //   email: '',
      //   name: '',
      // };
      // if (id && email && name) user = { id, email, name };
      initialState = {
        user: { id, email, name },
        playing: null,
        content: [],
        results: [],
        myList: [],
        trends: [],
        originals: [],
      };
    } catch (error) {
      console.log(error);
    }
    const isLogged = (initialState.user.id);
    const store = createStore(reducer, initialState);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={{}}
        >
          <Layout>
            {renderRoutes(Routes(isLogged))}
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
