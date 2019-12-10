import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Player from './pages/Player';
import NotFound from './pages/NotFound';

import './assets/scss/styes.scss';

const App = ({ user }) => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home}>
          {user.id ? null : <Redirect to='/login' />}
        </Route>
        <Route exact path='/login' component={Login}>
          {!user.id ? null : <Redirect to='/' />}
        </Route>
        <Route exact path='/register' component={Register}>
          {!user.id ? null : <Redirect to='/' />}
        </Route>
        <Route exact path='/player/:id' component={Player}>
          {user.id ? null : <Redirect to='/login' />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(App);
