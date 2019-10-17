import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
const windowGlobal = typeof window !== "undefined" && window;

const styles = theme => ({
  
});

class QPIndex extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      if (windowGlobal) {
        window.location.replace("https://pay.papergov.com");
      }
  }

  render() {
    return null;
  }
}

export default withStyles(styles)(QPIndex);
