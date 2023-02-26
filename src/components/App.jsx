import React, { useState, useEffect, useRef } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery.js';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.js';
import { Searchbar } from './searchbar/Searchbar.js';
import { fetchImagesWithQuery } from './api/FetchImages.js';
import { Modal } from './Modal/Modal.js';
import { Button } from './Button/Button.js';
import { FallingLines } from 'react-loader-spinner';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageClicked, setCurrentImageClicked] = useState({});
  const [searchPage, setSearchPage] = useState(1);
  const input = useRef('');

  const handleSubmit = e => {
    e.preventDefault();
    const searchInput = input.current.value;
    if (query === searchInput) return;
    setQuery(searchInput);
    setSearchPage(1);
    setImages([]);
  };
  const handlePage = () => {
    const newPage = searchPage + 1;
    setSearchPage(newPage);
  };

  useEffect(() => {
    const handleRequest = async (searchQuery = 'sun', page) => {
      setIsLoading(true);
      try {
        const data = await fetchImagesWithQuery(query, (page = searchPage));
        const totalPages = Math.ceil(data.totalHits / 12);
        const newImages = data.hits;
        if (searchPage > totalPages) {
          return alert(
            'You have reached end of results or we did not find any'
          );
        }
        setImages([...images, ...newImages]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    handleRequest();
  }, [query, searchPage]);

  const checkModalKey = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  const checkModalOverlay = evt => {
    if (evt.target.hasAttribute('data-action')) {
      closeModal();
    }
  };

  const closeModal = () => {
    document.removeEventListener('keydown', checkModalKey);
    document.removeEventListener('click', checkModalOverlay);
    setModalIsOpen(false);
  };
  const toggleModal = e => {
    if (!modalIsOpen) {
      document.addEventListener('keydown', checkModalKey);
      document.addEventListener('click', checkModalOverlay);
    } else {
      document.removeEventListener('keydown', checkModalKey);
      document.removeEventListener('click', checkModalOverlay);
    }
    e.preventDefault();
    const clickedUrl = e.currentTarget.href;
    const clickedImageAlt = e.target.alt;
    const clickedObject = { clickedUrl, clickedImageAlt };
    setModalIsOpen(!modalIsOpen);
    setCurrentImageClicked(clickedObject);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} input={input} />
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
          <ImageGalleryItem images={images} toggleModal={toggleModal} />
          <Button nextPageLoader={handlePage} />
        </ImageGallery>
      ) : (
        <Modal
          images={images}
          onClose={toggleModal}
          currentImageClicked={currentImageClicked}
        ></Modal>
      )}
    </div>
  );
};
