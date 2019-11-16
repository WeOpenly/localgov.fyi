import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import currency from "currency.js";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

import SubImg from "./SubImg";
import SubStatus from "./SubStatus";

import { watchUserSubForChanges, unsubscribeForStatus } from "./actions";
import SubDetails from "./SubDetails";

class SubStatusPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { subId, dispatch } = this.props;
    console.log("substatuspage", subId);
    dispatch(watchUserSubForChanges(subId));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(unsubscribeForStatus());
  }

  render() {
    const { loading, details } = this.props;
    let comp = <div className={styles.loading}></div>;

    if (loading) {
      return comp;
    }

    const {
      img_url,
      guess_price,
      user_price,
      created_at,
    } = details;

    console.log("QPStatus", details);


    return (
      <div className={`${styles.container} ${styles.gridLg}`}>
        <div className={`${styles.columns}`}>
          <div
            className={`${styles.column} ${styles.col12} ${styles.hideXs} ${styles.textLeft}`}
          >
            <div className={styles.columns}>
              <div className={`${styles.column} ${styles.col3}`} />
              <div className={`${styles.column} ${styles.col6}`}>
                <div>
                  <SubImg imgUrl={img_url} createdAt={created_at} />
                </div>

                <div>
                  <SubDetails guessPrice={guess_price} userPrice={user_price} />
                </div>

                <div>
                  <SubStatus />
                </div>

                <div>
                  <button
                    style={{
                      marginBottom: "3rem",
                      width: "100%",
                      fontSize: "14px"
                    }}
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} ${styles.textUppercase} ${styles.textBold}`}
                    type="submit"
                  >
                    <span
                      style={{ padding: "0 4px 0 0 ", color: "#fff" }}
                      className={`${iconStyles.typcn} ${iconStyles.typcnSupport}`}
                    ></span>
                    Contact Support
                  </button>
                </div>
              </div>
              <div className={`${styles.column} ${styles.col3}`} />
            </div>
          </div>

          <div
            className={`${styles.column} ${styles.col12} ${styles.showXs} ${styles.textCenter}`}
          >
            <div className={styles.columns}>
              <div className={`${styles.column} ${styles.col12}`}>
                <div>
                  <SubImg imgUrl={img_url} createdAt={created_at} />
                </div>

                <div>
                  <SubDetails guessPrice={guess_price} userPrice={user_price} />
                </div>

                <div>
                  <SubStatus />
                </div>

                <div>
                  <button
                    style={{
                      marginBottom: "3rem",
                      width: "100%",
                      fontSize: "14px"
                    }}
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} ${styles.textUppercase} ${styles.textBold}`}
                    type="submit"
                  >
                    <span
                      style={{ padding: "0 4px 0 0 ", color: "#fff" }}
                      className={`${iconStyles.typcn} ${iconStyles.typcnSupport}`}
                    ></span>
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.quickPayStatus
  };
};

export default connect(mapStateToProps)(SubStatusPage);
