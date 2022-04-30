export class Token {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
}

export let ETH = new Token("ETH", null);
