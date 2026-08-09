import { useEffect, useState } from 'react';
import styles from './PostForm.module.css';
import SuccessModal from '../successModal/SuccessModal';

const PostForm = ({
  initialData = { title: '', img: '', content: '' },
  initialError = '',
  title,
  formId,
  submitButtonText,
  modalTitle,
  modalMessage,
  modalButtonText,
  onSubmit,
  onModalClose,
  resetOnSuccess = false,
}) => {
  const [postData, setPostData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setPostData(initialData || { title: '', img: '', content: '' });
  }, [initialData]);

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [id.replace('post-', '')]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(postData);

      if (resetOnSuccess) {
        setPostData({ title: '', img: '', content: '' });
      }

      setShowModal(true);
    } catch (err) {
      console.error('Error submitting post form:', err);

      if (err?.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError('Error connection to server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    onModalClose?.();
  };

  return (
    <>
      <section className={styles.postSection}>
        <h2 className={styles.postFormTitle}>{title}</h2>

        {error && <div className="error-message">{error}</div>}

        <form id={formId} onSubmit={handleSubmit}>
          <div className={styles.postContainer}>
            <label htmlFor="post-title">Title:</label>
            <br />
            <input
              type="text"
              id="post-title"
              value={postData.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.postFormImgBlock}>
            <label htmlFor="post-img">Link to image (not required):</label>
            <br />
            <input
              type="url"
              id="post-img"
              value={postData.img}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
          </div>

          <div className={styles.postContainer}>
            <label htmlFor="post-content">Content:</label>
            <br />
            <textarea
              className={styles.postArea}
              id="post-content"
              value={postData.content}
              onChange={handleChange}
              rows="10"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.postFormBtnBlock}>
            <button
              className={styles.postFormBtn}
              type="submit"
              disabled={loading}
            >
              {loading
                ? `${submitButtonText.split(' ')[0]}ing...`
                : submitButtonText}
            </button>
          </div>
        </form>
      </section>

      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
        title={modalTitle}
        message={modalMessage}
        buttonText={modalButtonText}
      />
    </>
  );
};

export default PostForm;
