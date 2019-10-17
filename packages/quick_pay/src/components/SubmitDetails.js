import React, { Component, Fragment } from 'react';

import { connect } from "react-redux";
import currency from 'currency.js';
import Drawer from "react-drag-drawer";
import ContentEditable from 'react-contenteditable'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    PostalCodeElement, injectStripe } from 'react-stripe-elements';
import PaymentPreview from './PaymentPreview'

import styles from "./spectre.min.module.css"
import modalStyles from './modal.min.module.css'

import iconStyles from './typicons.min.module.css';
import { trackQPevent } from '../common/tracking';
import LicenceLogo from "../illus/QPLoading";
import CardLogos from "../illus/CardLogos.js";

import {subscribeUploadAnalysis, stepChange, updatePrice, updateEmail} from './actions';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { navigate } from '@reach/router';
const windowGlobal = typeof window !== "undefined" && window;

const createOptions = (fontSize, padding) => {
    return {
        style: {
            base: {
                fontSize,
                color: '#505c6e',
                letterSpacing: '0.025em',
                fontFamily: 'Source Code Pro, monospace',
                '::placeholder': {
                    color: '#aab7c4',
                },
                padding,
            },
            invalid: {
                color: '#d73e48',
            },
        },
    };
};

class SubmitDetails extends Component {
    constructor(props) {
        super(props);
        this.onPreview = this.onPreview.bind(this);
        this.contentEditable = React.createRef();
        this.changeEmail = this.changeEmail.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.stripeElementChange = this.stripeElementChange.bind(this);
        this.resetPrice = this.resetPrice.bind(this);
        this.fixCardDetails = this.fixCardDetails.bind(this);
        this.state = {
            card_no: false,
            card_exp: false,
            cvc_number: false,
            postal: false,
            email: false,
        }
    }

    fixCardDetails(){
      const {dispatch} = this.props;
      dispatch(stepChange("guess_price_and_update_details"));
    }

    resetPrice(){
        const {dispatch, guessPrice} = this.props;
        dispatch(updatePrice(String(currency(guessPrice).value)));
    }

    stripeElementChange(element, name){
        console.log(element);
        if (!element.empty && element.complete) {
            this.setState({ [name]: true });
        }
    }

    componentDidMount(){
        const { dispatch, createdSubId, anonUserID, step } = this.props;
        dispatch(subscribeUploadAnalysis(createdSubId));
        dispatch(trackQPevent(`${step}_loading`, anonUserID, { submissionId: createdSubId}))
    }

    changeEmail(e){
        const {dispatch} = this.props;
        dispatch(updateEmail(e.target.value));
        this.setState({ email: e.target.value})
    }

    changePrice(evt){
        const { dispatch } = this.props;
        console.log(evt.target.value);
        dispatch(updatePrice(evt.target.value));
    };

    onPreview(ev) {
        const { createdSubId, dispatch, anonUserID } = this.props;
        ev.preventDefault();
        dispatch(stepChange('show_submit_confirm'));
        dispatch(trackQPevent('show_submit_confirm', anonUserID, { submissionId: createdSubId }))
    }

    componentWillReceiveProps(nextProps){
  
        if (this.props.analyseInProgress !== nextProps.analyseInProgress && nextProps.analyseInProgress === false){
            this.props.dispatch(trackQPevent(`${this.props.step}_loaded`, this.props.anonUserID, { submissionId: this.props.createdSubId }))
             if (windowGlobal) {
               windowGlobal.scrollTo(0, 0);
             }
        }
    }

