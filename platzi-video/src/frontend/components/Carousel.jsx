import React from 'react';

const Carousel = ({ children }) => (
  <section className='Carousel'>
    <div className='Carousel__wrapper'>
      { children }
    </div>
  </section>
);

export default Carousel;
