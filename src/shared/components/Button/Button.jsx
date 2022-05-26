import PropTypes from 'prop-types';

import s from './button.module.css';

function Button({ text, onClick }) {
  return (
    <button type="button " className={s.btn} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
