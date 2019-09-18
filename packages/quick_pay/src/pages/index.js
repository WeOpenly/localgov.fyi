import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import { Elements, StripeProvider } from 'react-stripe-elements';
import {returnToSnap} from '../components/actions'

import Landing from '../components/Landing'
import LandingDesktop from "../components/LandingDesktop";

import SubmitDetails from '../components/SubmitDetails'

import FinalConf from '../components/FinalConf'
import Footer from '../components/FooterNew';
import styles from "../components/spectre.min.module.css"
import FirebaseContext from '../common/firebase/context.js';
import getFirebse from '../common/firebase/firebase.js';
import { loginAnon } from '../components/actions';
const windowGlobal = typeof window !== 'undefined' && window


class QPIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { stripe: null, width: windowGlobal.innerWidth };
        this.returnToSnap = this.returnToSnap.bind(this);
    }
    
    returnToSnap(){
        const {dispatch} = this.props;
        dispatch(returnToSnap());
    }

    componentWillMount() {
        const {dispatch} = this.props;
        if (windowGlobal){
            dispatch(loginAnon());
            if (window.Stripe) {
                this.setState({ stripe: window.Stripe(process.env.GATSBY_STRIPE_KEY) });
            } else {
                document.querySelector('#stripe-js').addEventListener('load', () => {
                    // Create Stripe instance once Stripe.js loads
                    this.setState({ stripe: window.Stripe(process.env.GATSBY_STRIPE_KEY) });
                });
            }
        }
    
    }

    render() {
        const { anonUserLoading, analyseInProgress } = this.props;
        let comp = <div className={styles.loading}></div>
        const isMobile = this.state.width <= 500;

        if (anonUserLoading){
            return comp
        }

        
        const submitDetails = (<div className={styles.columns}>
            <div className={`${styles.column} ${styles.col12}`} style={{minHeight: '600px'}}>
                <StripeProvider stripe={this.state.stripe}>
                    <Elements>
                        <SubmitDetails />
                    </Elements>
                </StripeProvider>
            </div>
        </div>)

        
        const { step } = this.props;
        const tabs = (
          
                <ul className={styles.step} style={{margin: '16px 0px'}}>
                    <li className={`${styles.stepItem} ${step === 'show_landing' ? styles.active : ''}`}>
                        <a href="#" onClick={this.returnToSnap} >Snap</a>

                    </li>
                    <li className={`${styles.stepItem} ${step === 'guess_price_and_update_details' ? styles.active : ''}`}>
                        <a href="#" >Details</a>

                    </li>
                    <li className={`${styles.stepItem} ${step === 'show_submit_confirm' ? styles.active : ''}`}>
                        <a href="#">Finish</a>

                    </li>
                </ul>
    
        )
       
        let landing = <LandingDesktop />

        if (isMobile){
            landing = <Landing />
        }

        return (
          <Fragment>
            <Helmet>
              <title>{`Evergov Quickpay`}</title>
              <link
                rel="stylesheet"
                type="text/css"
                charset="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              />
            </Helmet>

            <header
              className={styles.navbar}
              style={{
                background: "#fff",
                padding: "4px 2px",
                boxShadow: "0 2px 4px rgba(50,50,93,.11)"
              }}
            >
              <section className={styles.navbarSection}>
                <a
                  href="/"
                  style={{ fontSize: "22px" }}
                  className={`${styles.btn} ${styles.btnLink} ${styles.h1}`}
                >
                  evergov
                </a>
                <sub
                  className={styles.textUppercase}
                  style={{
                    fontSize: "9px",
                    paddingTop: "4px",
                    letterSpacing: "0.1rem",
                    fontWeight: "bold"
                  }}
                >
                  Quick Pay
                </sub>
              </section>

              <section className={styles.navbarSection}>
                <a
                  href="/"
                  style={{ fontSize: "14px" }}
                  className={`${styles.btn} ${styles.btnLink}`}
                >
                  Terms
                </a>
                <a
                  href="/"
                  style={{ fontSize: "14px" }}
                  className={`${styles.btn} ${styles.btnLink}`}
                >
                  Privacy
                </a>
              </section>
            </header>
            <FirebaseContext.Provider value={getFirebse}>
              <div className={`${styles.container} ${styles.gridLg}`}>
                {step === "show_landing" || step === "final_conf" ? null : (
                  <div className={`${styles.columns} ${styles.col12}`}>
                    {tabs}
                  </div>
                )}
                {step === "show_landing" ? landing : null}
                {step === "guess_price_and_update_details" ||
                step === "show_submit_confirm"
                  ? submitDetails
                  : null}
                {step === "final_conf" ? <FinalConf /> : null}

                <div className={`${styles.column} ${styles.col12}`}>
                  <Footer isMobile={true} />
                </div>
              </div>
            </FirebaseContext.Provider>
          </Fragment>
        );
    }
}



const mapStateToProps = function (state, ownProps) {
    return {
        ...state.quickPay
    };
};

export default connect(mapStateToProps)(QPIndex);