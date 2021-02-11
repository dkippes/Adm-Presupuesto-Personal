import React, { useState} from 'react'
import axios from 'axios';

export default function Register() {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const login = () => {
    axios
      .post('http://localhost:3000/api/users/login', {
        email: emailLogin,
        password: passwordLogin,
      })
      .then((response) => {
        console.log(response);
        if (response.data.messageError) {
          setErrorMsg(response.data.messageError);
        }
      });
  };

  return (
    <div>
      <h1>Esto es el login</h1>
      <h2>{errorMsg}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => {
              setEmailLogin(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password:
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => {
              setPasswordLogin(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" onClick={login}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}