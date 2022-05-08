import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { setPhoneNumber } from "../../services/userService";
import "../../App.css";
import { requestOTP } from "../../services/OTPService";

export default class PhoneNumberPage extends React.Component {
  state = {
    phone: "",
    accountExists: false,
    formSubmitted: false,
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      phone: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    setPhoneNumber(this.state.phone);

    requestOTP(this.state.phone)
      .then((res) => {
        this.setState({ formSubmitted: true });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          alert("This phone number is already registered");
          this.setState({ accountExists: true });
        }
      });
  };

  render() {
    if (this.state.accountExists) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    if (this.state.formSubmitted) {
      return <Redirect to={{ pathname: "/otp" }} />;
    }
    return (
      <div className="text-center m-5-auto">
        <h2>Join us</h2>
        <h5>Create your personal account</h5>
        <form onSubmit={this.handleSubmit} action="/home">
          <p>
            <label>Phone number</label>
            <br />
            <input
              type="text"
              name="phone"
              required
              onChange={this.handleChange}
            />
          </p>
          <p>
            <button id="sub_btn" type="submit">
              Get OTP
            </button>
          </p>
        </form>
        <footer>
          <p>
            <Link to="/">Back to Landing Page</Link>
          </p>
        </footer>
      </div>
    );
  }
}
