import PropTypes from 'prop-types';

import s from './imageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, tags, onClick, largeImage }) {
  return (
    <li className={s.item} onClick={() => onClick({ largeImage, tags })}>
      <img src={webformatURL} alt={tags} className={s.image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,

  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
