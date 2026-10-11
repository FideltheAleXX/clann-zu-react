import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import styles from './OnePost.module.css';
import { FaEdit } from 'react-icons/fa';
import defaultPostImg from '../../assets/no_image.jpg';

const API_URL = import.meta.env.VITE_POSTS_API_URL;

const OnePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      navigate('/posts');
      return;
    }

    const loadPost = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${API_URL}/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Post does not exist or has been removed.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, navigate]);

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
        <h2 className="error-message">{error || 'Post not found'}</h2>
        <button onClick={() => navigate('/posts')} className={styles.backBtn}>
          ← Back to all posts
        </button>
      </article>
    );
  }

  const canEdit = isAuthenticated && user && post && user.id === post.user_id;

  return (
    <>
      <article className={styles.postCard}>
        <h2 className={styles.postTitle}>{post.title}</h2>
        {canEdit && (
          <Link to={`/edit-post/${id}`}>
            <FaEdit className={styles.editIcon} size={24} />
          </Link>
        )}

        <small className={styles.postMeta}>
          Author: {post.author} | Date:{' '}
          {new Date(post.created_at).toLocaleDateString()}
        </small>
        <hr />
        {post.img && (
          <div className={styles.postImgBlock}>
            <img
              src={post.img || defaultPostImg}
              alt={post.title}
              className={styles.postImg}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = defaultPostImg;
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
