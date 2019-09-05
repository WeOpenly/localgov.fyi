import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';

import styles from "../spectre.min.module.css";

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
            <label
              className={`${styles.formLabel} ${styles.textUppercase} ${styles.textBold}`}
              style={{ fontSize: "12px" }}
            >
              Card details
            </label>
              <CardElement {...createOptions(this.props.fontSize)} />

            <button
              style={{ marginTop: "16px", width: "100%", fontSize: "14px" }}
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} ${styles.textUppercase} ${styles.textBold}`}
            >
              Finish Payment
            </button>
          </form>
        );
    }
}

export default injectStripe(StripeCheckoutForm);