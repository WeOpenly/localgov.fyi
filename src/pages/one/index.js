import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { returnToSnap } from '../../components/QuickPay/actions'
import { Router, navigate } from "@reach/router";

import Footer from '../../components/Footer';
import styles from "../../components/One/spectre.min.module.css"
import FirebaseContext from '../../components/common/firebase/context.js';
import getFirebse from '../../components/common/firebase/firebase.js';
import { checkLogin} from '../../components/One/actions';
import OneHome from '../../components/One/Home';
import OneNotFound from '../../components/One/NotFound';
import OneDashboard from '../../components/One/Dashboard'

const windowGlobal = typeof window !== 'undefined' && window


class OneIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { stripe: null };
    }


    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(checkLogin())
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

    componentWillReceiveProps(nextProps){
        const { dispatch, loginCheckInProgress, loginInProgress, isLoggedIn} = this.props;
        if (!isLoggedIn && nextProps.isLoggedIn){
            navigate(`/one/dashboard`)
        }
        if (!isLoggedIn && !loginInProgress && !loginCheckInProgress && !nextProps.isLoggedIn) {
            navigate(`/one`)
        }
    }

    render() {
        const { loginCheckInProgress } = this.props;
        if (loginCheckInProgress){
            return (<div className={styles.loading}></div>)
        }
        

        return (
            <Fragment>
                <Helmet>
                    <title>{`Evergov One`}
                    </title>
                </Helmet>
                <FirebaseContext.Provider value={getFirebse}>
                    <Router>
                        <OneNotFound default />
                        <OneDashboard path="/one/dashboard" />
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
        ...state.oneUser
    };
};

export default connect(mapStateToProps)(OneIndex);