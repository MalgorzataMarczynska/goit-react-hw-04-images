import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, toggleModal }) => {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <li key={id} className={css.ImageGalleryItem}>
          <a href={largeImageURL} onClick={toggleModal}>
            <img
              className={css.ImageGalleryItem_image}
              src={webformatURL}
              alt={id}
            />
          </a>
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
};
