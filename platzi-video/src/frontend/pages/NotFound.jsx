import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => (
  <>

    <Helmet bodyAttributes={{ style: 'background-image: linear-gradient(#21c08b, #ab88ff);' }}>
      <title>Platzi Video | Page Not Found</title>
    </Helmet>

    <section className='notFound'>
      <h1 className='notFound__title'>
        <span className='notFound__title-error'>404</span>
        <br />
        <span className='notFound__title-message'>Page Not Found</span>
      </h1>
    </section>
  </>
);

export default NotFound;
