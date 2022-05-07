import React from "react";
import OtpInput from "react-otp-input";
import "../../App.css";

export default class OTPPage extends React.Component {
  state = { otp: "" };

  handleChange = (otp) => this.setState({ otp });

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
