import styles from './Media.module.css';
import { FaStar } from 'react-icons/fa';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { media } from '../../data/media';
import { Link } from 'react-router-dom';

const Media = () => {
  return (
    <>
      <section className={styles.mediaSection}>
        {media.map((item) => {
          const Icon = item.image;
          return (
            <div key={item.id} className={styles.mediaCard}>
              <Link className={styles.mediaLink} to={item.link}>
                <div className={styles.cardHeader}>
                  <Icon size={36} /> {item.title}
                  <RiVerifiedBadgeFill style={{ color: '#44adbb' }} />
                </div>
                <div className={styles.cardStars}>
                  {Array.from({ length: 5 }).map((_, index) => {
                    return (
                      <span key={index}>
                        <FaStar style={{ color: '#e97f16' }} />
                      </span>
                    );
                  })}
                </div>
                <div className={styles.cardContent}>{item.text}</div>
              </Link>
            </div>
          );
        })}
      </section>
      <div className={styles.videos}>
        <div>
          <iframe
            width="480"
            height="315"
            src="https://www.youtube.com/embed/KzMNJo0vrOg?si=FDGLIW6f9BG5aWTI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <iframe
            width="480"
            height="315"
            src="https://www.youtube.com/embed/JokGolgLjgQ?si=mbGtpYNe1OessfJm"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Media;
