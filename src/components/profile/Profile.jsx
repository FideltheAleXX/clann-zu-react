import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaFileAlt,
  FaComments,
  FaSignOutAlt,
} from 'react-icons/fa';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated && !user) {
    return (
      <section className={styles.profileSection}>
        <div className={styles.profileCard}>
          <div className={styles.guestContent}>
            <div className={styles.avatarPlaceholder}>
              <FaUser className={styles.avatarIcon} />
            </div>
            <h2>User profile</h2>
            <p className={styles.guestText}>
              If you want to watch your profile, please, log into your account.
            </p>
            <Link to="/login" className={styles.primaryBtn}>
              Log in
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const nickname = user?.nickname || user?.username || 'User';
  const email = user?.email || 'No email';
  const role = user?.role || 'user';
  const avatar = user?.avatar || null;
  const postsCount = user?.postsCount ?? 0;
  const commentsCount = user?.commentsCount ?? 0;
  const status = user?.status || 'Active';

  return (
    <section className={styles.profileSection}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <div className={styles.avatarWrapper}>
            {avatar ? (
              <img src={avatar} alt={nickname} className={styles.avatarImg} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <FaUser className={styles.avatarIcon} />
              </div>
            )}
            <span
              className={styles.statusIndicator}
              title={`Статус: ${status}`}
            />
          </div>

          <div className={styles.headerInfo}>
            <h2 className={styles.nickname}>{nickname}</h2>
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>{status}</span>
            </div>
          </div>
        </div>

        <div className={styles.detailsList}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <FaEnvelope className={styles.detailIcon} />
              <span>Email:</span>
            </div>
            <span className={styles.detailValue}>{email}</span>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>
              <FaUserShield className={styles.detailIcon} />
              <span>Role:</span>
            </div>
            <span
              className={`${styles.roleBadge} ${
                styles[role.toLowerCase()] || styles.roleDefault
              }`}
            >
              {role}
            </span>
          </div>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statBox}>
            <div className={styles.statIconWrapper}>
              <FaFileAlt className={styles.statIcon} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{postsCount}</span>
              <span className={styles.statLabel}>Posts</span>
            </div>
          </div>

          <div className={styles.statBox}>
            <div className={styles.statIconWrapper}>
              <FaComments className={styles.statIcon} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{commentsCount}</span>
              <span className={styles.statLabel}>Comments</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={logout} className={styles.logoutBtn}>
            <FaSignOutAlt />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
