import React, { useState } from 'react';
import Nav from '../NavBar/NavBar';
import '../Register/Register.css';
import axios from 'axios';

export default function Register() {
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const register = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/register',
      data: {
        email: emailReg,
        password: passwordReg,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.messageError) {
          setErrorMsg(response.data.messageError);
        }
        if (response.data.messageOK) {
          sessionStorage.setItem('userLogged', emailReg);
          window.location = '/dashboard';
        }
      });
  };

  if (sessionStorage.getItem('userLogged')) {
    window.location = '/dashboard';
  } else {
    return (
      <div>
        <Nav></Nav>
        <h1>Esto es el register</h1>
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
                setEmailReg(e.target.value);
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
                setPasswordReg(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={register}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}
