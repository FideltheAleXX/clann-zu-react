import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Posts.module.css';

const API_URL = import.meta.env.VITE_POSTS_API_URL;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(API_URL);
      setPosts(response.data);
    } catch (error) {
      console.error('Error loading posts:', error);
      setError('Check server.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loader}></div>;
  }

  if (error) {
    return (
      <div className={styles.error} style={{ color: 'red' }}>
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div>
        <p>Posts do not exist yet. Write first post!</p>
        <Link to="/create-post">
          <button>Create First Post</button>
        </Link>
      </div>
    );
  }

  return (
    <section className={styles.postsSection}>
      {posts.map((post) => (
        <article key={post.id} className={styles.postCard}>
          <Link to={`/post/${post.id}`} className={styles.postTitle}>
            <h2>{post.title}</h2>
          </Link>
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
              />
            </div>
          )}
          <p className={styles.postContent}>{post.content}</p>
        </article>
      ))}
    </section>
  );
};

export default Posts;
