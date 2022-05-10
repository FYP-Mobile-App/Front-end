import React from "react";
import QRCode from "react-qr-code";
import { getPhoneNumber } from "../../services/userService";

export default class QRCodePage extends React.Component {
  render() {
    return (
      <div className="qr-code">
        <QRCode
          value={
            "http://localhost:3000/send-transaction?phone=" + getPhoneNumber()
          }
        />
      </div>
    );
  }
}
