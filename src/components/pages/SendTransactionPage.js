import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../nav/Navbar";
import { sendTransactionByPhoneNumber } from "../../services/sendTransactionService";
import { getTokenByName, getTokens } from "../../services/tokensService";
import swal from "sweetalert";
import {
  getEncryptedKeystore,
  getPassword,
  getPublicKey,
} from "../../services/userService";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
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
    currencies: [],
    currency: "",
    amount: "",
  };

  queryString = window.location.search;
  urlParams = new URLSearchParams(this.queryString);

  componentDidMount() {
    getTokens().then((tokens) => {
      this.setState({ currencies: Object.keys(tokens) });
      let tokenName = this.urlParams.get("token");
      if (tokenName && this.state.currencies.includes(tokenName)) {
        this.setState({ currency: tokenName });
      }
    });
    let receiversPhoneNumber = "+" + this.urlParams.get("phone");
    if (receiversPhoneNumber) {
      this.setState({ to: receiversPhoneNumber });
    }
  }

  onPhoneNumberChange = (event) => {
    this.setState({ to: event.target.value });
  };

  onSelectCurrency = (event) => {
    this.setState({ currency: event.value });
  };

  onAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    swal({
      title: "Are you sure?",
      text: `Are you sure you want to send a transaction of ${this.state.amount} ${this.state.currency} to the number ${this.state.to}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        getTokenByName(this.state.currency).then((token) => {
          sendTransactionByPhoneNumber(
            token,
            this.state.to,
            this.publicKey,
            this.privateKey,
            this.state.amount
          );
        });
      }
    });
  };

  render() {
    return (
      <div className="text-center">
        <Navbar />
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
                onChange={this.onPhoneNumberChange}
                value={this.state.to}
              />
            </p>
            <p>
              <label>Currency</label>
              <br />
              <Dropdown
                options={this.state.currencies}
                onChange={this.onSelectCurrency}
                value={this.state.currency}
                placeholder="Select a currency"
              />
            </p>
            <p>
              <label>Amount</label>
              <br />
              <input
                type="text"
                name="amount"
                required
                onChange={this.onAmountChange}
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
              <Link to="/transaction-type">
                Choose Another Transaction Currency
              </Link>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}
