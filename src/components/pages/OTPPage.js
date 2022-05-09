import React from "react";
import OtpInput from "react-otp-input";
import axios from "axios";
import { Link } from "react-router-dom";
import { getPhoneNumber } from "../../services/userService";
import { Redirect } from "react-router";
import logo from "../../assets/images/cadmos-logo.jpg";
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
      <header style={HeaderStyle}>
      <img className="logo" src={logo} alt="Logo" />
      <div className="text-center m-5-auto">
        <form onSubmit={this.handleSubmit} action="/home">
          <label>One Time Password</label>
          <br />
          <div style={{margin: "20px"}}>
          <OtpInput className="otp-style"
            value={this.state.OTP}
            onChange={this.handleChange}
            numInputs={4}
            separator={<span>  </span>}
          />
          </div>
          <button id="sub_btn" type="submit">
            Submit OTP
          </button>
        </form>
        <footer>
        <button onClick={this.haventReceived} className="otp-btn" type="button">
            Haven't received an OTP
          </button>
          <p>
            <Link to="/login">Back to Login Page</Link>
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
