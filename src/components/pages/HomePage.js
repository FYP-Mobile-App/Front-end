import React from "react";
import { Link } from "react-router-dom";
import { getBalance } from "../../services/balanceService";
import { getTokens } from "../../services/tokensService";
import { getPublicKey } from "../../services/userService";
import phonetransaction from '../../assets/images/phone-transaction.png';
import scanqr from '../../assets/images/scan-qr-code.png';
import qr from '../../assets/images/qr-code.png';
import Navbar from "../nav/Navbar";

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
        <Navbar />
        <h1 className="home-page-title">welcome to your wallet</h1>
        <br/>
        <div className="container">
        <div className="round-btn">
          <Link className="icon" to="/transaction-type">
            <img src={phonetransaction} />
          </Link>
          <span class="small">Pay By PhoneNumber</span>
          
        </div>
        <div className="round-btn">
          <Link className="icon" to="/transaction-type">
              <img src={scanqr} />
            </Link>
            <span class="caption">Scan to Pay</span>
        </div>
        <div className="round-btn">
          <Link className="icon" to="/transaction-type">
              <img src={qr} />
          </Link>
          <span class="caption">Display QR Code</span>
        </div>
        </div>
        <br />
        <br/>
        <br/>
        <div>
        <h3 className="home-page-subtitle">Your public key:</h3>
          <br />
          {this.state.publicKey}
        </div>
        <br />
        <div>
        <h3 className="home-page-subtitle">Your balance:</h3>
          
          {this.state.balances.map((balance) => (
            <Link
              to={"/send-transaction?token=" + balance.token.name}
              key={balance.token.name}
            >
              <div className="balance">
                  <strong>{balance.token.name}</strong>: {balance.balance}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
