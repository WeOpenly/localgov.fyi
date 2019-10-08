import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from "react-stripe-elements";
import CardLogos from "../../illus/CardLogos.js";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

const createOptions = (fontSize, padding) => {
    return {
      style: {
        base: {
          fontSize,
          color: "#3b4351",
          letterSpacing: "0.035em",
          background: "#fcfcff",
          backgroundImage: "none",
          border: ".06rem solid #bcc3ce",
          boxShadow: "rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px",
          borderRadius: ".2rem",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#8d939b"
          },
          padding
        },
        invalid: {
          color: "#d73e48"
        }
      }
    };
};

class StripeCheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.stripeElementChange = this.stripeElementChange.bind(this);
    this.state = {
      card_no: false,
      card_exp: false,
      cvc_number: false,
      postal: false
    };
  }

  stripeElementChange(element, name) {
    console.log(element);
    if (!element.empty && element.complete) {
      this.setState({ [name]: true });
    }
  }

  handleSubmit = ev => {
    ev.preventDefault();

    if (this.props.stripe) {
      this.props.stripe
        .createToken({ type: "card", email: this.props.email })
        .then(payload => {
          if (payload && payload.token) {
            this.props.onStripeToken(payload.token.id);
          }
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.columns}>
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
          <div style={{margin: '0.5rem 0'}} className={`${styles.column} ${styles.col12}`}>
            <div className={styles.formGroup}>
              <label className={styles.formSwitch}>
                <input type="checkbox"  />
                <i className={styles.formIcon}></i> Use this payment method for making
                service payments too
              </label>
            </div>
          </div>
        </div>

        <button
          style={{ marginTop: "1rem", width: "100%", fontSize: "14px" }}
          className={`${styles.btn} ${styles.btnLg} ${styles.textUppercase} ${styles.textBold}`}
        >
          Finish Payment
        </button>
        <div className={`${styles.column} ${styles.col12} ${styles.textLeft} `}>
          <div
            style={{
              margin: "1rem 0 1rem 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div>
              <CardLogos />
            </div>
            <div>
              <span
                style={{ padding: "0 4px 0 0 ", color: "#30ae40" }}
                className={`${iconStyles.typcn} ${iconStyles.typcnLockClosedOutline}`}
              ></span>
              <span style={{ fontSize: "10px" }}>
                Your data & transactions are always safe & secure
              </span>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default injectStripe(StripeCheckoutForm);