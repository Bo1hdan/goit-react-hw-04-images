import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from 'components/ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, showModal }) => {
  return (
    <ul className={css.ImgGallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} showModal={showModal} />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.string,
  showModal: PropTypes.func.isRequired,
};
