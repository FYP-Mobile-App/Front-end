import React from "react";
import OtpInput from "react-otp-input";
import axios from "axios";
import "../../App.css";
import { getPhoneNumber } from "../../services/userService";

export default class OTPPage extends React.Component {
  state = {
    otp: ""
  };

  handleChange = (value) => {

    this.setState({
      otp: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    const phoneOtp = {
      phone: getPhoneNumber(),
      otp: this.state.otp
    };
    console.log(phoneOtp)
    axios
      .post(`http://localhost:9900/auth/phoneOtp`, phoneOtp)
      .then((res) => {
        if (res.status === 200) {
          console.log("akal")
        }
        else if (res.status === 403){
            console.log("wrongotp")}
          else if (res.status === 500) {
            console.log("akalna khara 3al t2il")
          }


        // if (res.status === 403) {
        //   window.location.replace("/login");
        // } else {
        //   window.location.replace("/otp")
        // }
      })
      .catch((res) => {
        console.log(res);
      });
  }


  render() {
    return (
      <div className="text-center m-5-auto">
        <form onSubmit={this.handleSubmit} action="/home">
          <label>OTP</label>
          <br />
          <OtpInput
            value={this.state.otp}
            onChange={this.handleChange}
            numInputs={4}
            separator={<span>-</span>}
          />
          <button id="sub_btn" type="submit">
            Send OTP
          </button>
        </form>
      </div>
    );
  }
}
