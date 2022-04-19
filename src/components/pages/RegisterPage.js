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
    this.setState({
      phone: event.target.value,
      password: event.target.value,
      publickey: "fyp",
      privatekey: "cadmos",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      phone: this.state.phone,
      password: this.state.password,
      publickey: this.state.publickey,
      privatekey: this.state.privatekey,
    };

    axios
      .post(`http://localhost:9900/auth/signup`, user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
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
            <button onClick={createAccount} id="sub_btn" type="submit">
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

function createAccount() {
  let account = web3.eth.accounts.create();
  console.log(account);
}
