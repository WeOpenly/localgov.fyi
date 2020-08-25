import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "../spectre.min.module.css";

import { trackClick, trackInput } from "../common/tracking";
import {
  toggleFeedbackDialog,
  toggleNotifyDialog
} from "../UserRequests/actions";

import { encode } from "universal-base64";

import SvgUsers from "../../svgIcons/users";

import classNames from "classnames/bind";

import GoogleAds from "../GoogleAds";

let cx = classNames.bind(styles);

const windowGlobal = typeof window !== "undefined" && window;

const encodeBody = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class ServiceDeliveryLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectClicked: false,
      feedbackOpen: false,
      showSatisfied: true,
      satisfied: null,
      email: "",
      feedbackComment: "",
      submitting: false,
      success: false,
      failure: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleGood = this.handleGood.bind(this);
    this.handleBad = this.handleBad.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleClick() {
    const { tglFeedbackDialog } = this.props;

    setTimeout(() => {
      this.setState({ redirectClicked: false });
      tglFeedbackDialog(true);
    }, 100);
  }

  handleGood() {
    const { trackFeedback } = this.props;
    let currentLoc = "";
    if (window.location && window.location.pathname) {
      currentLoc = window.location.pathname;
    }
    
    this.setState({ 
      showSatisfied: false,
      satisfied: true
    },
    () => 
      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encodeBody({
          "form-name": "serviceDeliveryFeedback",
          path: currentLoc,
          satisfied: true
        })
    })
      .then(() => 
        this.setState({ 
          submitting: this.state.submitting,
          success: this.state.success
          }))
        .catch(error => 
          this.setState({ 
            submitting: false, 
            failure: true 
          })
        )
    );

    trackFeedback({
      satisfied: true,
      feedbackComment: this.state.feedbackComment
    });
  }

  handleBad() {
    const { trackFeedback } = this.props;
    let currentLoc = "";
    if (window.location && window.location.pathname) {
      currentLoc = window.location.pathname;
    }
    this.setState(
      {
        showSatisfied: false,
        satisfied: false
      },
      () =>
        fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: encodeBody({
            "form-name": "serviceDeliveryFeedback",
            path: currentLoc,
            satisfied: false
          })
        })
          .then(() =>
            this.setState({
              submitting: this.state.submitting,
              success: this.state.success
            })
          )
          .catch(error =>
            this.setState({
              submitting: this.state.submitting,
              failure: this.state.success
            })
          )
    );
    trackFeedback({
      satisfied: false,
      feedbackComment: this.state.feedbackComment
    });
  }

  handleClose() {
    const { id } = this.props;

    if (windowGlobal && windowGlobal.localStorage) {
      const remClosedone = localStorage.getItem(`rem_close_${id}`);
      if (!remClosedone) {
        this.props.tglNotifyDialog(true);
      }
    }

    this.props.tglFeedbackDialog(false);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    const { trackFeedback } = this.props;
    let currentLoc = "";
    if (window.location && window.location.pathname) {
      currentLoc = window.location.pathname;
    }
    e.preventDefault();

    this.setState({ submitting: true });
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encodeBody({
        "form-name": "serviceDeliveryFeedback",
        path: currentLoc,
        satisfied: this.state.satisfied,
        feedbackComment: this.state.feedbackComment,
        email: this.state.email
      })
    })
      .then(() => this.setState({ submitting: false, success: true }))
      .catch(error => this.setState({ submitting: false, failure: true }))
      .then(() => {});

    trackFeedback({
      satisfied: this.state.satisfied,
      feedbackComment: this.state.feedbackComment
    });
  }

  handleReset() {
    this.setState({ submitting: false, success: false, failure: false });
  }

  render() {
    const {
      showFeedbackDialog,
      classes,
      serDelLinks,
      org_name,
      orgNameOnly,
      service_name,
      views
    } = this.props;

    const {
      feedbackOpen,
      showSatisfied,
      feedbackComment,
      email,
      submitting,
      success,
      failure
    } = this.state;

    let className = cx({
      modal: true,
      active: showFeedbackDialog
    });

    let canQuickPay = false;

    if (
      service_name.includes("Activity") ||
      service_name.includes("Register") ||
      service_name.includes("Apply") ||
      service_name.includes("Check")
    ) {
      canQuickPay = false;
    }

    if (!serDelLinks) {
      return null;
    }

    if (serDelLinks.length === 0) {
      return null;
    }

    let moreThan = 10;

    if (views) {
      let viewsAgg = views.map(item => item.views).reduce((a, b) => a + b);

      if (viewsAgg && viewsAgg / 10 > 1) {
        moreThan = 10 * Math.ceil(viewsAgg / 10);
      }
    }

    let serButtons = null;
    let qpButton = null;
    let linkText = "Quick Pay";
    if (serDelLinks) {
      serButtons = serDelLinks.map((link, idx) => {
        const data = {
          s: service_name,
          o: orgNameOnly,
          u: link.url
        };
        const encodedData = encode(JSON.stringify(data));
        const redir = `/deep_link/?data=${encodedData}`;
        linkText = `Quick ${link.link_name}`;
        return (
          <a
            key={link.link_name}
            href={redir}
            onClick={this.handleClick}
            target="_blank"
            variant="outlined"
            color="primary"
            size="small"
            className={`${styles.btn} ${styles.btnPrimary} ${styles.inputGroupBtn} ${styles.btnLg}`}
          >
            {this.state.redirectClicked ? "loading" : `${link.link_name}`}
          </a>
        );
      });
    }

    if (canQuickPay) {
      const redir = "https://pay.papergov.com/?utm_source=service_page";
      qpButton = (
        <button
          key={"qp-button"}
          href={redir}
          onClick={this.handleClick}
          target="_blank"
          variant="contained"
          color="primary"
          size="small"
          style={{
            marginBottom: "4px"
          }}
          className={`${styles.btn} ${styles.btnSecondary} ${styles.inputGroupBtn} ${styles.btnLg}`}
        >
          {this.state.redirectClicked ? <CircularProgress /> : `${linkText}`}
        </button>
      );
    }

    const dialog = (
      <div className={className} id="service_delivery_link">
        <a
          href="#close"
          onClick={this.handleClose}
          className={styles.modalOverlay}
          aria-label="Close"
        />

        <div className={styles.modalContainer}>
          {showSatisfied && (
            <div>
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
                  Good so far!
                </button>
              </div>
              <div style={{ textAlign: "center", margin: "2rem" }}>
                <button
                  onClick={this.handleBad}
                  className={`${styles.btn} ${styles.btnSecondary} ${styles.inputGroupBtn} ${styles.btnLg}`}
                  type="submit"
                >
                  It could have been better!
                </button>
              </div>
              <div style={{ textAlign: "center", margin: "2rem" }}>
                <p>
  
                  In case you missed it, the link opens in a new tab of your
                  browser
                </p>
              </div>
              <div class="divider"></div>
              <div
                className={`${styles.column} ${styles.col12} ${styles.textCenter} `}
              >
              <GoogleAds
                slot="6545379470"
                containerStyles={{
                  marginTop: "16px",
                  borderLeft: "1px solid #ececec"
                }}
              />
             </div>
              
            </div>
          )}
          {!showSatisfied && !success && !failure && !submitting && (
            <Fragment>
              <div style={{ padding: "2rem 1rem" }}>
                <div
                  className={styles.modalHeader}
                  style={{ textAlign: "center" }}
                >
                  <h5>Thanks! We would love to know more!</h5>
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
                    className={styles.formInput}
                    style={{ margin: "2rem 0" }}
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
                      required
                      name="feedbackComment"
                      type="text"
                      style={{ margin: "1rem 0" }}
                      placeholder="Can you please give us more details about your experience?"
                      value={feedbackComment}
                      className={styles.formInput}
                      onChange={this.handleChange}
                      rows={4}
                    />
                  </label>
                 
                  <label> 
                   <select 
                    className={styles.formInput}
                    style= {{ alignContent: "left" }}
                    name="category"
                    type="option"
                    value= {value}
                    onChange={this.handleChange}
                    >
                      <option value=""> Pick a category here! </option>
                      <option value="service link">Online Service Page</option>
                      <option value="404">Service Page Link</option>
                      <option value="payment">Payment Options</option>
                      <option value="transaction fee">Trasaction Fees</option>
                      <option value="faqs">FAQs</option>
                      <option value="info">Contact Info</option>
                      <option value="other">Other</option>
                    </select>
                  </label>

                  <label>
                    <input
                      required
                      style={{ margin: "1rem 0" }}
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      className={styles.formInput}
                      onChange={this.handleChange}
                    />
                   <br> </br>
                  </label>
                  
                  <button
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.inputGroupBtn} ${styles.btnLg}`}
                    type="submit"
                    style={{ margin: "0 0.5rem" }}
                    onClick={this.handleChange}
                  >
                    Submit
                  </button>
                  <button
                    style={{ margin: "0 0.5rem" }}
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
          {success && (
            <div style={{ padding: "2rem 1rem" }}>
              <div>
              <br></br>
                Thanks! We will use this feedback to improve Papergov. 
              <br></br>
              </div>
              <br></br>
              <button
                style={{ margin: "1 1rem" }}
                size="small"
                className={`${styles.btn} ${styles.btnSecondary} ${styles.inputGroupBtn} ${styles.btnLg}`}
                onClick={this.handleClose}
              >
              Close 
              </button>
              <br></br>
            </div>
          )} 
          {failure && (
            <div>
              <div>Something went wrong. Please try again.</div>
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

    let redirMsg = null;
    if (this.state.redirectClicked) {
      redirMsg = (
        <p variant="caption" className="ser_del_redir" gutterBottom>
          <i>Redirecting to</i>
          {org_name}'s {service_name}
          page
        </p>
      );
    }

    const viewsComp =
      moreThan > 10 ? (
        <div>
          <div>
            {" "}
            <SvgUsers style={{ fontSize: "20px" }} />{" "}
          </div>{" "}
          <div>
            <div className={`${speStyles.textSemibold}`}>
              <p style={{ marginBottom: "0.5rem" }}>
                <b>{moreThan}</b> accessed this month
              </p>
            </div>
          </div>
        </div>
      ) : null;

    return (
      <Fragment>
        <div>
          {viewsComp}
          {serButtons}
          {qpButton ? (
            <Fragment>
              <div className={speStyles.divider} />
              {qpButton}
              <div>
                <div className={`${speStyles.textSemibold}`}>
                  <p>⚡ No Login. Snap, Pay & Done!</p>
                </div>
              </div>
            </Fragment>
          ) : null}
        </div>

        {redirMsg}
        {dialog}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex));
    },
    trackFeedback: data => {
      dispatch(trackInput("feedback_form", "", data));
    },
    tglFeedbackDialog: toggle => {
      dispatch(toggleFeedbackDialog(toggle));
    },
    tglNotifyDialog: toggle => {
      dispatch(toggleNotifyDialog(toggle));
    }
  };
};

const mapStateToProps = function(state, ownProps) {
  return {
    showFeedbackDialog: state.userRequests.showFeedbackDialog,
    ...ownProps
  };
};

const ConnServiceDeliveryLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceDeliveryLink);

export default ConnServiceDeliveryLink;
