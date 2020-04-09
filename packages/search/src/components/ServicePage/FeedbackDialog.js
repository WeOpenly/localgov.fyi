import React, { Component, Fragment } from "react";

import Mood from "@material-ui/icons/Mood";
import HighLightOutlined from "@material-ui/icons/HighlightOutlined";

import SentimentDissatisfied from "@material-ui/icons/SentimentDissatisfied";
import MoodBad from "@material-ui/icons/MoodBad";

import styles from "../spectre.min.module.css";
import classNames from "classnames/bind";

import MediaNetAd from "../components/MediaNetAd";

let cx = classNames.bind(styles);

class FeedbackDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.openAttachment = this.openAttachment.bind(this);
    this.closeAttachment = this.closeAttachment.bind(this);

    this.handleBad = this.handleBad.bind(this);
    this.handleGood = this.handleGood.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleBad() {
      this.props.handleBad()
  }
  handleGood() {
      this.props.handleGood()
  }
  handleSubmit() {
      this.props.handleSubmit()
  }
  handleReset() {
      this.props.handleReset()
  }
  closeAttachment(ev) {
    this.props.onClose()
  }

  openAttachment(ev) {
    this.setState({
      isOpen: true
    });
  }

  render() {
    const {
      showSatisfied,
      success,
      failure,
      submitting,
      open,
      feedbackOpen,
      feedbackComment,
      email
    } = this.props;

    let className = cx({
      modal: true,
      active: open
    });

    return (
      <div className={className}>
        <div className={styles.modalContainer}>
          {showSatisfied && (
            <div>
              <div>
                <a
                  href="#close"
                  onClick={this.closeAttachment}
                  aria-label="Close"
                />
              </div>

              <div
                className={styles.modalHeader}
                style={{ textAlign: "center" }}
              >
                <h5>How was your experience with papergov?</h5>
              </div>

              <div style={{ textAlign: "center", margin: "2rem" }}>
                <button
                  onClick={this.handleGood}
                  type="submit"
                  className={`${styles.btn} ${styles.btnSecondary} ${styles.inputGroupBtn} ${styles.btnLg}`}
                >
                  Good so far &#128522
                </button>
              </div>
              <div style={{ textAlign: "center", margin: "2rem" }}>
                <button
                  onClick={this.handleBad}
                  className={`${styles.btn} ${styles.btnSecondary} ${styles.inputGroupBtn} ${styles.btnLg}`}
                  type="submit"
                >
                  It could have been better &#128542
                </button>
              </div>
              <div style={{ textAlign: "center", margin: "2rem" }}>
                <p>
                  <HighLightOutlined style={{ fontSize: "20px" }} />
                  In case you missed it, the link opens in a new tab of your
                  browser
                </p>
              </div>

              <div
              className={`${styles.column} ${styles.col2} ${styles.textCenter} `}
              >
              <p>
              <MediaNetAd
                dims="300x50"
                slotId="424776710"
                containerStyles={{
                  marginTop: "8px",
                  borderTop: "1px solid #d4d4d4",
                  paddingTop: "8px"
                }}
              />
              </p>
            </div>
              
            </div>
          )}
          {!showSatisfied && !success && !failure && !submitting && (
            <Fragment>
              <div>
                <div
                  className={styles.modalHeader}
                  style={{ textAlign: "center" }}
                >
                  <h5>Let us know how we can improve</h5>
                </div>

                <form
                  name="serviceDeliveryFeedback"
                  method="post"
                  action="/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}
                >
                  <input
                    type="hidden"
                    name="form-name"
                    value="serviceDeliveryFeedback"
                  />
                  <p hidden>
                    <label>
                      Don’t fill this out:{" "}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </p>
                  <p hidden>
                    <label>
                      Don’t fill this out:{" "}
                      <input name="path" type="text" value="" />
                    </label>
                  </p>
                  <label>
                    <textarea
                      required={!this.state.satisfied}
                      name="feedbackComment"
                      type="text"
                      placeholder="Your comments"
                      value={feedbackComment}
                      onChange={this.handleChange}
                      rows={4}
                      className={classes.ser_del_link_bootstrapInputComment}
                    />
                  </label>
                  <label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </label>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.inputGroupBtn} ${styles.btnLg}`}
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    size="small"
                    className={`${styles.btn} ${styles.btnSecondary} ${styles.inputGroupBtn} ${styles.btnLg}`}
                    onClick={this.handleClose}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </Fragment>
          )}
          {submitting && <div>loading</div>}
          {failure && (
            <div>
              <MoodBad />
              <div>Sorry, something went wrong. Please try again.</div>
              <button
                size="small"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.inputGroupBtn} ${styles.btnLg}`}
                onClick={this.handleReset}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FeedbackDialog;
