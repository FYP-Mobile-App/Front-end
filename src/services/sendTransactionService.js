import axios from "axios";
import { ETH } from "../classes/token";
import swal from "sweetalert";
let Web3 = require("web3");
let web3 = new Web3(
  "ws://3.138.116.209:8546"
);

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

export async function sendTransactionByPhoneNumber(
  token,
  receiversPhoneNumber,
  sendersPublicKey,
  sendersPrivateKey,
  amount
) {
  let receiversPublicKey = await getReceiversPublicKey(receiversPhoneNumber);
  let receipt = await sendTransaction(
    token,
    receiversPublicKey,
    sendersPublicKey,
    sendersPrivateKey,
    amount
  );
  return receipt;
}

export async function sendTransaction(
  token,
  receiversPublicKey,
  sendersPublicKey,
  sendersPrivateKey,
  amount
) {
  let receipt;
  if (token === ETH) {
    receipt = await sendETH(receiversPublicKey, sendersPrivateKey, amount);
  } else {
    receipt = await sendERC20Tokens(
      receiversPublicKey,
      sendersPublicKey,
      sendersPrivateKey,
      amount,
      token.address
    );
  }
  return receipt;
}

export async function sendETH(receiversPublicKey, sendersPrivateKey, amount) {
  let signedTransaction = await web3.eth.accounts.signTransaction(
    {
      to: receiversPublicKey,
      value: web3.utils.toWei(amount),
      gas: 53000,
      chainId: 4,
    },
    sendersPrivateKey
  );
  return web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction,
    (err, res) => {
      if (err) {
        swal("Error", "Transaction failed", "error");
      } else {
        swal("Success!", "Transaction successful!", "success").then(() => {
          window.location.replace("/home");
        });
      }
    }
  );
}

export async function sendERC20Tokens(
  receiversPublicKey,
  sendersPublicKey,
  sendersPrivateKey,
  amountToSend,
  tokenAddress
) {
  let contract = new web3.eth.Contract(contractABI, tokenAddress, {
    from: sendersPublicKey,
  });
  let amount = web3.utils.toHex(web3.utils.toWei(amountToSend));
  let data = contract.methods.transfer(receiversPublicKey, amount).encodeABI();
  let txObj = {
    gas: web3.utils.toHex(100000),
    to: tokenAddress,
    value: "0x00",
    data: data,
    from: sendersPublicKey,
  };
  let signedTransaction = await web3.eth.accounts.signTransaction(
    txObj,
    sendersPrivateKey
  );
  return web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction,
    (err, res) => {
      if (err) {
        swal("Error", "Transaction failed", "error");
      } else {
        swal("Success!", "Transaction successful!", "success").then(() => {
          window.location.replace("/home");
        });
      }
    }
  );
}

export async function getReceiversPublicKey(phoneNumber) {
  let res = await axios.get(
    `http://localhost:9900/users/address?phone=` +
      encodeURIComponent(phoneNumber)
  );
  let receiversPublicKey = res.data.address;
  return receiversPublicKey;
}
