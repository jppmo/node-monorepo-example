import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import styles from '../app.module.scss';

const enum ACTION {
  NewPasswordPlease,
  YourPasswordPlease,
  NewOTPPlease
}

const SetEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/validateEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      switch (data.challenge) {
        case ACTION.NewPasswordPlease:
          navigate('/new-password', { 
            state: {
              email
            }
          });  
          break;
        case ACTION.YourPasswordPlease:
          navigate('/your-password', { 
            state: {
              email
            }
          });
          break;
        case ACTION.NewOTPPlease:
          navigate('/one-time-password', { 
            state: {
              email
            }
          });
          break;  
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Enter your email</h2>
      <form className={styles.emailForm} onSubmit={handleSubmit}>
        <input
          className={styles.emailInput}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SetEmail;
