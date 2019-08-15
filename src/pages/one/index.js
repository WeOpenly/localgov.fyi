import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { returnToSnap } from '../../components/QuickPay/actions'
import { Router } from "@reach/router";
import Landing from '../../components/QuickPay/Landing'
import SubmitDetails from '../../components/QuickPay/SubmitDetails'
import FinalConf from '../../components/QuickPay/FinalConf'
import Footer from '../../components/Footer';
import styles from "../../components/One/spectre.min.module.css"
import FirebaseContext from '../../components/common/firebase/context.js';
import getFirebse from '../../components/common/firebase/firebase.js';
import { loginAnon } from '../../components/QuickPay/actions';
import OneHome from '../../components/One/Home';
import OneNotFound from '../../components/One/NotFound';

const windowGlobal = typeof window !== 'undefined' && window


class OneIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { stripe: null };
        this.returnToSnap = this.returnToSnap.bind(this);
    }

    returnToSnap() {
        const { dispatch } = this.props;
        dispatch(returnToSnap());
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(loginAnon());
        if (windowGlobal) {
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

        if (anonUserLoading) {
            return comp
        }


        const submitDetails = (<div className={styles.columns}>
            <div className={`${styles.column} ${styles.col12}`} style={{ minHeight: '600px' }}>
                <StripeProvider stripe={this.state.stripe}>
                    <Elements>
                        <SubmitDetails />
                    </Elements>
                </StripeProvider>
            </div>
        </div>)


        const { step } = this.props;
        const tabs = (

            <ul className={styles.step} style={{ margin: '16px 0px' }}>
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

        return (
            <Fragment>
                <Helmet>
                    <title>{`Evergov One`}
                    </title>
                </Helmet>

                <header className={styles.navbar} style={{ background: '#fff', padding: '4px 2px', boxShadow: '0 2px 4px rgba(50,50,93,.11)' }}>
                    <section className={styles.navbarSection}>
                        <a href="/" style={{ fontSize: '22px' }} className={`${styles.btn} ${styles.btnLink} ${styles.h1}`}>evergov</a><sub className={styles.textUppercase} style={{ fontSize: '9px', paddingTop: '4px', letterSpacing: '0.1rem', fontWeight: 'bold' }} >One</sub>
                    </section>

                    <section className={styles.navbarSection}>
                        <a href="/" style={{ fontSize: '14px' }} className={`${styles.btn} ${styles.btnLink}`}>Terms</a>
                        <a href="/" style={{ fontSize: '14px' }} className={`${styles.btn} ${styles.btnLink}`}>Privacy</a>
                    </section>
                </header>
                
                <FirebaseContext.Provider value={getFirebse}>
                    <Router>
                        <OneNotFound default />
                        <OneHome path="/one" />
                    </Router>
          
                </FirebaseContext.Provider>
                <div className={`${styles.column} ${styles.col12}`}>
                    <Footer isMobile={true} />
                </div>
            </Fragment>
        )
    }
}



const mapStateToProps = function (state, ownProps) {
    return {
        ...state.quickPay
    };
};

export default connect(mapStateToProps)(OneIndex);