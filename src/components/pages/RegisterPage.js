import React from "react";
import axios from "axios";
import "../../App.css";
import { Redirect } from "react-router";
import {
  setEncryptedKeystore,
  setPassword,
  setPhoneNumber,
  setPublicKey,
} from "../../services/userService";
let Web3 = require("web3");
let web3 = new Web3(
  "wss://rinkeby.infura.io/ws/v3/44c7b38bec064fc7b4bff7a7e06bd9a5"
);

export default class SignUpPage extends React.Component {
  state = {
    phone: "",
    password: "",
    publickey: "",
    privatekey: "",
    isRegistered: false,
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
      publickey: "",
      privatekey: "",
      isRegistered: this.state.isRegistered,
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
      phone: this.state.phone,
      password: this.state.password,
      publickey: account.address,
      privatekey: JSON.stringify(encryptedKeystore),
    };

    setPhoneNumber(user.phone);
    setPassword(user.password);
    setPublicKey(user.publickey);
    setEncryptedKeystore(encryptedKeystore);

    axios
      .post(`http://localhost:9900/auth/signup`, user)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isRegistered: true });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  render() {
    if (this.state.isRegistered) {
      return <Redirect to={{ pathname: "/home" }} />;
    }
    return (
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
            <button id="sub_btn" type="submit">
              Register
            </button>
          </p>
        </form>
      </div>
    );
  }
}
