import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminPanel.module.css';
import { FaUserAlt, FaHome } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_USERS_API_URL;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('Users');

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 401) {
        alert('Please login again');
      } else if (error.response?.status === 403) {
        alert('Access denied. Admin rights required.');
      }
    }
  };

  const makeEditor = async (userId) => {
    const res = await axios.put(`/users/${userId}/role/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (res.ok) {
      alert('Editor assigned!');
      getAllUsers();
    }
  };

  const sidebarList = [
    { id: 1, icon: <FaHome />, title: 'Dashboard' },
    { id: 2, icon: <FaUserAlt />, title: 'Users' },
  ];

  return (
    <div className={styles.adminPanel}>
      <div className={styles.headerSection}>
        <div>
          <h2>AdminPanel</h2>
        </div>
        <div>Search Panel</div>
        <div>Foto</div>
      </div>
      <div className={styles.mainSection}>
        <div className={styles.sidebar}>
          {sidebarList.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.sidebarItem} ${activeTab === item.title ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(item.title)}
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
        </div>
        <div className={styles.content}>
          {activeTab === 'Dashboard' && (
            <div className={styles.sectionBlock}>
              <h2>Dashboard</h2>
              <p>Обзор и статистика панели управления.</p>
            </div>
          )}

          {activeTab === 'Users' && (
            <div className={styles.sectionBlock}>
              <h2>User Management</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        {user.role === 'user' && (
                          <button
                            type="button"
                            className={styles.actionBtn}
                            onClick={() => makeEditor(user.id)}
                          >
                            Make Editor
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
