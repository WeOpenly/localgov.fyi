import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Router, Link } from "@reach/router";
import Private from "../../components/Private";
import styles from "../../components/spectre.min.module.css";

import { checkLogin } from "../../components/login/actions";

import DashBoardIndex from "../../components/DashBoardIndex";

class OneDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { location, loginCheckInProgress } = this.props;

    dispatch(checkLogin());
  }

  render() {
    const { location, loginCheckInProgress } = this.props;
    let noOnLoginPage = location.pathname !== `/`;

    if (loginCheckInProgress) {
      return (
        <div className={styles.columns} style={{ marginTop: "1rem" }}>
          <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
          <div
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: "1rem"
            }}
            className={`${styles.column} ${styles.col10} ${styles.colXs12}`}
          >
            <div className={styles.loading} />
          </div>

          <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
        </div>
      );
    }

    return (
      <Router>
        <Private path="/dashboard/*" component={DashBoardIndex} />
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.oneUser.authenticated,
    loginCheckInProgress: state.oneUser.loginCheckInProgress
  };
}

export default connect(mapStateToProps)(OneDashboard);
