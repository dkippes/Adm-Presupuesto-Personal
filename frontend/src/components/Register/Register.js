import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Register/Register.css';
import axios from 'axios';
import Login from './Login';

export default function Register() {
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const register = () => {

    let emailCondition = !/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(emailReg)
    let passwordCondition = passwordReg.length < 0;

    if (emailCondition || passwordCondition) {
      setErrorMsg('* the email or password is invalid');
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/users/register',
        data: {
          email: emailReg,
          password: passwordReg,
        },
      }).then(({ data: info }) => {
        if (info.meta.status == 404) {
          setErrorMsg(info.data.message);
        }

        if (info.meta.status == 200) {
          window.location = '/login';
        }
      });
    }

    
  };

  return (
    <>
      <div className="container-sm register">
        <h1 className="register-title">Registration</h1>
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
            <h6 className="errorMsg-Login">{errorMsg}</h6>
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
              <Link to="/login">Do you have an account? Log in!</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
