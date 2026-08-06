import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminPanel.module.css';

const API_URL = import.meta.env.VITE_USERS_API_URL;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className={styles.adminSection}>
      <h2>User Management</h2>
      <table>
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
                  <button onClick={() => makeEditor(user.id)}>
                    Make Editor
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminPanel;
