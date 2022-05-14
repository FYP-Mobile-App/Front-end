import axios from "axios";

export function requestOTP(phone) {
  return axios.post(`http://localhost:9900/auth/register/otp`, { phone: phone });
}

export function getOTP(phone) {
  return axios.post(`http://localhost:9900/auth/forget/otp`, { phone: phone });
}