    render() {
        const { analyseInProgress, submissionImgUrl, guessPrice, userPrice, userEmail, step } = this.props;

        if (analyseInProgress) {
          return (
            <div className={styles.columns}>
              <div
                className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
              >
                <div
                  className={styles.card}
                  style={{ border: "none", padding: "5rem" }}
                >
                  <div
                    className={`${styles.cardHeader} ${styles.h3}`}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <LicenceLogo />
                  </div>
                  <div
                    className={styles.loading}
                    style={{ marginTop: "1rem" }}
                  >
                    {" "}
                  </div>
                  <p className={styles.cardBody} style={{ paddingTop: "3rem" }}>
                    <h5> Analyzing your snap</h5>
                  </p>
                </div>
              </div>
            </div>
          );
        }

        // can't be zero to proceed
        let price = '0.00'
        let message = 'Since I’m just a bot, I couldn’t figure out the amount due. Please enter the correct amount below'
        if (guessPrice && guessPrice!=='NA'){
            price = guessPrice;
            price = String(currency(price).value)
            message = 'This is an estimate based on your receipt, feel free to edit!'
        }

        if (userPrice){
            message = null;
            price = userPrice;
        }

        const valCheck = currency(price).value

        const canSubmit = this.state.card_no && this.state.card_exp && this.state.cvc_number && this.state.postal && this.state.email && valCheck > currency('2.00').value

       
        if (valCheck > currency('10,000').value){
            return (<div className={styles.columns}>
                <div className={`${styles.column} ${styles.col12}`}>

                    <div className={styles.empty}>
                       
                        <p className={`${styles.emptyTitle} ${styles.h3}`}>💰That's amount is higher than what we can process at the moment 💰</p>

                        <p className={styles.emptySubtitle}>
                            Please email <a href="mailto:team@papergov.com" target="_top">team@papergov.com</a> for more details
                        </p>

                        <p className={styles.emptySubtitle} >
                            <button onClick={this.resetPrice} className={`${styles.btn} ${styles.btnLink}`}>Change amount
                            </button>
                        </p>

                    </div>

                </div>
            </div>)
        } else if (valCheck <= currency('2.00').value){
            message = "Looks like the amount to pay is too low. Since I’m just a bot & may get this wrong, feel free to edit."
            if (userPrice){
                message = 'The amount due is too low to make a transaction'
            }
            if (valCheck === currency('0.00').value){
                if (userPrice){
                    message = 'The amount due is too low to make a transaction'
                }
                else{
                    message = 'Since I’m just a bot, I couldn’t figure out the amount due. Please enter the correct amount below”'
                }
               
            }
        }
        
        const isPreview = (step === 'show_submit_confirm')
        return (
          <Fragment>
            <div
              style={{
                padding: "0.3rem",

                background: "#fff",
                borderRadius: "0.3rem",
                margin: "0.3rem 0"
              }}
              className={styles.columns}
            >
              <div className={`${styles.column} ${styles.col12}`}>
                {submissionImgUrl ? (
                  <div
                    className={`${styles.tile} ${styles.tileCentered}`}
                    style={{
                      fontSize: "12px",
                      background: "#ece6ff",
                      borderLeft: "2px solid #5627ff",
                      borderRadius: "5px",
                      padding: "6px 6px",
                      color: "#3b4351"
                    }}
                  >
                    <div
                      className={`${styles.tileIcon} `}
                      style={{ width: "auto", height: "26px" }}
                    >
                      <img
                        style={{ width: "auto", height: "26px" }}
                        src={submissionImgUrl}
                        alt={submissionImgUrl}
                      />
                    </div>

                    <div className={styles.tileContent}>
                      <div className={styles.tileTitle}>
                        <a target="_blank" href={submissionImgUrl}>
                          {" "}
                          Your submission{" "}
                        </a>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        window.location.href = "/";
                      }}
                      className={styles.tileAction}
                      style={{
                        cursor: "pointer"
                      }}
                    >
                      <span
                        style={{
                          color: "#5627ff",
                          padding: "0 4px 0 0 ",
                          fontSize: "1.5rem"
                        }}
                        className={`${iconStyles.typcn} ${iconStyles.typcnRefresh}`}
                      ></span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <div
                style={{
                  padding: "0.5rem",
                  border: "1px solid rgba(86, 39, 255, .2)",
                  background: "#fff",
                  borderRadius: "0.3rem",
                  margin: "0.1rem",
                  boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
                }}
                className={styles.columns}
              >
                <div className={`${styles.column} ${styles.col12}`}>
                  <Drawer
                    open={isPreview}
                    containerElementClass={modalStyles.container}
                    modalElementClass={modalStyles.modal}
                    onRequestClose={this.fixCardDetails}
                  >
                    <PaymentPreview stripe={this.props.stripe} />
                  </Drawer>
                  <div
                    className={`${styles.panelHeader} ${styles.textCenter} `}
                  >
                    <div className={styles.panelSubtitle}>
                      {message ? (
                        <div
                          className={`${styles.label} ${styles.labelWarning}`}
                          style={{
                            fontSize: "12px",
                            background: "#fff",
                            border: "1px solid rgba(255, 183, 0, .9)",
                            borderRadius: "5px",
                            padding: "6px 6px",
                            color: "#3b4351"
                          }}
                        >
                          <span
                            style={{
                              color: "#ffb700",
                              padding: "0 4px 0 0 "
                            }}
                            className={`${iconStyles.typcn} ${iconStyles.typcnLightbulb}`}
                          ></span>
                          {message}
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={`${styles.h1}`}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "16px 0 8px 0"
                      }}
                    >
                      {" "}
                      <span style={{ fontSize: "1rem", alignSelf: "center" }}>
                        {"$"}
                      </span>
                      <ContentEditable
                        style={{ borderBottom: "1px dotted #3b4351" }}
                        innerRef={this.contentEditable}
                        type="number"
                        html={price} // innerHTML of the editable div
                        disabled={false} // use true to disable editing
                        onChange={this.changePrice} // handle innerHTML change
                        // Use a custom HTML tag (uses a div by default)
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={styles.columns}
                style={{
                  padding: "1rem 1rem",
                  border: "1px solid rgba(86, 39, 255, .2)",
                  background: "#fff",
                  margin: "1rem 0",
                  borderRadius: "0.3rem",
                  boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
                }}
              >
                <div
                  className={`${styles.column} ${styles.col12} ${styles.textLeft} `}
                >
                  <div
                    style={{
                      margin: "0 0 1rem 0"
                    }}
                  >
                    <CardLogos />

                    <span
                      style={{ padding: "0 4px 0 0 ", color: "#30ae40" }}
                      className={`${iconStyles.typcn} ${iconStyles.typcnLockClosedOutline}`}
                    ></span>
                    <span style={{ fontSize: "10px" }}>
                      Your data & transactions are always safe & secure
                    </span>
                  </div>
                </div>
                <div className={`${styles.column} ${styles.col12}`}>
                  <label
                    className={`${styles.formLabel} ${styles.textUppercase} ${styles.textBold}`}
                    style={{ fontSize: "12px" }}
                  >
                    Card number
                    <CardNumberElement
                      name="card_no"
                      onChange={element =>
                        this.stripeElementChange(element, "card_no")
                      }
                      className={styles.formInput}
                      {...createOptions("19px")}
                    />
                  </label>
                </div>
                <div className={`${styles.column} ${styles.col5}`}>
                  <label
                    className={`${styles.formLabel} ${styles.textUppercase} ${styles.textBold}`}
                    style={{ fontSize: "12px" }}
                  >
                    Exp. date
                    <CardExpiryElement
                      name="card_exp"
                      onChange={element =>
                        this.stripeElementChange(element, "card_exp")
                      }
                      className={styles.formInput}
                      {...createOptions("19px")}
                    />
                  </label>
                </div>
                <div className={`${styles.column} ${styles.col3}`}>
                  <label
                    className={`${styles.formLabel} ${styles.textUppercase} ${styles.textBold}`}
                    style={{ fontSize: "12px" }}
                  >
                    CVC
                    <CardCVCElement
                      name="cvc_number"
                      onChange={element =>
                        this.stripeElementChange(element, "cvc_number")
                      }
                      className={styles.formInput}
                      {...createOptions("19px")}
                    />
                  </label>
                </div>
                <div className={`${styles.column} ${styles.col4}`}>
                  <label
                    className={`${styles.formLabel} ${styles.textUppercase} ${styles.textBold}`}
                    style={{ fontSize: "12px" }}
                  >
                    Postal code
                    <PostalCodeElement
                      name="postal"
                      onChange={element =>
                        this.stripeElementChange(element, "postal")
                      }
                      className={styles.formInput}
                      {...createOptions("19px")}
                    />
                  </label>
                </div>

                <div
                  className={`${styles.column} ${styles.col12}`}
                  style={{ margin: "1rem 0" }}
                >
                  <li className={styles.divider}></li>

                  <label
                    className={`${styles.formLabel}`}
                    style={{
                      margin: "16px 0 8px 0",

                      textAlign: "left"
                    }}
                  >
                    <div>
                      <span
                        style={{
                          padding: "0 4px 0 0 ",
                          color: "rgba(86, 39, 255, .9)"
                        }}
                        className={`${iconStyles.typcn} ${iconStyles.typcnMail}`}
                      ></span>
                      Provide us your email to keep you updated
                    </div>
                  </label>

                  <input
                    type="email"
                    placeholder="you@youremail.com"
                    style={{fontSize: '16px'}}
                    className={styles.formInput}
                    name="email"
                    required
                    onChange={this.changeEmail}
                    onBlur={() => {}}
                    value={userEmail ? userEmail : ""}
                  />
                </div>

                <div className={`${styles.column} ${styles.col12}`}>
                  {!canSubmit && userEmail ? (
                    <div
                      style={{
                        fontSize: "14px",
                        borderRadius: "5px",
                        width: "100%",
                        padding: "6px 8px",
                        color: "#3b4351"
                      }}
                    >
                      <span
                        className={`${iconStyles.typcn} ${iconStyles.typcnInfoLarge}`}
                      ></span>{" "}
                      Please enter the correct amount due, and complete payment
                      details to proceed
                    </div>
                  ) : null}
                  <button
                    disabled={!canSubmit}
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      fontSize: "14px"
                    }}
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} ${styles.textUppercase} ${styles.textBold}`}
                    onClick={this.onPreview}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        );
    }
}

const InjectedForm = injectStripe(SubmitDetails);


const mapStateToProps = function (state, ownProps) {
    return {
        ...state.quickPay,
        ...ownProps
    };
};

export default connect(mapStateToProps)(InjectedForm);