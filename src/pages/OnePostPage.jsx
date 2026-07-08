const OnePostPage = () => {
  return (
    <article id="full-post-container" className="post-card">
      <h2 id="post-title">Загрузка...</h2>
      <small id="post-meta"></small>
      <hr />
      <br />
      <div className="post__img-block">
        <img
          id="post-img"
          className="post-img"
          src=""
          alt=""
          style="display: none"
        />
      </div>
      <p id="post-content" className="post-content"></p>
    </article>
  );
};

export default OnePostPage;
