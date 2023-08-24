import React, { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { searchImages } from 'LoadImages';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [keyWord, setKeyWord] = useState('');
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (keyWord && page) {
      setIsLoading(true);
      searchImages(keyWord, page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`Nothing found for ${keyWord}`));
        })
        .then(data => {
          if (!data.hits.length) {
            alert('Nothing found');
          } else {
            setImages(prevImages => [...prevImages, ...data.hits]);
            setTotalImages(data.totalHits);
          }
        })
        .catch(error => {
          console.log(errorState);
          setErrorState(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [keyWord, page, errorState]);

  const onSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.searchWord.value.trim().toLowerCase();
    if (!query.length) {
      alert('Please, write a search word');
      return;
    }

    setKeyWord(query);
    setImages([]);
    setPage(1);

    e.target.reset();
  };

  const showModal = url => {
    setIsShowModal(true);
    setModalImage(url);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const handleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} showModal={showModal} />
      )}

      {isLoading && <Loader />}

      {isShowModal && <Modal image={modalImage} closeModal={closeModal} />}

      {totalImages > images.length && !isLoading && (
        <Button onClick={handleLoadMoreBtn} />
      )}
    </>
  );
};
