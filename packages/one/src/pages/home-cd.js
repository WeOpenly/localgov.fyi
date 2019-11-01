import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import styles from "../components/spectre.min.module.css";

import { ReactTypeformEmbed } from "react-typeform-embed";


class HomeOwnerCD extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { authInProgress } = this.props.oneUser;
    const { fetching } = this.props.oneService;

    if (authInProgress || fetching) {
      return <div className={styles.loading}></div>;
    }

    return (
      <Fragment>
        <Helmet>
          <title>{`Papergov One`}</title>
        </Helmet>
        <div className={styles.columns} style={{ marginTop: "1rem" }}>
          <div className={`${styles.column} ${styles.col2}`} />
          <div className={`${styles.column} ${styles.col8}`}>
            <ReactTypeformEmbed url="https://papergov.typeform.com/to/E8Y4ei" />
            
          </div>
          <div className={`${styles.column} ${styles.col2}`} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    oneService: state.oneServices,
    oneUser: state.oneUser
  };
};

export default connect(mapStateToProps)(HomeOwnerCD);
