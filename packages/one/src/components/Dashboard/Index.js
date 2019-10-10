import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import styles from "../../components/spectre.min.module.css"
import expStyles from "../../components/spectre-exp.min.module.css";

import { Router, Link } from "@reach/router";
import Account from './Account';
import Receipts from './Receipts';

import ManageServices from "./ManageServices";

import Toast from '../Toast';
import SideBar from './SideBar';
import AppBar from './AppBar';
import FAQs from "./FAQs";
import OnboardingServices from "./OnboardingServices";

import { logout } from "../../components/User/actions";
import {setLandingUserType, setLandingPlan} from '../../components/User/actions';
import {toggleSidebar} from './actions';

import Home from './Home';

const windowGlobal = typeof window !== "undefined" && window;


class OneDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar(toggle) {
      console.log('here')
       const {dispatch} = this.props;
       dispatch(toggleSidebar(toggle));
    }


    logout() {
        const { dispatch } = this.props;
        dispatch(logout())
    }

    render() {
        const {
          authInProgress,
          details,
        } = this.props.oneUser;

        const {openSideBar} = this.props.dashboard;

        if (authInProgress) {
          return <div className={styles.loading} />;
        }

        const { displayName, photoURL } = details;

        return (
          <Fragment>
            <Toast />

            <div>
              <SideBar
                onMenuClick={this.toggleSidebar}
                open={openSideBar}
                displayName={displayName}
                photoURL={photoURL}
                onLogout={this.logout}
              />
                <AppBar
                  onMenuClick={this.toggleSidebar}
                  showCrumbs={!openSideBar}
                />
                <Router>
                  <Home path="/" />
                  <OnboardingServices path="/onboard/*" />
                  <Account path="/account" logout={this.logout} />
                  <ManageServices path="/services/*" />
                  <Receipts path="/receipts" />
                  <FAQs path="/faqs" />
                </Router>
            </div>
          </Fragment>
        );
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        dashboard: state.dashboard,
        oneUser: state.oneUser,
        oneServices: state.oneServices
    };
};

export default connect(mapStateToProps)(OneDashboard);