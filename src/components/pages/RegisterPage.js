import React from "react";
import axios from "axios";
import "../../App.css";
import { Redirect } from "react-router";
import {
  getPhoneNumber,
  setEncryptedKeystore,
  setPassword,
  setPublicKey,
} from "../../services/userService";
import swal from "sweetalert";
import logo from "../../assets/images/cadmos-logo.jpg";
import { Link } from "react-router-dom";
let Web3 = require("web3");
let web3 = new Web3(
  "ws://3.138.116.209:8546"
);

export default class SignUpPage extends React.Component {
  state = {
    password: "",
    confirmPassword: "",
    isRegistered: false,
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

    let account = web3.eth.accounts.create();

    let encryptedKeystore = web3.eth.accounts.encrypt(
      account.privateKey,
      this.state.password
    );

    const user = {
      phone: getPhoneNumber(),
      password: this.state.password,
      publickey: account.address,
      privatekey: JSON.stringify(encryptedKeystore),
    };

    setPassword(user.password);
    setPublicKey(user.publickey);
    setEncryptedKeystore(encryptedKeystore);

    if (this.state.password === this.state.confirmPassword) {
      axios
        .post(`http://localhost:9900/auth/register`, user)
        .then((res) => {
          if (res.status === 200) {
            this.setState({ isRegistered: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      swal("Error", "Passwords don't match", "error");
    }
  };

  render() {
    if (this.state.isRegistered) {
      return <Redirect to={{ pathname: "/home" }} />;
    }
    return (
      <header style={HeaderStyle}>
        <img className="logo" src={logo} alt="Logo" />
        <div className="text-center m-5-auto">
          <form onSubmit={this.handleSubmit} action="/home">
            <p>
              <label>Password</label>
              <br />
              <input
                type="password"
                name="password"
                required
                onChange={this.handleChange}
              />
            </p>
            <p>
              <label>Confirm Password</label>
              <br />
              <input
                type="password"
                name="confirmPassword"
                required
                onChange={this.handleChange}
              />
            </p>
            <p>
              <button id="sub_btn" type="submit">
                Register
              </button>
            </p>
          </form>
          <footer>
            <p>
              <Link to="/">Back to Login Page</Link>
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
