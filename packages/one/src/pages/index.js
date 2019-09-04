import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { Router, Route, navigate } from "@reach/router";

import Footer from '../components/FooterNew';
import styles from "../components/spectre.min.module.css"
import FirebaseContext from '../common/firebase/context.js';
import Private from '../components/Private';
import getFirebse from '../common/firebase/firebase.js';
import { checkLogin} from '../components/actions';
import OneHome from '../components/Home';
import OneNotFound from '../components/NotFound';
import OneDashboard from './dashboard/index'

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
                             
                        <Private as={OneDashboard} path="/dashboard/*" />
                        <OneHome path="/" />
                    
                    </Router>
          
                </FirebaseContext.Provider>
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