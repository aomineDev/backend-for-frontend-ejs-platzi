import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from './Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Player from './pages/Player';
import NotFound from './pages/NotFound';

import './assets/scss/styes.scss';

const App = ({ isLogged }) => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/'>
          {isLogged ? <Home /> : <Redirect to='/login' />}
        </Route>
        <Route exact path='/login'>
          {!isLogged ? <Login /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/register'>
          {!isLogged ? <Register /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/player/:id'>
          {isLogged ? <Player /> : <Redirect to='/login' />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
