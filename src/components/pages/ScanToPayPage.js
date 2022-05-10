import React from "react";
import QrReader from "react-qr-scanner";
import { Redirect } from "react-router";

export default class ScanToPayPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleScan = this.handleScan.bind(this);
  }

  state = {
    delay: 100,
  };

  handleScan = (data) => {
    return <Redirect to={{ pathname: data }} />;
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
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
      </div>
    );
  }
}
