import { Component } from 'react';

import Loader from '../../shared/components/Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'shared/components/Button';
import Modal from 'shared/components/Modal';
import { query } from '../../shared/api/pixabay';

import s from './imgFinder.module.css';

class ImgFinder extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    q: '',
    page: 1,
    totalPages: 1,
    isModalOpen: false,
    modalImg: {},
  };

  async componentDidUpdate(prevProp, prevState) {
    const { q, page, images } = this.state;

    if (q !== prevState.q || page > prevState.page) {
      this.setState({ isLoading: true });
      const { totalHits, hits } = await query(q, page);
      // const res = totalHits/10

      try {
        this.setState({
          images: [...images, ...hits],
          totalPages: totalHits / 10,
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  setImages = ({ q }) => {
    this.setState({
      q,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModal = modalImg => {
    this.setState({
      isModalOpen: true,
      modalImg,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const {
      isLoading,
      error,
      images,
      totalPages,
      page,
      modalImg,
      isModalOpen,
    } = this.state;
    const { setImages, loadMore } = this;

    return (
      <>
        <Searchbar onSubmit={setImages} />
        {images.length > 0 && (
          <ImageGallery items={images} onClick={this.showModal} />
        )}
        {isLoading && <Loader />}
        {error && <p>Something went wrong: {error}</p>}
        {totalPages > page && <Button text="Load More" onClick={loadMore} />}
        {isModalOpen && (
          <Modal close={this.closeModal}>
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
}

export default ImgFinder;
