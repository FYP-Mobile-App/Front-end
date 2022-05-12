import React from "react";
import QRCode from "react-qr-code";
import { getPhoneNumber } from "../../services/userService";
import Navbar from "../nav/Navbar";

export default class QRCodePage extends React.Component {
  render() {
    return (
      <div  className="text-center">
        <Navbar />
        <div className="qr-code">
          <QRCode
            value={
              getPhoneNumber()
            }
          />
        </div>
      </div>
    );
  }
}
