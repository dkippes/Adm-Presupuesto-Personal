import React from 'react';
import '../css/register.css';
import axios from 'axios';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      registrationErrors: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault()

    let response = axios
      .post(
        `http://localhost:3000/api/users/register`,
        {
          email: this.state.email,
          password: this.state.password,
        }
      )
      console.log(response);
        
        if(response.status == 250) {
          this.setState({ registrationErrors : 'el usuario ya existe'});
        }

      /* if (res.data.meta.status == 250) {
        this.state.registrationErrors = res.data.meta.message;
      } */
  }


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
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

/* class Register extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/users')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return (
      <div>gsa</div>
    )
  }
} */

/* function Register() {
    return (
      <div>
        <form action="" method="POST" className="hola">
          <div className="mb-3">
            <label htmlFor="" className="form-label">Email:</label>
            <input type="email" className="form-control" name="email" id="" placeholder="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">Password:</label>
            <input type="password" className="form-control" placeholder="password" name="password"/>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Registrate</button>
          </div>
          
        </form>
      </div>
    );
} */
