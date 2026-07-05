import { FaPlus, FaMinus } from 'react-icons/fa';
import { albums } from '/data/albums.js';

const AlbumsPage = () => {
  return (
    <section class="albums">
      {albums.map((album) => {
        <article class="album">
          <h2 class="album-title">{album.title}</h2> <h4>{album.year}</h4>
          <img
            class="album-cover"
            src="{album.img}"
            alt="album cover of clann zu band"
          />
          <div class="album-tracklist">
            <p class="album-tracklist__title">Tracklist</p>

            <ul class="album-tracklist__list">
              {album.tracklist.map((item) => (
                <li>
                  <details>
                    <summary class="track-summary">
                      <span class="material-symbols-outlined close">
                        <FaPlus />
                      </span>
                      <span class="material-symbols-outlined open">
                        <FaMinus />
                      </span>
                      {item.id} {item.track} {item.duration}
                    </summary>
                    <div class="track-lyrics">{item.lyrics}</div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </article>;
      })}
    </section>
  );
};

export default AlbumsPage;
