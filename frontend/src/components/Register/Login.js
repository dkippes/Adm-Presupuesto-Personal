import React, { useState} from 'react'
import axios from 'axios';
import '../Register/Register.css';
import { Link } from 'react-router-dom';

export default function Register() {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const login = () => {

    let emailCondition = !/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(emailLogin);
    let passwordCondition = passwordLogin.length < 0;

    if (emailCondition || passwordCondition) {
      setErrorMsg('* the email or password is invalid');
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/users/login',
        data: {
          email: emailLogin,
          password: passwordLogin,
        },
      }).then(({ data: info }) => {
        if (info.meta.status == 404 || info.meta.status == 400) {
          setErrorMsg(info.data.message);
        }

        if (info.meta.status == 200) {
          window.location = '/operationPanel';
        }
      });
    }

    
  };

  
  return (
    <>
      <div className="container-sm register">
        <h1 className="register-title">Login</h1>

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
            <h6 className="errorMsg-Login">{errorMsg}</h6>
            <div className="mb-3 button-register-div">
              <button
                type="submit"
                className="btn btn-primary btn-register"
                onClick={login}
              >
                Login
              </button>
            </div>
            <div className="div-path-login">
              <Link to="/">You don't have an account? Sign In!</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
    
}