import React from 'react';
import { Elements } from 'react-stripe-elements';

import StrIpeCheckoutForm from './StrIpeCheckoutForm';
import styles from "../spectre.min.module.css";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

class CardPaymentMethod extends React.Component {
    render() {
        const { stripeCardModalOpen } = this.props;

        let className = cx({
            modal: true,
  
            active: stripeCardModalOpen,
        });

        return (
          <div className={className}>
            <a
              href="#close"
              onClick={() => this.props.onClose(false)}
              className={styles.modalOverlay}
              aria-label="Close"
            />
            <div className={styles.modalContainer}>
              <div className={styles.columns} style={{ margin: "1rem 0" }}>
                <div className={styles.modalHeader}>
                  <h5 className={styles.modalTitle}>Finish Subscription</h5>
                </div>
                <div
                  className={`${styles.column} ${styles.col12}`}
                  style={{ padding: "1rem" }}
                >
                  <Elements>
                    <StrIpeCheckoutForm
                    email={this.props.email}
                      onStripeToken={this.props.onStripeToken}
                    />
                  </Elements>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default CardPaymentMethod;