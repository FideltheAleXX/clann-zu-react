const CreatePostPage = () => {
  return (
    <section className={styles.createSection}>
      <h2 className="create-post__title">Create new post</h2>
      <form id="add-post-form">
        <div className="post-container">
          <label for="post-title">Title:</label>
          <br />
          <input type="text" id="post-title" required />
        </div>
        <div className="create-post__img-block">
          <label for="post-img">Link to image (not required):</label>
          <br />
          <input type="url" id="post-img" />
        </div>
        <div className="post-container">
          <label for="post-content">Content:</label>
          <br />
          <textarea
            className="post-area"
            id="post-content"
            required
            rows="7"
          ></textarea>
        </div>
        <div className="create-post__btn-block">
          <button className="create-post__btn" type="submit">
            Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePostPage;
