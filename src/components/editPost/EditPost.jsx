import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import PostForm from '../postForm/PostForm';
import styles from './EditPost.module.css';

const API_URL = import.meta.env.VITE_POSTS_API_URL;

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [postData, setPostData] = useState({ title: '', img: '', content: '' });
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [ownerId, setOwnerId] = useState(null);

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
      setLoadError('');
      const response = await axios.get(`${API_URL}/${id}`);
      const data = response.data || {};

      setPostData({
        title: data.title || '',
        img: data.img || '',
        content: data.content || '',
      });
      setOwnerId(data.user_id || null);
    } catch (err) {
      console.error('Error loading post:', err);
      setLoadError('Post does not exist or has been removed.');
    } finally {
      setLoadingPost(false);
    }
  };

  const handleSubmit = async (postData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please, log in.');
    }

    await axios.patch(`${API_URL}/${id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  if (loadingPost) {
    return (
      <div className={styles.editSection}>
        <div className="spinner"></div>
        <p>Loading post...</p>
      </div>
    );
  }

  useEffect(() => {
    if (!loadingPost) {
      // If loaded and current user is not the owner, redirect
      if (user && ownerId && user.id !== ownerId) {
        navigate('/posts');
      }
    }
  }, [loadingPost, user, ownerId]);

  return (
    <PostForm
      initialData={postData}
      initialError={loadError}
      title="Edit post"
      formId="edit-post-form"
      submitButtonText="Save Changes"
      modalTitle="Post Updated!"
      modalMessage="Your post has been updated successfully."
      modalButtonText="View Post"
      onSubmit={handleSubmit}
      onModalClose={() => navigate(`/posts/${id}`)}
    />
  );
};

export default EditPost;
