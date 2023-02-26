import css from './Modal.module.css';
import PropTypes from 'prop-types';
export const Modal = ({ onClose, currentImageClicked }) => {
  return (
    <>
      <div className={css.Overlay} data-action="close" onClose={onClose}>
        <div className={css.Modal}>
          <img
            className={css.ImageGalleryItem_image}
            src={currentImageClicked.clickedUrl}
            alt={currentImageClicked.clickedImageAlt}
          />
        </div>
      </div>
    </>
  );
};
Modal.propTypes = {
  onClose: PropTypes.func,
  currentImageClicked: PropTypes.object,
};
