import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "gatsby";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

import {submitForm} from './actions';

const windowGlobal = typeof window !== "undefined" && window;

class CoronaBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        success: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev){
    const {dispatch} = this.props;
    ev.preventDefault();
    dispatch(submitForm(this.state.num));
    this.setState({
      success: true
    });
  }


  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
      const {success} = this.state;
      const {areaGuessResult} = this.props;
      let city = null;
      if (areaGuessResult && areaGuessResult.city_name){
          city = areaGuessResult.city_name
      }
    return (
      <div
        style={{
          position: "fixed",
          display: "flex",
          height: "164px",
          width: "90%",
          zIndex: "3000",
          padding: "0.5rem",
          background: "rgba(255,255,255, 0.95)",
          transition: "opacity .2s ease-in-out",
          boxShadow: "0 2px 2px rgba(0,0,0,.08),0 2px 8px rgba(0,0,0,.06)",
          left: 0,
          right: 0,
          margin: `3% auto`,
          transition: "opacity .2s ease-in-out",
          borderRadius: "0.8rem",
          bottom: 0,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className={`${styles.columns} ${styles.hideMd}`}>
          <div className={`${styles.column} ${styles.col1} `}></div>
          <div
            style={{ padding: "1rem 2rem 0 2rem" }}
            className={`${styles.column} ${styles.col6} ${styles.textLeft}`}
          >
            <h4
              style={{
                display: "flex",
                color: "#d73e48",
                alignItems: "center"
              }}
            >
             
              Coronavirus Updates {city ? `From ${city}` : null}
            </h4>
            <p style={{ padding: "0.2rem" }}>
              The World Health Organization has declared the coronavirus
              outbreak a pandemic. Get the latest alerts from your local
              government agency here.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
            className={`${styles.column} ${styles.col4} ${styles.textCenter}`}
          >
            <form onSubmit={this.handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  className={`${styles.formInput} ${styles.inputLg}`}
                  required
                  placeholder="Phone number or Email"
                  type="text"
                  name="num"
                  onChange={this.handleChange}
                />

                <button
                  className={`${styles.btn} ${styles.btnLg} ${styles.inputGroupBtn}`}
                  type="submit"
                >
                  Get alerts
                </button>
              </div>
            </form>
            {success ? (
              <small style={{ padding: "0.2rem" }}>
                You are subscribed to recieve alerts{" "}
              </small>
            ) : null}
          </div>

          <div className={`${styles.column} ${styles.col1} `}></div>
        </div>
        <div className={`${styles.columns} ${styles.showMd}`}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "column"
            }}
            className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          >
            <form onSubmit={this.handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  className={`${styles.formInput} ${styles.inputLg}`}
                  required
                  placeholder="Phone number or Email"
                  type="text"
                  name="num"
                  onChange={this.handleChange}
                />

                <button
                  className={`${styles.btn} ${styles.btnLg}  ${styles.inputGroupBtn}`}
                  type="submit"
                >
                  Get alerts
                </button>
              </div>
            </form>
            {success ? (
              <small style={{ padding: "0.2rem" }}>
                You are subscribed to recieve alerts
              </small>
            ) : null}
          </div>
          <div
            style={{ padding: "1rem 1rem 0 1rem" }}
            className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          >
            <h5
              style={{
                display: "flex",
                color: "#d73e48",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
             
              Coronavirus Updates {city ? `From ${city}` : null}
            </h5>
            <small>
              The World Health Organization has declared the coronavirus
              outbreak a pandemic. Get the latest alerts from your local
              government agency here.
            </small>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(state, ownProps) {
  return {
    ...state.dynamicSearch
  };
};

export default connect(mapStateToProps)(CoronaBanner);
