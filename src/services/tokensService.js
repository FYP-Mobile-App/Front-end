import axios from "axios";
import { Token, ETH } from "../classes/token";

let tokens = null;

export async function getTokenByName(name) {
  let tokens = await getTokens();
  return tokens[name];
}

export async function getTokens() {
  if (tokens === null) {
    let l = await fetchTokensFromServer();
    tokens = {};
    l.forEach((element) => {
      tokens[element.name] = element;
    });
    tokens["ETH"] = ETH;
  }
  return tokens;
}

async function fetchTokensFromServer() {
  let res = await axios.get(`http://localhost:9900/tokens`);
  let tokens = res.data.tokens;
  return tokens.map((token) => new Token(token.name, token.address));
}
