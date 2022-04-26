import React, { useState } from "react";
import { Link } from "react-router-dom";
let Web3 = require("web3");
let web3 = new Web3(
  "wss://rinkeby.infura.io/ws/v3/44c7b38bec064fc7b4bff7a7e06bd9a5"
);

export default function HomePage() {
  let publicKey = JSON.parse(localStorage.getItem("publicKey"));
  const [show, setShow] = useState(false);
  let Balance = "";
  web3.eth.getBalance(publicKey).then((balance) => (Balance = balance));
  return (
    <div className="text-center">
      <h1 className="main-title home-page-title">welcome to your wallet</h1>
      <br />
      <div>
        Your public key is:
        <br />
        {publicKey}
      </div>
      <div>
        <button className="button" onClick={getBalance}>
          Get Balance
        </button>
        {/* {show ? <div>{Balance}</div> : null} */}
      </div>
      <div>{Balance}</div>
      <div>
        <Link to="/send-transaction">
          <button className="button">Send Transaction</button>
        </Link>
      </div>
      <Link to="/">
        <button className="primary-button" onClickCapture={logout}>
          Log out
        </button>
      </Link>
    </div>
  );

  function getBalance() {
    setShow(true);
    console.log(Balance);
  }

  function logout() {
    localStorage.removeItem("user");
  }
}
