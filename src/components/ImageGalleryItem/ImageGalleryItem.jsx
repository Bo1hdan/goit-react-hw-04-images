import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, showModal }) => {
  const { webformatURL, largeImageURL } = image;
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.image}
        src={webformatURL}
        alt=""
        onClick={() => showModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};
