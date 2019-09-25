import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Router, Link } from "@reach/router";

class AdmDashboard extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    

    return 'dashboard'

  }
}


function mapStateToProps(state) {
    return {
      authenticated: state.oneUser.authenticated,
      loginCheckInProgress: state.oneUser.loginCheckInProgress
    };
}

export default connect(mapStateToProps)(AdmDashboard);