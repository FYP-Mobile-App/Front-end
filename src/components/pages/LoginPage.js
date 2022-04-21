import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../../App.css";

export default class SignInPage extends React.Component {
  state = {
    phone: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      phone: this.state.phone,
      password: this.state.password,
    };

    axios.post(`http://localhost:9900/auth/login`, user).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log(user);
    });
  };

  render() {
    return (
      <div className="text-center m-5-auto">
        <h2>Sign in</h2>
        <form onSubmit={this.handleSubmit} action="/home">
          <p>
            <label>Phone number</label>
            <br />
            <input
              type="text"
              name="phone"
              required
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label>Password</label>
            <Link to="/forget-password">
              <label className="right-label">Forget password?</label>
            </Link>
            <br />
            <input
              type="password"
              name="password"
              required
              onChange={this.handleChange}
            />
          </p>
          <p>
            <button id="sub_btn" type="submit">
              Login
            </button>
          </p>
        </form>
        <footer>
          <p>
            First time? <Link to="/register">Create an account</Link>
          </p>
          <p>
            <Link to="/">Back to Homepage</Link>
          </p>
        </footer>
      </div>
    );
  }
}
