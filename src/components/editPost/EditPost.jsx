import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './EditPost.module.css';
import SuccessModal from '../successModal/SuccessModal';

const API_URL = import.meta.env.VITE_POSTS_API_URL;

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({ title: '', img: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate('/posts');
      return;
    }
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      setLoadingPost(true);
      setError('');
      const response = await axios.get(`${API_URL}/${id}`);
      const data = response.data || {};
      setPostData({
        title: data.title || '',
        img: data.img || '',
        content: data.content || '',
      });
    } catch (err) {
      console.error('Error loading post:', err);
      setError('Post does not exist or has been removed.');
    } finally {
      setLoadingPost(false);
    }
  };

  const handleChange = (e) => {
    const { id: elId, value } = e.target;
    setPostData((prev) => ({ ...prev, [elId.replace('post-', '')]: value }));
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
      await axios.put(`${API_URL}/${id}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowModal(true);
    } catch (err) {
      console.error('Error when updating post:', err);

      if (err.response) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError('Error connection to server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate(`/posts/${id}`);
  };

  if (loadingPost) {
    return (
      <div className={styles.createSection}>
        <div className={styles.spinner}></div>
        <p>Loading post...</p>
      </div>
    );
  }

  return (
    <>
      <section className={styles.createSection}>
        <h2 className={styles.createPostTitle}>Edit post</h2>

        {error && <div className="error-message">{error}</div>}

        <form id="edit-post-form" onSubmit={handleSubmit}>
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
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </section>
      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
        title="Post Updated!"
        message="Your post has been updated successfully."
        buttonText="View Post"
      />
    </>
  );
};

export default EditPost;
