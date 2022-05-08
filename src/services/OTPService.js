import axios from "axios";

export function requestOTP(phone) {
  return axios.post(`http://localhost:9900/auth/phone`, { phone: phone });
}
