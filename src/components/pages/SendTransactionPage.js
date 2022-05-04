import React from "react";
import { Link } from "react-router-dom";
import { sendTransactionByPhoneNumber } from "../../services/sendTransactionService";
import { getTokenByName } from "../../services/tokensService";
import {
  getEncryptedKeystore,
  getPassword,
  getPublicKey,
} from "../../services/userService";
let Web3 = require("web3");
let web3 = new Web3(
  "wss://rinkeby.infura.io/ws/v3/44c7b38bec064fc7b4bff7a7e06bd9a5"
);

export default class SendTransactionPage extends React.Component {
  keystoreJsonV3 = getEncryptedKeystore();
  password = getPassword();
  privateKey = web3.eth.accounts.decrypt(this.keystoreJsonV3, this.password)
    .privateKey;
  publicKey = getPublicKey();

  state = {
    to: "",
    amount: "",
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

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let tokenName = urlParams.get("token");
    getTokenByName(tokenName).then((token) => {
      sendTransactionByPhoneNumber(
        token,
        this.state.to,
        this.publicKey,
        this.privateKey,
        this.state.amount
      );
    });
  };

  render() {
    return (
      <div className="text-center m-5-auto">
        <h2>Send Transaction</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>To</label>
            <br />
            <input
              type="text"
              name="to"
              required
              onChange={this.handleChange}
            />
          </p>
          <p>
            <label>Amount</label>
            <br />
            <input
              type="text"
              name="amount"
              required
              onChange={this.handleChange}
            />
          </p>
          <p>
            <button id="sub_btn" type="submit">
              Send
            </button>
          </p>
        </form>
        <footer>
          <p>
            <Link to="/home">Back to Homepage</Link>
          </p>
        </footer>
      </div>
    );
  }
}
