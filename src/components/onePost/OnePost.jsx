import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './OnePost.module.css';

const API_URL = import.meta.env.VITE_POSTS_API_URL;

const OnePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      navigate('/posts');
      return;
    }
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_URL}/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error loading post:', error);
      setError('Post does not exist or has been removed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <article className={`${styles.postCard} ${styles.errorCard}`}>
        <h2 style={{ color: 'red' }}>{error || 'Post not found'}</h2>
        <button onClick={() => navigate('/posts')} className={styles.backBtn}>
          ← Back to all posts
        </button>
      </article>
    );
  }
  return (
    <>
      <article className={styles.postCard}>
        <h2 className={styles.postTitle}>{post.title}</h2>
        <small className={styles.postMeta}>
          Author: {post.author} | Date:{' '}
          {new Date(post.created_at).toLocaleDateString()}
        </small>
        <hr />
        {post.img && (
          <div className={styles.postImgBlock}>
            <img
              src={post.img}
              alt={post.title}
              className={styles.postImg}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML =
                  '<p className={styles.imgError}>Image not available</p>';
              }}
            />
          </div>
        )}
        <p className={styles.postContent}>{post.content}</p>
      </article>
      <div className={styles.postActions}>
        <button onClick={() => navigate('/posts')} className={styles.backBtn}>
          ← Back to all posts
        </button>
      </div>
    </>
  );
};

export default OnePost;
