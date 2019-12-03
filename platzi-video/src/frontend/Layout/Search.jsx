import React, { useState } from 'react';
import { connect } from 'react-redux';

import { searchItem } from '../actions';

const Search = ({ searchItem }) => {
  const [query, setQuery] = useState('');

  const handleQuery = (e) => {
    setQuery(e.target.value);
    searchItem(e.target.value);
  };

  return (
    <section className='Search'>
      <div className='Search__wrapper'>
        <h2 className='Search__title'>¿Qué quieres ver hoy?</h2>
        <input
          type='text'
          className='Search__input'
          placeholder='Buscar...'
          value={query}
          onChange={handleQuery}
        />
      </div>
      {query && (
        <p className='Search__query'>
          Resultados de
          {' '}
          <span className='Search__query-resalt'>{query}</span>
        </p>
      )}
    </section>
  );
};

const mapDispatchToProps = {
  searchItem,
};

export default connect(null, mapDispatchToProps)(Search);
