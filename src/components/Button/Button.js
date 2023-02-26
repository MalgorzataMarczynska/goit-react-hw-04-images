import css from './Button.module.css';
import PropTypes from 'prop-types';
export const Button = ({ nextPageLoader }) => (
  <div>
    <button type="button" className={css.loadButton} onClick={nextPageLoader}>
      Load more
    </button>
  </div>
);
Button.propTypes = {
  images: PropTypes.func,
};
