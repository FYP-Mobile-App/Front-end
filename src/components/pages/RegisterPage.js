import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
let Web3 = require("web3");
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

export default function SignUpPage() {
  return (
    <div className="text-center m-5-auto">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form action="/home">
        <p>
          <label>Phone number</label>
          <br />
          <input type="text" name="phone_number" required />
        </p>
        <p>
          <label>Email address</label>
          <br />
          <input type="email" name="email" required />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input type="password" name="password" requiredc />
        </p>
        <p>
          <button onClick={createAccount} id="sub_btn" type="submit">
            Register
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>
        </p>
      </footer>
    </div>
  );
}

function createAccount() {
  let account = web3.eth.accounts.create();
  console.log(account);
}
