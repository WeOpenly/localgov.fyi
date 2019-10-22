import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Helmet from 'react-helmet';
import { Elements, StripeProvider } from 'react-stripe-elements';

import { Router, Route, navigate, Root } from "@reach/router";

import styles from "../components/spectre.min.module.css"
import FirebaseContext from '../common/firebase/context.js';



import getFirebse from '../common/firebase/firebase.js';
import { checkLogin} from '../components/User/actions';
import { fetchPackageDetails, fetchSpecificPackageDetails } from "../components/Landing/actions";

import OneHome from '../components/Landing/Home';


const windowGlobal = typeof window !== "undefined" && window;

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { authInProgress } = this.props.oneUser;
        const { fetching } = this.props.oneService;

        if (authInProgress || fetching) {
          return <div className={styles.loading}></div>;
        }
        
        return (
            <Fragment>
                <Helmet>
                    <title>{`papergov One`}
                    </title>
                </Helmet>
                <FirebaseContext.Provider value={getFirebse}>
                    <OneHome />          
                </FirebaseContext.Provider>
            </Fragment>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
      oneService: state.oneServices,
      oneUser: state.oneUser
    };
};

export default connect(mapStateToProps)(Index);