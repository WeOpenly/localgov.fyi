import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Landing from './Landing'
import SubmitDetails from './SubmitDetails'
import FinalConf from './FinalConf'

import styles from "./spectre.min.module.css"
import FirebaseContext from './firebase/context'
import getFirebse from './firebase/firebase';
import { loginAnon} from './actions';
const windowGlobal = typeof window !== 'undefined' && window


class QPIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { stripe: null };
    }

    componentWillMount() {
        const {dispatch} = this.props;
         dispatch(loginAnon());
        if (windowGlobal){
            if (window.Stripe) {
                this.setState({ stripe: window.Stripe('pk_test_mfpTB8neHnQHt11iMoGrN9wX') });
            } else {
                document.querySelector('#stripe-js').addEventListener('load', () => {
                    // Create Stripe instance once Stripe.js loads
                    this.setState({ stripe: window.Stripe('pk_test_mfpTB8neHnQHt11iMoGrN9wX') });
                });
            }
        }
    
    }

    render() {
        const { anonUserLoading, analyseInProgress } = this.props;
        let comp = <div className={styles.loading}></div>

        if (anonUserLoading){
            return comp
        }

        
        const submitDetails = (<div className={styles.columns}>
            <div className={`${styles.column} ${styles.col12}`}>
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
                        <a href="#" >Snap</a>

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
                <title>{`Evergov Quickpay`}
                </title>
               
            </Helmet>

                <header className={styles.navbar} style={{ background: '#fff', padding: '4px 2px',boxShadow:'0 2px 4px rgba(50,50,93,.11)'}}>
                    <section className={styles.navbarSection}>
                        <a href="/" style={{ fontSize: '22px' }} class={`${styles.btn} ${styles.btnLink} ${styles.h1}`}>evergov</a><sub className={styles.textUppercase}  style={{ fontSize: '9px', paddingTop: '4px', letterSpacing: '0.1rem',fontWeight: 'bold' }} >Quick Pay</sub>
                    </section>
            
                    <section className={styles.navbarSection}>
                        <a href="/" style={{ fontSize: '14px' }} class={`${styles.btn} ${styles.btnLink}`}>Terms</a>
                        <a href="/" style={{ fontSize: '14px' }} class={`${styles.btn} ${styles.btnLink}`}>Privacy</a>
                    </section>
                </header>
            <FirebaseContext.Provider value={getFirebse}>
                <div className={`${styles.container} ${styles.gridLg}`}>
                        {(step === 'show_landing' || step === 'final_conf') ? null : (<div className={`${styles.columns} ${styles.col12}`} >
                            {tabs}
                        </div>)}
                    {
                        step === 'show_landing' ? (<div className={styles.columns}>
                            <div className={`${styles.column} ${styles.col12}`}>
                                    <Landing />
                            </div>
                        </div>) : null
                    }
                    {
                        (step === 'guess_price_and_update_details' || step === 'show_submit_confirm')  ? submitDetails : null
                    }
                    {
                        (step === 'final_conf') ? <FinalConf /> : null
                    }
                </div>
            </FirebaseContext.Provider>
            </Fragment>
        )
    }
}



const mapStateToProps = function (state, ownProps) {
    return {
        ...state.quickPay
    };
};

export default connect(mapStateToProps)(QPIndex);