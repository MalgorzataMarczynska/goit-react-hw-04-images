import React from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery.js';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.js';
import { Searchbar } from './searchbar/Searchbar.js';
import { fetchImagesWithQuery } from './api/FetchImages.js';
import { Modal } from './Modal/Modal.js';
import { Button } from './Button/Button.js';
import { FallingLines } from 'react-loader-spinner';

export class App extends React.Component {
  state = {
    images: [],
    searchQuery: '',
    IsLoading: false,
    error: null,
    modalIsOpen: false,
    currentImageClicked: {},
    page: 1,
  };
  input = React.createRef();

  handleRequest = async (searchQuery = 'sun', page) => {
    this.setState({ isLoading: true });
    try {
      const data = await fetchImagesWithQuery(
        searchQuery,
        (page = this.state.page)
      );
      const totalPages = Math.ceil(data.totalHits / 12);
      const images = data.hits;
      if (this.state.page > totalPages) {
        return alert('You have reached end of results or we did not find any');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const searchQuery = this.input.current.value;
    if (this.state.searchQuery === searchQuery) return;
    this.setState({ searchQuery, page: 1, images: [] });
  };
  handlePage = () => {
    const page = this.state.page + 1;
    this.setState({ page });
  };

  async componentDidMount() {
    this.handleRequest();
  }
  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.handleRequest(this.state.searchQuery, this.state.page);
    }
  }

  checkModalKey = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };
  checkModalOverlay = evt => {
    if (evt.target.hasAttribute('data-action')) {
      this.closeModal();
    }
  };

  closeModal = () => {
    document.removeEventListener('keydown', this.checkModalKey);
    document.removeEventListener('click', this.checkModalOverlay);
    this.setState({
      modalIsOpen: false,
    });
  };
  toggleModal = e => {
    if (!this.state.modalIsOpen) {
      document.addEventListener('keydown', this.checkModalKey);
      document.addEventListener('click', this.checkModalOverlay);
    } else {
      document.removeEventListener('keydown', this.checkModalKey);
      document.removeEventListener('click', this.checkModalOverlay);
    }
    e.preventDefault();
    const clickedUrl = e.currentTarget.href;
    const clickedImageAlt = e.target.alt;
    const clickedObject = { clickedUrl, clickedImageAlt };
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
      currentImageClicked: clickedObject,
    });
  };

  render() {
    const { images, isLoading, error, modalIsOpen, currentImageClicked } =
      this.state;

    return (
      <div
        ref={node => {
          this.node = node;
        }}
      >
        <Searchbar onSubmit={this.handleSubmit} input={this.input} />
        {error && <p>Sorry, something went really wrong: {error.message}</p>}
        {isLoading && (
          <FallingLines
            color="#3f51b5"
            width="100"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        )}
        {images.length > 0 && !modalIsOpen ? (
          <ImageGallery>
            <ImageGalleryItem
              images={this.state.images}
              toggleModal={this.toggleModal}
            />
            <Button nextPageLoader={this.handlePage} />
          </ImageGallery>
        ) : (
          <Modal
            images={this.state.images}
            onClose={this.toggleModal}
            currentImageClicked={currentImageClicked}
          ></Modal>
        )}
      </div>
    );
  }
}
