import css from 'components/Modal/Modal.module.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ image, closeModal }) => {
  useEffect(() => {
    const handlePressOnESC = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handlePressOnESC);
    return () => {
      window.removeEventListener('keydown', handlePressOnESC);
    };
  }, [closeModal]);

  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal} tabIndex="0">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default Modal;
