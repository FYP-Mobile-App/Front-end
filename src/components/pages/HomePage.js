import React from "react";
import { Link } from "react-router-dom";
import { getAllTokens, getBalance } from "../../services/balanceService";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: JSON.parse(localStorage.getItem("publicKey")),
      balances: [],
      tokens: [],
    };
  }

  async componentDidMount() {
    let tokens = await getAllTokens();
    let balances = await getBalance(this.state.publicKey, tokens);
    this.setState({ tokens: tokens, balances: balances });
  }

  render() {
    return (
      <div className="text-center">
        <h1 className="main-title home-page-title">welcome to your wallet</h1>
        <br />
        <div>
          Your public key:
          <br />
          {this.state.publicKey}
        </div>
        <br />
        <div>
          Your balance:
          {this.state.balances.map((balance) => (
            <div key={balance.token.name}>
              {balance.token.name}: {balance.balance}
            </div>
          ))}
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

  logout() {
    localStorage.removeItem("user");
  }
}
