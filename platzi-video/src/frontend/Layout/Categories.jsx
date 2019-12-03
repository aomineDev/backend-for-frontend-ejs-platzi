import React from 'react';

const Categories = ({ children, title }) => (
  <>
    <h2 className='main__title'>{ title }</h2>
    { children }
  </>
);

export default Categories;
