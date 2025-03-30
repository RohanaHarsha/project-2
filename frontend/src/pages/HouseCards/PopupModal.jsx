import React from 'react';
import Modal from 'react-modal';

const PopupModal = ({ isOpen, onRequestClose, imageUrl }) => {
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark overlay
      zIndex: 10000, // Z-index for overlay
      transition: 'opacity 0.3s ease', // Fade-in and fade-out for the overlay
    },
    content: {
      position: 'relative',
      maxWidth: '90%',
      maxHeight: '90%',
      margin: 'auto',
      zIndex: 10001,
      animation: `${isOpen ? 'fadeIn' : 'fadeOut'} 0.4s ease`, // Conditional animation
      opacity: 1,
      transform: 'scale(1)',
    },
  };

  const fadeIn = `
    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;

  const fadeOut = `
    @keyframes fadeOut {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0.9);
      }
    }
  `;

  return (
    <>
      <style>
        {fadeIn}
        {fadeOut}
      </style>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        style={modalStyles}
      >
        <div>
          <button onClick={onRequestClose}>Close</button>
          <img
            src={imageUrl}
            alt="Popup"
            style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: 'auto' }}
          />
        </div>
      </Modal>
    </>
  );
};

export default PopupModal;
