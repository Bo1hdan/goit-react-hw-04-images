import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { searchImages } from 'LoadImages';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    keyWord: '',
    page: 1,
    isShowModal: false,
    modalImage: '',
    totalImages: 0,
  };

  onSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.searchWord.value.trim().toLowerCase();
    if (!query.length) {
      alert('Please, write a search word');
      return;
    }
    this.setState({
      keyWord: query,
      images: [],
      page: 1,
    });

    e.target.reset();
  };

  showModal = url => {
    this.setState({ isShowModal: true });
    this.setState({ modalImage: url });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };
  handleLoadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.keyWord !== this.state.keyWord ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      searchImages(this.state.keyWord, this.state.page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Nothing found for ${this.state.keyWord}`)
          );
        })
        .then(images => {
          if (!images.hits.length) {
            alert('Nothing found');
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              totalImages: images.totalHits,
            }));
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    const { images, isLoading, isShowModal, modalImage, totalImages } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />

        {images.length > 0 && (
          <ImageGallery images={images} showModal={this.showModal} />
        )}

        {isLoading && <Loader />}

        {isShowModal && (
          <Modal image={modalImage} closeModal={this.closeModal} />
        )}

        {totalImages > images.length && !isLoading && (
          <Button onClick={this.handleLoadMoreBtn} />
        )}
      </>
    );
  }
}
