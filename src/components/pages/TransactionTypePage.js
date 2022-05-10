import React from "react";
import { Link } from "react-router-dom";
import { getBalance } from "../../services/balanceService";
import { getTokens } from "../../services/tokensService";
import { getPublicKey } from "../../services/userService";
import Navbar from "../nav/Navbar";

export default class TransactionTypePage extends React.Component {
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
        <Navbar />
        <div className="container2">
          {this.state.balances.map((balance) => (
            <Link
              to={"/send-transaction?token=" + balance.token.name}
              key={balance.token.name}
            >
              <div className="round-btn2 caption2">
                {balance.token.name} transaction
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
