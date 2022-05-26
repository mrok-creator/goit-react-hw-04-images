import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

import s from './imageGallery.module.css';

function ImageGallery({ items, onClick }) {
  const elements = items.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        largeImage={largeImageURL}
        onClick={onClick}
      />
    );
  });

  return <ul className={s.gallery}>{elements}</ul>;
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
