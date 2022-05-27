import { useState, memo } from 'react';
import PropTypes from 'prop-types';

import s from './searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [q, setQ] = useState('');

  const onChange = ({ target }) => {
    const { value } = target;
    setQ(value);
  };
  const getQuery = e => {
    e.preventDefault();

    onSubmit(q);

    setQ('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={getQuery}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          name="q"
          value={q}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
          required
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(Searchbar);
