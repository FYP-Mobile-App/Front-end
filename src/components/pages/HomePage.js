import React from "react";
import { Link } from "react-router-dom";
let Web3 = require("web3");
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

export default function HomePage() {
  let publicKey = JSON.parse(localStorage.getItem("user")).user.publickey;
  return (
    <div className="text-center">
      <h1 className="main-title home-page-title">welcome to your wallet</h1>
      <br />
      <div>
        Your public key is:
        <br />
        {publicKey}
      </div>
      <button className="balance" onClick={getBalance}>
        Get Balance
      </button>
      <br />
      <Link to="/">
        <button className="primary-button">Log out</button>
      </Link>
    </div>
  );

  function getBalance() {
    let balance = web3.eth.getBalance(publicKey);
    console.log(balance);
  }
}
