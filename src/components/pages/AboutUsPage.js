import React from "react";
import "../../App.css";
import Navbar from "../nav/Navbar";

export default class AboutUsPage extends React.Component {
  render() {
    return (
      <div className="text-center">
        <Navbar />
        <h3 className="home-page-subtitle">About Us</h3>
        <br />
        <br />
        <p>
          CADMOS is a FinTech with a focus on Blockchain Technology and
          Decentralised Finance (DeFi). Its mission is to rationalize the
          frontiers of Asset Management. In line with its mission statement,
          CADMOS launched a proprietary Market Making initiative on DeFi markets
          in January 2021. The launch of DeFi native Asset Management services
          is currently being worked upon.
        </p>
      </div>
    );
  }
}
