import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { Router, Route, navigate, Root } from "@reach/router";

import styles from "../components/spectre.min.module.css"
import FirebaseContext from '../common/firebase/context.js';

import getFirebse from '../common/firebase/firebase.js';
import { checkLogin} from '../components/actions';
import OneHome from '../components/Home';


class OneIndex extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(checkLogin()); 
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
                    <OneHome/>          
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