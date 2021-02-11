import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      registrationErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    let response = await axios.post(
      `http://localhost:3000/api/users/login`,
      {
        email: this.state.email,
        password: this.state.password,
      }
    );
    console.log(response);

    if (response.status == 225) {
      this.setState({ registrationErrors: 'El usuario no existe' });
    }

    if (response.status == 250) {
      this.setState({ registrationErrors: 'Error de credenciales' });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div class="mb-3">
            <label for="email" class="form-label">
              Email:
            </label>
            <input
              class="form-control"
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">
              Password:
            </label>
            <input
              class="form-control"
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>{this.state.registrationErrors}</div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary">
              Loguearte
            </button>
          </div>
        </form>
      </div>
    );
  }
}