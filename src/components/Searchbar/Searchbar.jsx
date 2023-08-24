// import { FaSearch } from '@react-icons/all-files/fa/FaSearch';
import { FaSearch } from 'react-icons/fa';

import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.button}>
          <FaSearch className={css.Icon} size={25} />
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          name="searchWord"
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
