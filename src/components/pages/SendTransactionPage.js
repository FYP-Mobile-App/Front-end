import React from "react";
import { Link } from "react-router-dom";
let Web3 = require("web3");
let web3 = new Web3(
  "wss://rinkeby.infura.io/ws/v3/44c7b38bec064fc7b4bff7a7e06bd9a5"
);

export default class SendTransactionPage extends React.Component {
  keystoreJsonV3 = JSON.parse(localStorage.getItem("keystore"));
  password = JSON.parse(localStorage.getItem("user")).password;
  privateKey = web3.eth.accounts.decrypt(this.keystoreJsonV3, this.password).privateKey;

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

    web3.eth.accounts
      .signTransaction(
        {
          to: this.state.to,
          value: this.state.amount,
          gas: 21000,
          chainId: 4,
        },
        this.privateKey
      )
      .then((data) => {
        web3.eth.sendSignedTransaction(data.rawTransaction);
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
