import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import logo from "../../assets/images/cadmos-logo.jpg";
import "../../App.css";
import {
  setPhoneNumber,
  setPassword,
  setPublicKey,
  setEncryptedKeystore,
} from "../../services/userService";

export default class LoginPage extends React.Component {
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

    setPhoneNumber(user.phone);
    setPassword(user.password);

    axios
      .post(`http://localhost:9900/auth/login`, user)
      .then((res) => {
        setPublicKey(res.data.user.publickey);
        setEncryptedKeystore(JSON.parse(res.data.user.privatekey));
        if (res.status === 200) {
          this.setState({ isSignedIn: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.isSignedIn) {
      return <Redirect to={{ pathname: "/home" }} />;
    }
    return (
    <header style={HeaderStyle}>
      <img className="logo" src={logo} alt="Logo" />
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
            First time? <Link to="/phone-number">Create an account</Link>
          </p>
          <p>
            <Link to="/">Back to Landing Page</Link>
          </p>
        </footer>
      </div>
      </header>
    );
  }
}

const HeaderStyle = {
  width: "100%",
  height: "100vh",
};
