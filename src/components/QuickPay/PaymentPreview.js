import React, { Component } from 'react';

import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import iconStyles from './typicons.min.module.css';
import currency from 'currency.js';
const windowGlobal = typeof window !== 'undefined' && window

import { finalizeSubmit, stepChange } from './actions';

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
    }

    componentDidMount(){
        if (windowGlobal){
            windowGlobal.scrollTo(0, 0)
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
            <form onSubmit={this.onSubmit}>
                <ul className={styles.menu} style={{padding: '16px 8px'}}>
                    <li className={styles.menuItem} style={{ display: 'flex', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold', paddingBottom: '32px' }}>        
                            Payment Summary
                    </li>
                    <li className={styles.menuItem} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div >
                            <span className={`${iconStyles.typcn} ${iconStyles.typcnCreditCard}`}></span>Amount to pay
                        </div>
                        
                        <div className={styles.menuItem}>
                         {`$`}{price}
                        </div>
                    </li>
                    <li className={styles.divider}></li>
                    <li className={styles.menuItem} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div >
                            <span className={`${iconStyles.typcn} ${iconStyles.typcnTime}`}></span>Estimated wait
                        </div>

                        <div className={styles.menuItem}>
                            Less then a day
                        </div>
                    </li>
                    <li className={styles.divider}></li>
                    <li className={styles.menuItem} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={`${styles.tooltip} ${styles.tooltipRight}`} data-tooltip="Evergov performs this on your behalf for a small fee">
                            <span className={`${iconStyles.typcn} ${iconStyles.typcnSupport}`}></span>Service Fee<sup><span className={`${iconStyles.typcn} ${iconStyles.typcnInfoLarge}`}></span></sup>
                        </div>

                        <div className={styles.menuItem}>
                            5%
                        </div>
                    </li>
                    <li className={styles.divider}></li>
 
          
                    <li className={styles.menuItem} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px' }}>
                        <div style={{fontWeight: 'bold'}}>
                            Total
                        </div>

                        <div className={styles.menuItem} style={{ fontWeight: 'bold' }}>
                            {'$'}{finalAmtShow}
                        </div>
                    </li>
                
                    <li className={styles.menuItem} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 8px 0 8px' }}>
                        <button style={{ marginTop: '16px', width: '100%', fontSize: '14px' }} className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} ${styles.textUppercase} ${styles.textBold}`} type="submit">   <span className={`${iconStyles.typcn} ${iconStyles.typcnThumbsUp}`}></span>Pay  {'$'}{finalAmtShow}</button>
                    </li>
                    <li className={styles.menuItem} style={{ display: 'flex', justifyContent: 'center', padding: '0px 8px', alignItems: 'center' }}>
                        <span className={`${iconStyles.typcn} ${iconStyles.typcnInfoLarge}`}></span><span style={{ fontSize: '14px' }}> You accept terms by cicking this</span>
                    </li>
                </ul>
            </form>

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