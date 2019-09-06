import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';

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
    handleSubmit = (ev) => {
        ev.preventDefault();

        if (this.props.stripe) {
         
              this.props.stripe
                .createToken({ type: "card", email: this.props.email })
                .then(payload => {
                  if (payload && payload.token) {
                    this.props.onStripeToken(payload.token.id)
                  }
                });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <CardElement {...createOptions("16px")} />

            <button
              style={{ marginTop: "2rem", width: "100%", fontSize: "14px" }}
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} ${styles.textUppercase} ${styles.textBold}`}
            >
              Finish Payment
            </button>
            <p
              style={{
                paddingBottom: "8px",
                margin: "8px 0 0 0",
                textAlign: 'center'
              }}
            >
              <span
                className={`${iconStyles.typcn} ${iconStyles.typcnLockClosedOutline}`}
              ></span>
              <span style={{ fontSize: "14px" }}>
                Your data, and transactions are always safe & secure
              </span>
            </p>
          </form>
        );
    }
}

export default injectStripe(StripeCheckoutForm);