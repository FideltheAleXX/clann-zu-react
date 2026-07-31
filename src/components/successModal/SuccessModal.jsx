// components/SuccessModal.jsx
import { useEffect, useRef } from 'react';
import styles from './SuccessModal.module.css';
import { FaCheck } from 'react-icons/fa';

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
    <dialog ref={dialogRef} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.successIcon}>
          <FaCheck size={36} />
        </div>
        <h2>{title || 'Successfully!'}</h2>
        <p>{message || 'Welcome to ...'}</p>
        <button onClick={handleClose} className={styles.modalBtn}>
          {buttonText || 'OK'}
        </button>
      </div>
    </dialog>
  );
};

export default SuccessModal;
