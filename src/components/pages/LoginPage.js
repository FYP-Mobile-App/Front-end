import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";

import "../../App.css";

export default class SignInPage extends React.Component {
  state = {
    phone: "",
    password: "",
    isSignedIn: false,
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
      isSignedIn: this.state.isSignedIn,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      phone: this.state.phone,
      password: this.state.password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    axios
      .post(`http://localhost:9900/auth/login`, user)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        // console.log(user);
        localStorage.setItem(
          "publicKey",
          JSON.stringify(res.data.user.publickey)
        );
        if (res.status === 200) {
          this.setState({ isSignedIn: true });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  render() {
    if (this.state.isSignedIn) {
      return <Redirect to={{ pathname: "/home" }} />;
    }
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
            <Link to="/">Back to Landing Page</Link>
          </p>
        </footer>
      </div>
    );
  }
}
