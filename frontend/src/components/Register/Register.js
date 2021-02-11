import React, { useState } from 'react';
import '../Register/Register.css';
import axios from 'axios';

export default function Register() {

  const [emailReg, setEmailReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const register = () => {
    axios.post('http://localhost:3000/api/users/register', { email: emailReg, password: passwordReg })
      .then(response => {
        console.log(response);
        if(response.data.messageError) {
          setErrorMsg(response.data.messageError);
        }
      });
  }


    return (
      <div>
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
            <button type="submit" className="btn btn-primary" onClick={register}>
              Register
            </button>
          </div>
        </form>
      </div>
    );
}