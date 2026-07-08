// components/SuccessModal.jsx
import { useEffect, useRef } from 'react';
import styles from './SuccessModal.module.css';

const SuccessModal = ({ isOpen, onClose, title, message, buttonText }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-content">
        <div className="success-icon">
          <span className="material-symbols-outlined">check</span>
        </div>
        <h2>{title || 'Successfully!'}</h2>
        <p>{message || 'Welcome to ...'}</p>
        <button onClick={handleClose} className="modal-btn">
          {buttonText || 'OK'}
        </button>
      </div>
    </dialog>
  );
};

export default SuccessModal;
