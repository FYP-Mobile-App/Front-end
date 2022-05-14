import { ETH } from "../classes/token";
let Web3 = require("web3");
let web3 = new Web3(
  "wss://rinkeby.infura.io/ws/v3/44c7b38bec064fc7b4bff7a7e06bd9a5"
);

let minABI = [
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

export async function getBalance(publicKey, tokens) {
  let promises = [getBalanceETH(publicKey)];
  // Object.values(tokens)
  //   .filter((token) => token !== ETH)
  //   .forEach((token) => {
  //     promises.push(getBalanceERC20(publicKey, token));
  //   });
  return Promise.all(promises);
}

export async function getBalanceETH(publicKey) {
  let res = await web3.eth.getBalance(publicKey);
  return tokenAndBalance(ETH, web3.utils.fromWei(res));
}

export async function getBalanceERC20(publicKey, token) {
  let contract = new web3.eth.Contract(minABI, token.address);
  let res = await contract.methods.balanceOf(publicKey).call();
  return tokenAndBalance(token, web3.utils.fromWei(res));
}

function tokenAndBalance(token, balance) {
  let d = { token: token, balance: balance };
  return d;
}
