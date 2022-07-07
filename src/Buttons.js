import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
  const { isLoading, page, nbPages, number, handlePage, goToPage } =
    useGlobalContext();
  return (
    <section className='btn-container'>
      <div className='btn-container'>
        {/* //when I am loading my button is disabled -> check css for button:disabled */}
        <button disabled={isLoading} onClick={() => handlePage('decreasePage')}>
          previous page
        </button>
        <p>
          {page + 1} of {nbPages}
        </p>
        <button disabled={isLoading} onClick={() => handlePage('increasePage')}>
          next page
        </button>
      </div>
      <form className='btn-container' onSubmit={(e) => e.preventDefault()}>
        <p>or go directly to the page: </p>
        <input
          type='text'
          className='input'
          value={number}
          onChange={(e) => goToPage(e.target.value)}
        />
      </form>
    </section>
  );
};

export default Buttons;
