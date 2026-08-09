import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostForm from '../postForm/PostForm';

const API_URL = import.meta.env.VITE_POSTS_API_URL;

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (postData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please, log in.');
    }

    await axios.post(API_URL, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <PostForm
      initialData={{ title: '', img: '', content: '' }}
      title="Create new post"
      formId="add-post-form"
      submitButtonText="Publish Post"
      modalTitle="Post Published!"
      modalMessage="Your post has been published successfully."
      modalButtonText="View Posts"
      onSubmit={handleSubmit}
      onModalClose={() => navigate('/posts')}
      resetOnSuccess
    />
  );
};

export default CreatePost;
