import React from "react";
import OtpInput from "react-otp-input";
import axios from "axios";
import { getPhoneNumber } from "../../services/userService";
import { Redirect } from "react-router";
import "../../App.css";
import { requestOTP } from "../../services/OTPService";

export default class OTPPage extends React.Component {
  state = {
    OTP: "",
    formSubmitted: false,
  };

  haventReceived() {
    requestOTP(getPhoneNumber());
  }

  handleChange = (value) => {
    this.setState({
      OTP: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const phoneAndOTP = {
      phone: getPhoneNumber(),
      otp: this.state.OTP,
    };

    axios
      .post(`http://localhost:9900/auth/phoneAndOTP`, phoneAndOTP)
      .then((res) => {
        this.setState({ formSubmitted: true });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Wrong OTP");
        }
      });
  };

  render() {
    if (this.state.formSubmitted) {
      return <Redirect to={{ pathname: "/register" }} />;
    }
    return (
      <div className="text-center m-5-auto">
        <form onSubmit={this.handleSubmit} action="/home">
          <label>OTP</label>
          <br />
          <OtpInput
            value={this.state.OTP}
            onChange={this.handleChange}
            numInputs={4}
            separator={<span>-</span>}
          />
          <button onClick={this.haventReceived} type="button">
            Haven't received an OTP
          </button>
          <button id="sub_btn" type="submit">
            Send OTP
          </button>
        </form>
      </div>
    );
  }
}
