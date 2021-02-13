import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Register/Register.css';
import axios from 'axios';
import Login from '../Login/Login';

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
          window.location = '/login';
        }
      });
  };

  return (
    <>
      <div className="container-sm register">
        <h1 className="register-title">Registration</h1>
        <h2>{errorMsg}</h2>

        <div>
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
            <div className="mb-3 button-register-div">
              <button
                type="submit"
                className="btn btn-primary btn-register"
                onClick={register}
              >
                Register
              </button>
            </div>
            <div className="div-path-login">
                <Link to="/login">Do you have an account? Sign in!</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
