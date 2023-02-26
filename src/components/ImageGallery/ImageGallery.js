import css from './ImageGallery.module.css';

export const ImageGallery = ({ children }) => (
  <ul className={css.ImageGallery}>{children}</ul>
);
