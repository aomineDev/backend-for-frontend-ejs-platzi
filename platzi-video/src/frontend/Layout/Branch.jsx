import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/img/logo-platzi-video-BW2.png';

const Branch = () => (
  <header className='Header'>
    <div className='Header__wrapper'>
      <Link to='/' className='BranchTwo'>
        <img src={logo} alt='Logo Platzi video' className='BranchTwo__logo' />
      </Link>
    </div>
  </header>
);

export default Branch;
