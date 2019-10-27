import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./spectre.min.module.css";
import inputStyles from "./inputfile.module.css";
import iconStyles from "./typicons.min.module.css";
import Slider from "react-slick";
import Lock from "../svgIcons/lock.js";
import CameraCapture from "./CameraCapture";

import { uploadDocumentAndCreateSubmission } from "./actions";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";


import FeatureCard from "./Landing/Feature";
import Testimony from './Landing/Testimony';

import AboutSVG from "./AboutSvgComp";
import Step3 from "./Step3";

import GoodBye from "../illus/GoodBye";
import Safety from "../illus/Safety";
import Register from "../illus/Register";

import AbbyPic from "../illus/Abby";
import JessePic from "../illus/Jesse";

import { trackQPevent } from "../common/tracking";
import FileInput from "./FileInput";

const windowGlobal = typeof window !== "undefined" && window;

const HeroIl = () => (
  <StaticQuery
    query={graphql`
      query heroIl4Query {
        heroIl: allFile(filter: { relativePath: { eq: "STEP2.png" } }) {
          edges {
            node {
              name
              childImageSharp {
                fluid(
                  traceSVG: {
                    color: "#f0d3fe"
                    turnPolicy: TURNPOLICY_MINORITY
                    blackOnWhite: true
                  }
                ) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <Img
          title={`papergov`}
          alt={`illustration of papergov`}
          style={{ width: "150px", height: "130px" }}
          fluid={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

class LandingDesktop extends React.Component {
  constructor(props) {
    super(props);

    this.onFileAdded = this.onFileAdded.bind(this)
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
    dispatch(uploadDocumentAndCreateSubmission(blob, anonUserID));
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

  onFileAdded(files) {
    const { dispatch, anonUserID } = this.props;
    console.log(files, "onfileadded")
    if (files) {
      dispatch(uploadDocumentAndCreateSubmission(files[0], anonUserID));
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
    const { createSubInProgress, uploadable } = this.props;
    let loadingComp = <div className={styles.loading}></div>;
    let snapComp = null;

    let btnLabel = "SNAP TO GET STARTED";
    if (createSubInProgress) {
      btnLabel = "Uploading ...";
    }

    if (this.state.checkingMediaDevices) {
      snapComp = loadingComp;
    }

    return (
      <div className={styles.columns}>
        <div
          className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          style={{ margin: "1rem 0" }}
        >
          <FileInput uploadable={uploadable} onFileAdded={this.onFileAdded} />
        </div>

        <div
          className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          style={{ margin: "4rem 0 1rem 0" }}
        >
          <h4>Convenience, Guaranteed.</h4>
        </div>

        <div
          className={`${styles.columns}`}
          style={{ margin: "1rem 0 1rem 0" }}
        >
          <div
            className={`${styles.column} ${styles.colSm4} ${styles.colXs12}`}
          >
            <FeatureCard
              icon={<GoodBye style={{ width: "180px" }} />}
              heading={"Simple"}
              description="One account for all services & no more sending in paper checks or creating multiple accounts for each service to pay your bills"
            />
          </div>

          <div
            className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
          >
            <FeatureCard
              icon={<Register style={{ width: "100px" }} />}
              heading={"Savings"}
              description="Say goodbye to late fees. Our automated system keeps track of your bills and handles them all for you"
            />
          </div>

          <div
            className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
          >
            <FeatureCard
              icon={<Safety style={{ width: "180px" }} />}
              heading={"Secure"}
              description="We deeply care about user privacy and data. We don’t sell your data & we use industry-standard encryption for all transactions"
            />
          </div>
        </div>

        <div
          className={`${styles.columns}`}
          style={{ margin: "1rem 0 2rem 0" }}
        >
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div className={`${styles.column} ${styles.col10}`}>
            <div
              className={`${styles.columns}`}
              style={{
                margin: "0rem 0 2rem 0"
              }}
            >
              <div className={`${styles.column} ${styles.col2}`} />
              <div className={`${styles.column}  ${styles.col8}`}>
                <div className={styles.textCenter}>
                  <h4>Love for Papergov</h4>
                </div>
              </div>
              <div className={`${styles.column} ${styles.col2}`} />
            </div>
            <div className={`${styles.columns}`}>
              <div
                className={`${styles.column} ${styles.colSm4} ${styles.colXs12}`}
              >
                <Testimony
                  picture={
                    <AbbyPic style={{ width: "72px", height: "72px" }} />
                  }
                  comment={
                    <div>
                      What's worse than the ticket itself is the time it takes
                      to pay. <b>papergov has given me that time back.</b>
                    </div>
                  }
                  userName="Abby"
                />
              </div>
              <div
                className={`${styles.column} ${styles.colSm6} ${styles.colXs12}`}
              >
                <Testimony
                  picture={
                    <JessePic style={{ width: "72px", height: "72px" }} />
                  }
                  comment={
                    <div>
                      I didn’t expect the process to be so fast- go to the
                      website, snap a picture of the ticket, click OK -{" "}
                      <b>done in 30 seconds!</b>
                    </div>
                  }
                  userName="Jesse"
                />
              </div>
            </div>
          </div>
          <div className={`${styles.column} ${styles.col1}`}></div>
        </div>

        <div
          className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "0rem 0 4rem 0"
          }}
        >
          <div>
            <small>over</small>
          </div>
          <div>
            <h2>100,000</h2>
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

export default connect(mapStateToProps)(LandingDesktop);
