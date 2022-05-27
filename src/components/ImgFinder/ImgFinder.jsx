import { useState, useEffect, useCallback } from 'react';

import Loader from '../../shared/components/Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';
import { fetch } from '../../shared/api/pixabay';

import s from './imgFinder.module.css';

function ImgFinder() {
  const [state, setState] = useState({
    images: [],
    isLoading: false,
    error: null,
  });

  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const [modal, setModal] = useState({
    isOpen: false,
    modalImg: {},
  });

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) {
        return;
      }
      setState({ ...state, isLoading: true, error: null });

      const { totalHits, hits } = await fetch(query, page);
      try {
        setState(prevState => ({
          ...prevState,
          isLoading: false,
          images: [...prevState.images, ...hits],
        }));
        setPagination({ ...pagination, totalPages: totalHits / 10 });
      } catch (error) {
        setState({ ...state, isLoading: false, error: error.message });
      }
    };
    fetchImages();
  }, [query, pagination.page]);

  const setImages = useCallback(
    q => {
      setQuery(q);
      setPagination({ ...pagination, page: 1 });
      setState({
        ...state,
        images: [],
      });
    },
    [setQuery, setPagination, setState]
  );

  const loadMore = useCallback(() => {
    setPagination(prevPagination => ({
      ...prevPagination,
      page: prevPagination.page + 1,
    }));
  }, [setPagination]);

  const showModal = useCallback(
    modalImg => {
      setModal({
        isOpen: true,
        modalImg,
      });
    },
    [setModal]
  );

  const closeModal = useCallback(() => {
    setModal({
      isOpen: false,
    });
  }, [setModal]);

  const { images, isLoading, error } = state;
  const { isOpen, modalImg } = modal;
  const { page, totalPages } = pagination;

  return (
    <>
      <Searchbar onSubmit={setImages} />
      {images.length > 0 && <ImageGallery items={images} onClick={showModal} />}
      {isLoading && <Loader />}
      {error && <p>Something went wrong: {error}</p>}
      {!error && !isLoading && !images.length && (
        <p>Nothing to see hear(( ... Try find image </p>
      )}
      {totalPages > page && <Button text="Load More" onClick={loadMore} />}
      {isOpen && (
        <Modal close={closeModal}>
          <img
            src={modalImg.largeImage}
            alt={modalImg.tags}
            className={s.image}
          />
        </Modal>
      )}
    </>
  );
}

export default ImgFinder;
