import { FaPlus, FaMinus } from 'react-icons/fa';
import { albums } from '../data/albums.js';

const AlbumsPage = () => {
  return (
    <section className="albums">
      {albums.map((album) => {
        <article className="album">
          <h2 className="album-title">{album.title}</h2> <h4>{album.year}</h4>
          <img
            className="album-cover"
            src="{album.img}"
            alt="album cover of clann zu band"
          />
          <div className="album-tracklist">
            <p className="album-tracklist__title">Tracklist</p>

            <ul className="album-tracklist__list">
              {album.tracklist.map((item) => (
                <li>
                  <details>
                    <summary className="track-summary">
                      <span className="material-symbols-outlined close">
                        <FaPlus />
                      </span>
                      <span className="material-symbols-outlined open">
                        <FaMinus />
                      </span>
                      {item.id} {item.track} {item.duration}
                    </summary>
                    <div className="track-lyrics">{item.lyrics}</div>
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
