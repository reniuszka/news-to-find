import React from 'react';
import { useGlobalContext } from './context';

const SearchForm = () => {
  const { query, findQuery } = useGlobalContext();
  return (
    <form className='search-form' onSubmit={(e) => e.preventDefault()}>
      <h3>type and find what you need</h3>
      <input
        type='text'
        className='form-input'
        value={query}
        onChange={(e) => findQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
