import React from "react";
import { Link } from "react-router-dom";
let Web3 = require("web3");
let web3 = new Web3(
  "wss://rinkeby.infura.io/ws/v3/44c7b38bec064fc7b4bff7a7e06bd9a5"
);

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: JSON.parse(localStorage.getItem("publicKey")),
      balance: "",
      ERC20balance: "",
    };
  }

  minABI = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      type: "function",
    },
  ];

  tokenAddress = "0xd97e23F44c86c6Ee8D63fC2EeD985F6c8DBC6525";

  contract = new web3.eth.Contract(this.minABI, this.tokenAddress);

  render() {
    return (
      <div className="text-center">
        <h1 className="main-title home-page-title">welcome to your wallet</h1>
        <br />
        <div>
          Your public key is:
          <br />
          {this.state.publicKey}
        </div>
        <div>
          <button className="button" onClick={this.getBalance.bind(this)}>
            Get ETH Balance
          </button>
          {this.state.balance}
        </div>
        <div>
          <button className="button" onClick={this.getBalanceERC20.bind(this)}>
            Get ERC-20 Tokens Balance
          </button>
          {this.state.ERC20balance}
        </div>
        <div>
          <Link to="/send-transaction">
            <button className="button">Send ETH</button>
          </Link>
        </div>
        <div>
          <Link to="/send-erc20-tokens">
            <button className="button">Send ERC-20 Tokens</button>
          </Link>
        </div>
        <Link to="/">
          <button
            className="primary-button"
            onClickCapture={this.logout.bind(this)}
          >
            Log out
          </button>
        </Link>
      </div>
    );
  }

  getBalance() {
    web3.eth.getBalance(this.state.publicKey).then((balance) => {
      this.setState({ balance: web3.utils.fromWei(balance) });
    });
  }

  getBalanceERC20() {
    this.contract.methods
      .balanceOf(this.state.publicKey)
      .call()
      .then((balance) =>
        this.setState({ ERC20balance: web3.utils.fromWei(balance) })
      );
  }

  logout() {
    localStorage.removeItem("user");
  }
}
