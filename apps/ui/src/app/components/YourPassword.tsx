import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../app.module.scss';

export interface ErrorResponse {
  code: string,
  message: string,
}

const YourPassword = () => {
  const [yourPassword, setYourPassword] = useState('');
  const { state } = useLocation();
  const [data, setData] = useState({});
  const [error, setError] = useState({
    code: "",
    message: "",
  } as ErrorResponse);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: state.email,
          password: yourPassword,
        }),
      });
      const data = await response.json();
      if ("code" in data) {
        setError(data);
      }
      setData(data);
      
    } catch (error) {
      console.log(error);
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
      <h2>Enter your Password</h2>
      <form className={styles.passwordForm} onSubmit={handleSubmit}>
        <input
          name="pass-input"
          className={error.message ? styles.passwordInputError: styles.passwordInput}
          type="password"
          value={yourPassword}
          onChange={(e) => setYourPassword(e.target.value)}
          required
        />
        {error.message && <label className={styles.errorLabel} htmlFor="pass-input">Error: {error.message}</label>}
        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YourPassword;
