import React, { Component } from 'react';

import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import iconStyles from './typicons.min.module.css';
import currency from 'currency.js';
import { finalizeSubmit, stepChange } from './actions';
import ChoosePayment from './PaymentPreview/choose';

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
      if(ev){
        ev.preventDefault();
      }
        
        const { createdSubId, dispatch } = this.props;
        const { guessPrice, userPrice, userEmail } = this.props;
        const {enable_subs, sub_packages} = this.props;


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
        const { enable_subs, sub_packages } = this.props;
      

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

        if(enable_subs){
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
                  <ChoosePayment
                    createCharge={this.onSubmit}
                    finalAmtShow={finalAmtShow}
                    enable_subs={enable_subs}
                    sub_packages={sub_packages}
                  />
                </div>
              </div>
            </div>
          );
         
        }

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