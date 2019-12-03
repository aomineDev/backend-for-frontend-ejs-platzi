import React from 'react';
import { withRouter } from 'react-router-dom';

import Branch from './Branch';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, location }) => {
  const HeaderBranch = location.pathname === '/' ? Header : Branch;

  return (
    <>
      <HeaderBranch />
      {children}
      <Footer />
    </>
  );
};

export default withRouter(Layout);
