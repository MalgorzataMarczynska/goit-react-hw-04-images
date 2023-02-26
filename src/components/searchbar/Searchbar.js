import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
export const Searchbar = ({ onSubmit, input }) => (
  <header className={css.Searchbar}>
    <form className={css.SearchForm} onSubmit={onSubmit}>
      <button type="submit" className={css.SearchForm_Button}>
        <span className={css.SearchForm_Button_Label}>Go</span>
      </button>

      <input
        className={css.SearchForm_Input}
        type="text"
        ref={input}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);
Searchbar.propTypes = {
  input: PropTypes.object,
  onSubmit: PropTypes.func,
};
