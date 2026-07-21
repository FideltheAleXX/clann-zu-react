import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_POSTS_API_URL;

const CreatePostPage = () => {
  const [postData, setPostData] = useState({
    title: '',
    img: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

      alert('Post published successfully!');
      setPostData({ title: '', img: '', content: '' });
      navigate('/posts');
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
  return (
    <section className={styles.createSection}>
      <h2 className="create-post__title">Create new post</h2>

      {error && (
        <div
          className="error-message"
          style={{ color: 'red', marginBottom: '15px' }}
        >
          {error}
        </div>
      )}

      <form id="add-post-form" onSubmit={handleSubmit}>
        <div className="post-container">
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
        <div className="create-post__img-block">
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
        <div className="post-container">
          <label htmlFor="post-content">Content:</label>
          <br />
          <textarea
            className="post-area"
            id="post-content"
            value={postData.content}
            onChange={handleChange}
            rows="10"
            required
            disabled={loading}
          ></textarea>
        </div>
        <div className="create-post__btn-block">
          <button className="create-post__btn" type="submit" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePostPage;
