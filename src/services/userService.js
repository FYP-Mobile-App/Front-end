let phoneNumber;
let password;
let publicKey;
let encryptedKeystore;

export function getPhoneNumber() {
  return phoneNumber;
}

export function setPhoneNumber(phone) {
  phoneNumber = phone;
}

export function getPassword() {
  return password;
}

export function setPassword(pass) {
  password = pass;
}

export function getPublicKey() {
  return publicKey;
}

export function setPublicKey(publicAddress) {
  publicKey = publicAddress;
}

export function getEncryptedKeystore() {
  return encryptedKeystore;
}

export function setEncryptedKeystore(keystore) {
  encryptedKeystore = keystore;
}

export function clear() {
  phoneNumber = null;
  password = null;
  publicKey = null;
  encryptedKeystore = null;
}
