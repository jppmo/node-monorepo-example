import React, { useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import styles from '../app.module.scss';

export interface ErrorResponse {
  code: string,
  message: string,
}

const SetOneTimePassword = () => {
  const [oneTimePassword, setOneTimePassword] = useState('');
  const { state } = useLocation();
  const [data, setData] = useState({});
  const [error, setError] = useState({
    code: "",
    message: "",
  } as ErrorResponse);

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
          password: oneTimePassword,
          isOTP: true,
        }),
      });
      const data = await response.json();
      if ("code" in data) {
        setError(data);
      }
      setData(data);
      setError({
        code: "",
        message: "",
      })
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
      <h2>Enter a one time password</h2>
      <form className={styles.passwordForm} onSubmit={handleSubmit}>
        <input
          className={error.message ? styles.passwordInputError: styles.passwordInput}
          type="password"
          value={oneTimePassword}
          onChange={(e) => setOneTimePassword(e.target.value)}
          required
        />
        {error.message && <label className={styles.errorLabel} htmlFor="pass-input">Error: {error.message}</label>}
        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SetOneTimePassword;
