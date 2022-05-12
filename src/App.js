import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import LoginPage from "./components/pages/LoginPage";
import PhoneNumberPage from "./components/pages/PhoneNumberPage";
import OTPPage from "./components/pages/OTPPage";
import RegisterPage from "./components/pages/RegisterPage";
import ForgetPasswordPage from "./components/pages/ForgetPasswordPage";
import HomePage from "./components/pages/HomePage";
import SendTransactionPage from "./components/pages/SendTransactionPage";
import TransactionTypePage from "./components/pages/TransactionTypePage";
import QRCodePage from "./components/pages/QRCodePage";
import ScanToPayPage from "./components/pages/ScanToPayPage";
import AboutUsPage from "./components/pages/AboutUsPage";
import storage from "local-storage-fallback";
import "./App.css";

const GlobalStyle = createGlobalStyle`
body{
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#111" : "#EEE"};
  color: ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};
}
`;

function getInitialTheme() {
  const savedTheme = storage.getItem("theme");
  return savedTheme ? JSON.parse(savedTheme) : { mode: "light" };
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    storage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        />
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/phone-number" component={PhoneNumberPage} />
              <Route path="/otp" component={OTPPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/forget-password" component={ForgetPasswordPage} />
              <Route path="/home" component={HomePage} />
              <Route path="/send-transaction" component={SendTransactionPage} />
              <Route path="/transaction-type" component={TransactionTypePage} />
              <Route path="/qr-code" component={QRCodePage} />
              <Route path="/scan-to-pay" component={ScanToPayPage} />
              <Route path="/about-us" component={AboutUsPage} />
            </Switch>
          </div>
        </Router>
        {/* <input type="checkbox" class="checkbox" id="checkbox" />
          <label for="checkbox" class="label" onClick={e =>
            setTheme(
              theme.mode === 'dark' 
                ? {mode:'light'}
                :{mode:'dark'}
              )
            }>
            <i class="fas fa-moon"></i>
            <i class='fas fa-sun'></i>
          <div class='ball' />
          </label> */}
      </>
    </ThemeProvider>
  );
}
