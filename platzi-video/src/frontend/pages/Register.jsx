import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { registerUser } from '../actions';

const Register = ({ registerUser, history }) => {
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(form, history);
  };

  return (
    <>
      <Helmet bodyAttributes={{ style: 'background-image: linear-gradient(#ab88ff, #21c08b);' }}>
        <title>Platzi Video | Register</title>
      </Helmet>

      <section className='Register'>
        <div className='Register__wrapper'>
          <h2 className='Register__title'>Register!</h2>
          <form className='Register__form' onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              className='Register__input'
              placeholder='Name'
              aria-label='Name'
              onChange={handleInput}
              required
            />
            <input
              type='email'
              name='email'
              className='Register__input'
              placeholder='Email'
              aria-label='Email'
              onChange={handleInput}
              required
            />
            <input
              type='password'
              name='password'
              className='Register__input'
              placeholder='Password'
              aria-label='Password'
              onChange={handleInput}
              required
            />
            <button type='submit' className='Register__btn'>Register!</button>
          </form>

          <p className='Register__Login'>
            ¿Ya tienes una cuenta?
            {' '}
            <Link to='/login' className='Register__Login-link'>Log In!</Link>
          </p>
        </div>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(Register);
