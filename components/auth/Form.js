// AuthForm.js
import React, { useState } from 'react';
import styles from '../styles/AuthForm.module.css';

const AuthForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const values={
      'email':username,
      'password':password
    }
    props.handleFunction(values);
    // Perform authentication logic here
  };

  return (
    <div className={styles['auth-form']}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          id={props.inputId}
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id={props.passwordId}
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">{props.buttonText}</button>
      </form>
    </div>
  );
};

export default AuthForm;
