import React, { useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const login = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/login',
      data: {
        email: emailLogin,
        password: passwordLogin,
      },
    }).then(({data: info }) => {
        console.log(info);
        if (info.meta.status == 404 || info.meta.status == 400) {
          setErrorMsg(info.data.message);
        }

        if (info.meta.status == 200) {
          window.location = '/operationPanel';
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
      <a href="">
        <Link to="/">ir a register</Link>
      </a>
    </div>
  );
    
}