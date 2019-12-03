import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions';

import logo from '../assets/img/logo-platzi-video-BW2.png';
import userIcon from '../assets/img/user-icon.png';

const Header = ({ user, history, logoutRequest }) => {

  const userValidate = Object.keys(user).length > 0;

  const handleSignout = () => {
    logoutRequest();
    history.push('/login');
  };

  return (
    <header className='Header'>
      <div className='Header__wrapper'>
        <div className='Branch'>
          <img className='Branch__logo' src={logo} alt='Platzi Video' />
        </div>
        <div className='User'>
          <div className='User__profile'>
            <img src={userValidate ? gravatar(user.email) : userIcon} alt='User' className='User__profile-icon' />
            <p>Perfil</p>
          </div>
          <ul className='User__actions'>
            {!userValidate ?
              <li className='User__actions-item'><Link to='/login' className='User__actions-link'>Iniciar Sesión</Link></li> :
              (
                <>
                  <li className='User__actions-item'><Link to='/' className='User__actions-link'>{user.username}</Link></li>
                  <li className='User__actions-item'><span className='User__actions-link' role='button' tabIndex='0' onClick={handleSignout}>Cerrar Sesión</span></li>
                </>
              )}
          </ul>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
