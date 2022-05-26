import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    q: '',
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  getQuery = e => {
    e.preventDefault();
    const { onSubmit } = this.props;

    onSubmit({ ...this.state });

    this.setState({ q: '' });
  };

  render() {
    const { q } = this.state;

    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.getQuery}>
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
            onChange={this.onChange}
            required
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
