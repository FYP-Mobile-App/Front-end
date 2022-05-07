import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import "../../App.css";

export default class PhoneNumberPage extends React.Component {
  state = { phone: "", formSubmitted: false };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      phone: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const phone = {
      phone: this.state.phone,
    };

    axios
      .post(`http://localhost:9900/auth/phoneInUsersTable`, phone)
      .then((res) => {
        if (res.status === 200) {
          window.location.replace("/login");
        } else {
          axios
            .post(`http://localhost:9900/auth/phoneInOTPTable`, phone)
            .then((res) => {
              if (res.status === 200) {
                console.log(res.data);
              } else {
                console.log(res.data);
              }
            })
            .catch((res) => {
              console.log(res);
            });
        }
      })
      .catch((res) => {
        console.log(res);
      });
    //this.setState({ formSubmitted: true });
  };

  render() {
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
