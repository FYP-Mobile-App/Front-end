import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
let Web3 = require("web3");
let web3 = new Web3(
  "wss://rinkeby.infura.io/ws/v3/44c7b38bec064fc7b4bff7a7e06bd9a5"
);

export default class SendERC20Tokens extends React.Component {
  keystoreJsonV3 = JSON.parse(localStorage.getItem("keystore"));
  password = JSON.parse(localStorage.getItem("user")).password;
  privateKey = web3.eth.accounts.decrypt(this.keystoreJsonV3, this.password)
    .privateKey;
  publicKey = JSON.parse(localStorage.getItem("publicKey"));
  receiversPublicKey;

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

    axios
      .get(`http://localhost:9900/users/address?phone=` + this.state.to)
      .then((res) => {
        this.receiversPublicKey = res.data.address;
        let contractABI = [
          {
            constant: false,
            inputs: [
              {
                name: "_to",
                type: "address",
              },
              {
                name: "_value",
                type: "uint256",
              },
            ],
            name: "transfer",
            outputs: [
              {
                name: "",
                type: "bool",
              },
            ],
            type: "function",
          },
        ];
        let tokenAddress = "0xd97e23F44c86c6Ee8D63fC2EeD985F6c8DBC6525";
        let contract = new web3.eth.Contract(contractABI, tokenAddress, {
          from: this.publicKey,
        });
        let amount = web3.utils.toHex(web3.utils.toWei(this.state.amount));
        let data = contract.methods
          .transfer(this.receiversPublicKey, amount)
          .encodeABI();
        let txObj = {
          gas: web3.utils.toHex(100000),
          to: tokenAddress,
          value: "0x00",
          data: data,
          from: this.publicKey,
        };
        web3.eth.accounts.signTransaction(
          txObj,
          this.privateKey,
          (err, signedTx) => {
            if (err) {
              //return callback(err);
            } else {
              console.log(signedTx);
              return web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                (err, res) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(res);
                  }
                }
              );
            }
          }
        );
      })
      .catch((res) => {
        console.log(res);
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
