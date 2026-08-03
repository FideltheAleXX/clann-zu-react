import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePost.module.css';
import SuccessModal from '../successModal/SuccessModal';

const API_URL = import.meta.env.VITE_POSTS_API_URL;

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: '',
    img: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

    const token = localStorage.getItem('token');

    if (!token) {
      setError('Please, log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_URL, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPostData({ title: '', img: '', content: '' });
      setShowModal(true);
    } catch (error) {
      console.error('Error when creating post:', error);

      if (error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError('Error connection to server.');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    navigate('/posts');
  };

  return (
    <>
    <section className={styles.createSection}>
      <h2 className={styles.createPostTitle}>Create new post</h2>

      {error && <div className="error-message">{error}</div>}

      <form id="add-post-form" onSubmit={handleSubmit}>
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
        <div className={styles.createPostImgBlock}>
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
          ></textarea>
        </div>
        <div className={styles.createPostBtnBlock}>
          <button
            className={styles.createPostBtn}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </section>
    <SuccessModal
      isOpen={showModal}
      onClose={handleModalClose}
      title="Post Published!"
      message="Your post has been published successfully."
      buttonText="View Posts"
    />
    </>
  );
};

export default CreatePost;
