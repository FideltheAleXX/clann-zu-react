const OnePostPage = () => {
  return (
    <article id="full-post-container" class="post-card">
      <h2 id="post-title">Загрузка...</h2>
      <small id="post-meta"></small>
      <hr />
      <br />
      <div class="post__img-block">
        <img
          id="post-img"
          class="post-img"
          src=""
          alt=""
          style="display: none"
        />
      </div>
      <p id="post-content" class="post-content"></p>
    </article>
  );
};

export default OnePostPage;
