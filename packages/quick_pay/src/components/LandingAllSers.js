import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

import styles from "./spectre.min.module.css";
import inputStyles from "./inputfile.module.css";
import iconStyles from "./typicons.min.module.css";

import FeatureCard from "./Landing/Feature";
import Testimony from "./Landing/Testimony";

import CardLogos from "../illus/CardLogos.js";
import AbbyPic from "../illus/Abby";
import JessePic from "../illus/Jesse";

import GoodBye from "../illus/GoodBye";
import Safety from "../illus/Safety";
import Register from "../illus/Register";

import Lock from "../svgIcons/lock.js";
import CameraCapture from "./CameraCapture";
import FileInput from "./FileInput";

import { trackQPevent } from "../common/tracking";
import { uploadDocumentAndCreateSubmission } from "./actions";

const windowGlobal = typeof window !== "undefined" && window;

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this);
    this.setUserDenied = this.setUserDenied.bind(this);
    this.serMediaApiUsability = this.serMediaApiUsability.bind(this);
    this.onCameraError = this.onCameraError.bind(this);
    this.onMediaPhotoTaken = this.onMediaPhotoTaken.bind(this);

    this.state = {
      useMediaApi: true,
      userDenied: false,
      showCameraCap: false,
      checkingMediaDevices: true
    };
  }

  onMediaPhotoTaken(dataURI) {
    const { dispatch, anonUserID } = this.props;
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ia], { type: mimeString });
    // var fd = new FormData(document.forms[0]);
    // fd.append("canvasImage", blob);
    // console.log(fd);
    // if (fd) {
    dispatch(
      uploadDocumentAndCreateSubmission(blob, anonUserID, "user_media_api")
    );
    // }
  }

  setUserDenied() {
    this.setState({
      userDenied: true
    });
  }

  serMediaApiUsability(use) {
    this.setState({
      useMediaApi: use
    });
  }

  toggleCamera() {
    this.setState({
      showCameraCap: !this.state.showCameraCap
    });
  }

  componentDidMount() {
    const { anonUserID, dispatch } = this.props;
    dispatch(trackQPevent("landing_page", anonUserID, {}));
    if (windowGlobal && windowGlobal.navigator.mediaDevices === undefined) {
      this.setState({
        useMediaApi: false,
        checkingMediaDevices: false
      });
    } else if (windowGlobal.navigator.mediaDevices.getUserMedia === undefined) {
      windowGlobal.navigator.mediaDevices.getUserMedia = function(constraints) {
        // First get ahold of the legacy getUserMedia, if present
        const getUserMedia =
          windowGlobal.navigator.webkitGetUserMedia ||
          windowGlobal.navigator.mozGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          this.setState({
            useMediaApi: false,
            checkingMediaDevices: false
          });
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        this.setState({
          useMediaApi: true,
          checkingMediaDevices: false
        });
        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    } else if (windowGlobal.navigator.mediaDevices.getUserMedia !== undefined) {
      this.setState({
        useMediaApi: true,
        checkingMediaDevices: false
      });
    }
  }

  onChange(e) {
    const { dispatch, anonUserID } = this.props;

    const files = Array.from(e.target.files);

    if (files) {
      dispatch(
        uploadDocumentAndCreateSubmission(
          files[0],
          anonUserID,
          "standard_camera"
        )
      );
    }
  }

  onCameraError(err) {
    if (err && err.name && err.name === "NotAllowedError") {
      this.setState({
        userDenied: true,
        showCameraCap: false
      });
      return;
    }
    if (err) {
      this.setState({
        useMediaApi: false,
        showCameraCap: false
      });
      return;
    }
  }

  render() {
    const { createSubInProgress, name, uploadable } = this.props;
    let loadingComp = <div className={styles.loading}></div>;
    let snapComp = null;

    let btnLabel = "SNAP TO GET STARTED";

    if (createSubInProgress) {
      btnLabel = "Uploading ...";
    }

    if (this.state.checkingMediaDevices) {
      snapComp = loadingComp;
    }

    if (!this.state.checkingMediaDevices && this.state.useMediaApi) {
      snapComp = (
        <div style={{ width: "100%", padding: "24px 24px 16px 24px" }}>
          <button
            style={{
              height: "48px",
              marginTop: "16px",
              width: "100%",
              fontSize: "14px"
            }}
            className={`${styles.btn} ${styles.btnPrimary} ${styles.textUppercase} ${styles.textBold}`}
            onClick={this.toggleCamera}
          >
            {" "}
            <span
              className={`${iconStyles.typcn} ${iconStyles.typcnCameraOutline}`}
            ></span>
            {btnLabel}
          </button>
        </div>
      );
    } else {
      snapComp = (
        <div style={{ width: "100%", padding: "24px 24px 16px 24px" }}>
          <input
            onChange={this.onChange}
            className={`${inputStyles.inputfile} ${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}
            type="file"
            id="inputfile"
            accept="image/*"
            capture
          />

          <label htmlFor="inputfile">
            {" "}
            <span
              className={`${iconStyles.typcn} ${iconStyles.typcnCameraOutline}`}
            ></span>
            {btnLabel}
          </label>
        </div>
      );
    }


    

    return (
      <div className={styles.columns}>
        <div
          className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          style={{ margin: "0" }}
        >
          {snapComp}
          {this.state.showCameraCap ? (
            <CameraCapture
              cancelCamera={this.toggleCamera}
              onPhotoTaken={this.onMediaPhotoTaken}
              onCameraError={this.onCameraError}
            />
          ) : null}
        </div>
        <div
          className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <CardLogos style={{ width: "150px" }} />
        </div>
        <div
          className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          style={{
            marginTop: "0.5rem",
            marginBottom: "1rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              textAlign: "center"
            }}
          >
            <span
              style={{ padding: "0 4px 0 0 ", color: "#30ae40" }}
              className={`${iconStyles.typcn} ${iconStyles.typcnLockClosedOutline}`}
            ></span>
            <span style={{ fontSize: "14px" }}>
              Your data, and transactions are always safe & secure
            </span>
          </div>
        </div>
        <div
          className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          style={{ margin: "2rem 0 0rem 0" }}
        >
          <h4>Convenience, Guaranteed.</h4>
        </div>

        <div
          className={`${styles.columns}`}
          style={{ margin: "0rem 0 1rem 0" }}
        >
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div className={`${styles.column} ${styles.col10}`}>
            <div
              className={`${styles.columns}`}
              style={{ margin: "0rem 0 1rem 0" }}
            >
              <div
                className={`${styles.column} ${styles.colSm4} ${styles.colXs12}`}
              >
                <FeatureCard
                  icon={<GoodBye />}
                  heading={"Simple"}
                  description="One account for all services & no more sending in paper checks or creating multiple accounts for each service to pay your bills"
                />
              </div>

              <div
                className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
              >
                <FeatureCard
                  icon={<Register />}
                  heading={"Savings"}
                  description="Say goodbye to late fees. Our automated system keeps track of your bills and handles them all for you"
                />
              </div>

              <div
                className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
              >
                <FeatureCard
                  icon={<Safety />}
                  heading={"Secure"}
                  description="We deeply care about user privacy and data. We don’t sell your data & we use industry-standard encryption for all transactions"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          style={{ margin: "0rem 0 1rem 0" }}
        >
          <h5 className={` ${styles.textCenter}`}>😍 Users Love papergov</h5>
        </div>
        <div className={`${styles.columns}`} style={{ margin: "0rem 0.5rem" }}>
          <div
            className={`${styles.column} ${styles.colSm4} ${styles.colXs12}`}
          >
            <Testimony
              picture={<AbbyPic style={{ width: "72px", height: "72px" }} />}
              comment={
                <div>
                  What's worse than the ticket itself is the time it takes to
                  pay. <b>papergov has given me that time back.</b>
                </div>
              }
              userName="Abby"
            />
          </div>
          <div
            className={`${styles.column} ${styles.colSm6} ${styles.colXs12}`}
          >
            <Testimony
              picture={<JessePic style={{ width: "72px", height: "72px" }} />}
              comment={
                <div>
                  I didn’t expect the process to be so fast- go to the website,
                  snap a picture of the ticket, click OK -{" "}
                  <b>done in 30 seconds!</b>
                </div>
              }
              userName="Jesse"
            />
          </div>
        </div>
        <div
          className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          style={{
            margin: "0.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <div>
            <small>over</small>
          </div>
          <div>
            <h3>100,000</h3>
          </div>
          <div>
            <p>
              accessed government services via papergov in the last 6 months
            </p>
          </div>
        </div>
        <div
          className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          style={{
            marginTop: "1rem"
          }}
        >
          <div className={styles.divider} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.quickPay
  };
};

export default connect(mapStateToProps)(Landing);
