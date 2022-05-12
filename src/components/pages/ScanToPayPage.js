import React from "react";
import QrReader from "react-qr-scanner";
import Navbar from "../nav/Navbar";
import {withRouter} from 'react-router-dom';

export default class ScanToPayPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleScan = this.handleScan.bind(this);
  }

  state = {
    // delay: 100,
  };

  handleScan = (data) => {
    if (data != null){
      var link = "/send-transaction?phone=" + data.text
      this.props.history.push(link);
    }
  };

  handleError(err) {
    console.error(err);
  }

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <div  className="text-center">
        <Navbar />
        <QrReader
          // delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          className="qr-code"
        />
      </div>
    );
  }
}
