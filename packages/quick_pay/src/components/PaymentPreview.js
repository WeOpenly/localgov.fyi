import React, { Component } from 'react';

import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import iconStyles from './typicons.min.module.css';
import currency from 'currency.js';
import { finalizeSubmit, stepChange } from './actions';

const windowGlobal = typeof window !== 'undefined' && window

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
                color: '#9e2146',
            },
        },
    };
};

class PaymentPreview extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          failedMsg: null,
        }
    }

    
    onSubmit(ev) {
        ev.preventDefault();
        const { createdSubId, dispatch } = this.props;
        const { guessPrice, userPrice, userEmail } = this.props;
    
        let price = 'NA'
        if (guessPrice && guessPrice !== 'NA') {
            price = guessPrice;
            price = String(currency(price).value)
        }
        if (userPrice) {
            price = userPrice;
        }

        const finalAmt = currency(price).add(currency(price).multiply("0.05"))
        const finalAmtInt = finalAmt.intValue;

        if (finalAmtInt < 200){
            return
        }

        if (this.props.stripe) {
            this
                .props
                .stripe
                .createToken({ type: 'card', email: userEmail})
                .then((payload) => {
                    if (payload && payload.token) {
                        dispatch(finalizeSubmit(createdSubId, userEmail, price, payload.token.id));
                        dispatch(stepChange('final_conf'));
                    }
                    if(payload && payload.error){
                      const {message}  = payload.error
                      this.setState({
                        failedMsg: message
                      })
                    }
                });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    }

    render() {
        const { guessPrice, userPrice } = this.props;
        let price = 'NA'
        if (guessPrice && guessPrice !== 'NA') {
            price = guessPrice;
            price = String(currency(price).value)
        }
        if (userPrice) {
            price = userPrice;
        }
  
        const finalAmt = currency(price).add(currency(price).multiply("0.05"))
        const finalAmtShow = finalAmt.value;

        return (
          <div className={`${styles.column} ${styles.col12}`}>
            <div
              style={{
                padding: "0.3rem",

                background: "#fff",
                borderRadius: "0.3rem"
              }}
              className={styles.columns}
            >
              <div className={`${styles.column} ${styles.col12}`}>
                <form onSubmit={this.onSubmit}>
                  <ul style={{ margin: "0.8rem" }}>
                    {this.state.failedMsg ? (
                      <li
                        className={styles.menuItem}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "8px 8px",
                        }}
                      >
                        <div
                          className={`${styles.label} ${styles.labelWarning}`}
                          style={{
                            fontSize: "12px",
                            background: "#fff",
                            border: "1px solid rgba(215, 62, 72, .95)",
                            borderRadius: "5px",
                            padding: "6px 6px",
                            color: "#3b4351"
                          }}
                        >
                          <span
                            style={{
                              color: "#d73e48",
                              padding: "0 4px 0 0 "
                            }}
                            className={`${iconStyles.typcn} ${iconStyles.typcnWarning}`}
                          ></span>
                          Payment was not successfull because {" "}
                          {this.state.failedMsg}
                        </div>
                      </li>
                    ) : null}
                    <li
                      className={styles.menuItem}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "16px 8px"
                      }}
                    >
                      <h5>Payment Summary</h5>
                    </li>
                    <li
                      className={styles.menuItem}
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <span
                          className={`${iconStyles.typcn} ${iconStyles.typcnCreditCard}`}
                        ></span>
                        Amount to pay
                      </div>

                      <div className={styles.menuItem}>
                        {`$`}
                        {price}
                      </div>
                    </li>
                    <li className={styles.divider}></li>
                    <li
                      className={styles.menuItem}
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <span
                          className={`${iconStyles.typcn} ${iconStyles.typcnTime}`}
                        ></span>
                        Estimated wait
                      </div>

                      <div className={styles.menuItem}>Less then a day</div>
                    </li>
                    <li className={styles.divider}></li>
                    <li
                      className={styles.menuItem}
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <div
                        className={`${styles.tooltip} ${styles.tooltipRight}`}
                        data-tooltip="papergov performs this on your behalf for a small fee"
                      >
                        <span
                          className={`${iconStyles.typcn} ${iconStyles.typcnSupport}`}
                        ></span>
                        Service Fee
                        <sup>
                          <span
                            className={`${iconStyles.typcn} ${iconStyles.typcnInfoLarge}`}
                          ></span>
                        </sup>
                      </div>

                      <div className={styles.menuItem}>5%</div>
                    </li>
                    <li className={styles.divider}></li>

                    <li
                      className={styles.menuItem}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 10px"
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>Total</div>

                      <div
                        className={styles.menuItem}
                        style={{ fontWeight: "bold" }}
                      >
                        {"$"}
                        {finalAmtShow}
                      </div>
                    </li>

                    <li
                      className={styles.menuItem}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 8px 0 8px"
                      }}
                    >
                      <button
                        style={{
                          marginTop: "16px",
                          width: "100%",
                          fontSize: "14px"
                        }}
                        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} ${styles.textUppercase} ${styles.textBold}`}
                        type="submit"
                      >
                        {" "}
                        <span
                          className={`${iconStyles.typcn} ${iconStyles.typcnThumbsUp}`}
                        ></span>
                        Pay {"$"}
                        {finalAmtShow}
                      </button>
                    </li>
                    <li
                      className={styles.menuItem}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "8px 8px",
                        alignItems: "center"
                      }}
                    >
                      <small style={{ fontSize: "12px" }}>
                        <span
                          className={`${iconStyles.typcn} ${iconStyles.typcnInfoLarge}`}
                        ></span>
                        You accept terms by cicking this
                      </small>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        );
    }
}



const mapStateToProps = function (state, ownProps) {
    return {
        ...state.quickPay,
        ...ownProps
    };
};

export default connect(mapStateToProps)(PaymentPreview);