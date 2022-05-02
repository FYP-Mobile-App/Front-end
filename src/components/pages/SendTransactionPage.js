import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getReceiversPublicKey, sendETH } from "../../services/sendTransactionService";
let Web3 = require("web3");
let web3 = new Web3(
  "wss://rinkeby.infura.io/ws/v3/44c7b38bec064fc7b4bff7a7e06bd9a5"
);

export default class SendTransactionPage extends React.Component {
  keystoreJsonV3 = JSON.parse(localStorage.getItem("keystore"));
  password = JSON.parse(localStorage.getItem("user")).password;
  privateKey = web3.eth.accounts.decrypt(this.keystoreJsonV3, this.password)
    .privateKey;
  //receiversPublicKey;

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

    // axios
    //   .get(`http://localhost:9900/users/address?phone=` + this.state.to)
    //   .then((res) => {
    //     this.receiversPublicKey = res.data.address;
    // web3.eth.accounts
    //   .signTransaction(
    //     {
    //       to: this.receiversPublicKey,
    //       value: web3.utils.toWei(this.state.amount),
    //       gas: 53000,
    //       chainId: 4,
    //     },
    //     this.privateKey
    //   )
    //   .then((data) => {
    //     web3.eth.sendSignedTransaction(data.rawTransaction);
    //     console.log(data);
    //   });
    // })
    // .catch((res) => {
    //   console.log(res);
    // });
    
    getReceiversPublicKey(this.state.to).then(receiversPublicKey => sendETH(receiversPublicKey, this.privateKey, this.state.amount).then(data => console.log(data)))
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
