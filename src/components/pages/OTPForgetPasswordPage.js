import React from "react";
import OtpInput from "react-otp-input";
import axios from "axios";
import { Link } from "react-router-dom";
import { getPhoneNumber } from "../../services/userService";
import { Redirect } from "react-router";
import logo from "../../assets/images/cadmos-logo.jpg";
import "../../App.css";
import { getOTP } from "../../services/OTPService";
import swal from "sweetalert";

export default class OTPForgetPasswordPage extends React.Component {
  state = {
    OTP: "",
    formSubmitted: false,
  };

  haventReceived() {
    getOTP(getPhoneNumber());
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
      .post(`http://localhost:9900/auth/forget/submitotp`, phoneAndOTP)
      .then((res) => {
        this.setState({ formSubmitted: true });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          swal("Error", "Wrong OTP", "error");
        }
      });
  };

  render() {
    if (this.state.formSubmitted) {
      return <Redirect to={{ pathname: "/reset-password" }} />;
    }
    return (
      <header style={HeaderStyle}>
        <img className="logo" src={logo} alt="Logo" />
        <div className="text-center m-5-auto">
          <form onSubmit={this.handleSubmit} action="/home">
            <label>One Time Password</label>
            <br />
            <div style={{ margin: "20px" }}>
              <OtpInput
                className="otp-style"
                value={this.state.OTP}
                onChange={this.handleChange}
                numInputs={4}
                separator={<span> </span>}
              />
            </div>
            <button id="sub_btn" type="submit">
              Submit OTP
            </button>
          </form>
          <footer>
            <button
              onClick={this.haventReceived}
              className="otp-btn"
              type="button"
            >
              OTP not received?
            </button>
            <p>
              <Link to="/">Back to Login Page</Link>
            </p>
          </footer>
        </div>
      </header>
    );
  }
}

const HeaderStyle = {
  width: "100%",
  height: "100vh",
};
