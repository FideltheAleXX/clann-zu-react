import { FaPlus, FaMinus } from 'react-icons/fa';
import { albums } from '../../data/albums.js';
import styles from './Albums.module.css';

const Albums = () => {
  return (
    <section className={styles.albums}>
      {albums.map((album) => (
        <article key={album.title} className={styles.album}>
          <h2 className={styles.albumTitle}>{album.title}</h2>
          <h4>{album.year}</h4>
          <img
            className={styles.albumCover}
            src={album.img}
            alt={`album cover of ${album.title}`}
          />
          <div className="album-tracklist">
            <p className={styles.albumTracklistTitle}>Tracklist</p>

            <ul className={styles.albumTracklistList}>
              {album.tracklist.map((item) => (
                <li key={item.id}>
                  <details>
                    <summary className={styles.trackSummary}>
                      <span className={`material-symbols-outlined ${styles.close}`}>
                        <FaPlus />
                      </span>
                      <span className={`material-symbols-outlined ${styles.open}`}>
                        <FaMinus />
                      </span>
                      {item.id} {item.track} {item.duration}
                    </summary>
                    <div className={styles.trackLyrics}>{item.lyrics}</div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Albums;
