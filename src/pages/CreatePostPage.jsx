const CreatePostPage = () => {
  return (
    <section class="create-section">
      <h2 class="create-post__title">Create new post</h2>
      <form id="add-post-form">
        <div class="post-container">
          <label for="post-title">Title:</label>
          <br />
          <input type="text" id="post-title" required />
        </div>
        <div class="create-post__img-block">
          <label for="post-img">Link to image (not required):</label>
          <br />
          <input type="url" id="post-img" />
        </div>
        <div class="post-container">
          <label for="post-content">Content:</label>
          <br />
          <textarea
            class="post-area"
            id="post-content"
            required
            rows="7"
          ></textarea>
        </div>
        <div class="create-post__btn-block">
          <button class="create-post__btn" type="submit">
            Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePostPage;
