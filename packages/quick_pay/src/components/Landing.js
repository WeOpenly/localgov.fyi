import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import inputStyles from './inputfile.module.css';
import iconStyles from './typicons.min.module.css';
import Slider from "react-slick";
import Lock from '../svgIcons/lock.js';
import CameraCapture from './CameraCapture';

import {uploadDocumentAndCreateSubmission} from './actions'
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";
import AboutSVG from './AboutSvgComp'
import Step3 from './Step3'
import CardLogos from '../illus/CardLogos.js';
import AbbyPic from '../illus/Abby';
import JessePic from '../illus/Jesse';

import { trackQPevent} from '../common/tracking';

const windowGlobal = typeof window !== 'undefined' && window

const HeroIl = () => (
    <StaticQuery
        query={graphql`query heroIl3Query {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "STEP2.png" } }
          ) {
            edges {
              node {
                name
                childImageSharp {
                  fluid (
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

}`}
        render={data => {
            return (<Img
                title={`evergov`}
                alt={`illustration of evergov`}
                style={{ width: '150px', height: '110px' }}

                fluid={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)

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
            checkingMediaDevices: true,
        }
    }

    onMediaPhotoTaken(dataURI){
        const { dispatch, anonUserID } = this.props;
            // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

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
        dispatch(uploadDocumentAndCreateSubmission(blob, anonUserID))
        // }
    }

    setUserDenied(){
        this.setState({
            userDenied: true,
        })
    }

    serMediaApiUsability(use){
        this.setState({
            useMediaApi: use
        })
    }

    toggleCamera(){
        this.setState({
            showCameraCap: !this.state.showCameraCap,
        })
    }


    componentDidMount(){
        const { anonUserID, dispatch} = this.props;
        dispatch(trackQPevent('landing_page', anonUserID, {}))
        if (windowGlobal && windowGlobal.navigator.mediaDevices === undefined) {
           this.setState({
               useMediaApi: false,
               checkingMediaDevices: false,
           })
        } else if (windowGlobal.navigator.mediaDevices.getUserMedia === undefined) {
                windowGlobal.navigator.mediaDevices.getUserMedia = function (constraints) {

                    // First get ahold of the legacy getUserMedia, if present
                    const getUserMedia = windowGlobal.navigator.webkitGetUserMedia || windowGlobal.navigator.mozGetUserMedia;

                    // Some browsers just don't implement it - return a rejected promise with an error
                    // to keep a consistent interface
                    if (!getUserMedia) {
                        this.setState({
                            useMediaApi: false,
                            checkingMediaDevices: false
                        })
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }
                    
                    this.setState({
                        useMediaApi: true,
                        checkingMediaDevices: false
                    })
                    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                    return new Promise(function (resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }

        } else if (windowGlobal.navigator.mediaDevices.getUserMedia !== undefined){
            this.setState({
                useMediaApi: true,
                checkingMediaDevices: false
            })
        }
        
        
    }

    onChange(e){
        const { dispatch, anonUserID} = this.props;

        const files = Array.from(e.target.files)

        if (files){
            dispatch(uploadDocumentAndCreateSubmission(files[0], anonUserID))
        }
       
    }

    onCameraError(err){
        if (err && err.name && err.name === 'NotAllowedError') {
            this.setState({
                userDenied: true,
                showCameraCap: false,
            })
            return
        }
        if (err){
            this.setState({
                useMediaApi: false,
                showCameraCap: false,
            })
            return
        }
    }

    render() {
        const {createSubInProgress} = this.props;
        let loadingComp = <div className={styles.loading}></div>
        let snapComp = null;    

        let btnLabel = 'SNAP TO GET STARTED'
        if(createSubInProgress){
            btnLabel = 'Uploading ...'
        }

        if (this.state.checkingMediaDevices) {
            snapComp = loadingComp
        }

        if (!this.state.checkingMediaDevices && this.state.useMediaApi) {
            snapComp = (<div style={{ width: '100%',  padding: '24px' }}>
                
                <button style={{ height:'48px', marginTop: '16px', width: '100%', fontSize: '14px' }} className={`${styles.btn} ${styles.btnPrimary} ${styles.textUppercase} ${styles.textBold}`} onClick={this.toggleCamera}> <span className={`${iconStyles.typcn} ${iconStyles.typcnCameraOutline}`}></span>{btnLabel}</button>

            </div>)
        } else {
            snapComp = (<div style={{ width: '100%',  padding: '24px', }}>

                <input onChange={this.onChange} className={`${inputStyles.inputfile} ${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`} type="file" id="inputfile" accept="image/*" capture />

                <label htmlFor="inputfile"> <span className={`${iconStyles.typcn} ${iconStyles.typcnCameraOutline}`}></span>{btnLabel}</label>
            </div>)
        }


        return (
          <div className={styles.columns}>
            <div
              className={`${styles.column} ${styles.textCenter} ${styles.col12}`}
              style={{ margin: "1.5rem 0 0 0 " }}
            >
              <h2 style={{ color: "#5627ff" }}>evergov </h2>
              <small
                className={`${styles.textUppercase} ${styles.textGray}`}
                style={{ letterSpacing: "0.1rem", fontWeight: "bold" }}
              >
                Quick Pay
              </small>
            </div>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ margin: "0.5rem 0 1rem 0" }}
            >
              <h4
                style={{ margin: "8px 0" }}
                className={`${styles.textCenter}`}
              >
                {" "}
                ⚡Lightning fast service payments
              </h4>
            </div>
            <div
              className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
              style={{ margin: "1rem 0 0 0 " }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <AboutSVG />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <p>Snap your bills or tickets</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <HeroIl />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <p>Check your details & pay securely</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Step3 />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <p>You can rest, while we take care of cumbersome processes</p>
              </div>
            </div>
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
              <CardLogos />
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
                  className={`${iconStyles.typcn} ${iconStyles.typcnLockClosedOutline}`}
                ></span>
                <span style={{ fontSize: "14px" }}>
                  Your data, and transactions are always safe & secure
                </span>
              </div>
            </div>

            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ margin: "1rem 0" }}
            >
              <div className={styles.divider} />
            </div>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ margin: "0.5rem 0" }}
            >
              <h5 className={` ${styles.textCenter}`}>😍 Users Love Evergov</h5>
            </div>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ margin: "0 0 0.5rem 0" }}
            >
              <div
                className={`${styles.card} ${styles.textLeft}`}
                style={{
                  margin: "1rem 0.2rem",
                  padding: "0.2rem 0.2rem",
                  height: "140px",
                  border: "1px solid rgba(48,55,66,.10)",
                  boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
                }}
              >
                <div
                  className={styles.cardBody}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div>
                    <h6 style={{ textAlign: "left" }}>❝</h6>I didn’t expect the
                    process to be so fast- go to the website, snap a picture of
                    the ticket, click OK - <b>done in 30 seconds! </b>
                    <h6 style={{ textAlign: "right" }}>Abby</h6>
                  </div>

                  <div style={{ width: "200px", textAlign: "center" }}>
                    <figure
                      className={`${styles.avatar} ${styles.avatarXl}`}
                      data-initial="EG"
                      style={{
                        backgroundColor: "#3500f3",
                        fontSize: "2rem",
                        boxShadow: "0 0.2rem 0.5rem rgba(48,55,66,.30)",
                        border: "1px solid #fff",
                        width: "4rem",
                        height: "4rem"
                      }}
                    >
                      <AbbyPic />
                    </figure>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.card} ${styles.textLeft}`}
                style={{
                  margin: "1rem 0.2rem",
                  padding: "0.2rem 0.2rem",
                  height: "140px",
                  border: "1px solid rgba(48,55,66,.10)",
                  boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
                }}
              >
                <div
                  className={styles.cardBody}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div>
                    <h6 style={{ textAlign: "left" }}>❝</h6> What's worse than
                    the ticket itself is the time it takes to pay.{" "}
                    <b>Evergov has given me that time back.</b>
                    <h6 style={{ textAlign: "right" }}>Jesse</h6>
                  </div>

                  <div style={{ width: "170px", textAlign: "center" }}>
                    <figure
                      className={`${styles.avatar} ${styles.avatarXl}`}
                      data-initial="EG"
                      style={{
                        backgroundColor: "#fff",
                        fontSize: "2rem",
                        width: "4rem",
                        boxShadow: "0 0.2rem 0.5rem rgba(48,55,66,.30)",
                        border: "1px solid #fff",
                        height: "4rem"
                      }}
                    >
                      <JessePic />
                    </figure>
                  </div>
                </div>
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
                <h3>50,000</h3>
              </div>
              <div>
                <small>
                  accessed government services via Evergov in the last 6 months
                </small>
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



const mapStateToProps = function (state, ownProps) {
    return {
        ...state.quickPay
    };
};

export default connect(mapStateToProps)(Landing);