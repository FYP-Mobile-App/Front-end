import React from "react";
import { Link } from "react-router-dom";
import { getBalance } from "../../services/balanceService";
import { getTokens } from "../../services/tokensService";
import { clear, getPublicKey } from "../../services/userService";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: getPublicKey(),
      balances: [],
      tokens: [],
    };
  }

  async componentDidMount() {
    let tokens = await getTokens();
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
            <Link
              to={"/send-transaction?token=" + balance.token.name}
              key={balance.token.name}
            >
              <div>
                <button>
                  {balance.token.name}: {balance.balance}
                </button>
              </div>
            </Link>
          ))}
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
    clear();
  }
}
