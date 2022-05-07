import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import PhoneNumberPage from "./components/pages/PhoneNumberPage";
import OTPPage from "./components/pages/OTPPage";
import RegisterPage from "./components/pages/RegisterPage";
import ForgetPasswordPage from "./components/pages/ForgetPasswordPage";
import HomePage from "./components/pages/HomePage";
import SendTransactionPage from "./components/pages/SendTransactionPage";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/phone-number" component={PhoneNumberPage} />
          <Route path="/otp" component={OTPPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/forget-password" component={ForgetPasswordPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/send-transaction" component={SendTransactionPage} />
        </Switch>
      </div>
    </Router>
  );
}
