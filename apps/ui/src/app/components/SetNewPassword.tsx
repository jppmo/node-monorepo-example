import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../app.module.scss';

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { state } = useLocation();
  const [data, setData] = useState({});

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/setPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: state.email,
          password: newPassword,
          isOTP: false
        }),
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      {
        JSON.stringify(data) !== "{}" && 
        <pre className={styles.outputResponse}>
          {JSON.stringify(data)}
        </pre>
      }
      
      <h2>Choose a new password</h2>
      <form className={styles.passwordForm} onSubmit={handleSubmit}>
        <input
          className={styles.passwordInput}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SetNewPassword;
