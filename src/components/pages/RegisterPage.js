import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../App.css";
let Web3 = require("web3");
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

export default class SignUpPage extends React.Component {
  state = {
    phone: "",
    password: "",
    publickey: "",
    privatekey: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
      publickey: "",
      privatekey: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let account = web3.eth.accounts.create();

    let encryptedPrivateKey = web3.eth.accounts.encrypt(
      account.privateKey,
      this.state.password
    ).address;

    const user = {
      phone: this.state.phone,
      password: this.state.password,
      publickey: account.address,
      privatekey: encryptedPrivateKey,
    };

    axios
      .post(`http://localhost:9900/auth/signup`, user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(account);
        console.log(user);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  render() {
    return (
      <div className="text-center m-5-auto">
        <h2>Join us</h2>
        <h5>Create your personal account</h5>
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
              Register
            </button>
          </p>
        </form>
        <footer>
          <p>
            <Link to="/">Back to Homepage</Link>
          </p>
        </footer>
      </div>
    );
  }
}
