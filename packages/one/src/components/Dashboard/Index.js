import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import styles from "../../components/spectre.min.module.css"
import expStyles from "../../components/spectre-exp.min.module.css";

import { Router, Link } from "@reach/router";
import Account from './Account';
import Receipts from './Receipts';
import Services from './Services';
import ManageServices from "./ManageServices";

import UserTypeChoice from "./UserTypeChoice";
import Toast from '../Toast';
import SideBar from './SideBar';
import AppBar from './AppBar';
import FAQs from "./FAQs";

import { logout } from '../../components/actions';
import {setLandingUserType, setLandingPlan, toggleSidebar} from '../../components/actions';
import Home from './Home';

const windowGlobal = typeof window !== "undefined" && window;


class OneDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    componentDidMount(){
        const {dispatch} = this.props;
 
        if(windowGlobal){
            const userType = windowGlobal.localStorage.getItem("userType");
            const plan = windowGlobal.localStorage.getItem("plan");

            if(userType){
                dispatch(setLandingUserType(userType));
            }
            if(plan){
                dispatch(setLandingPlan(plan));
            }
        }
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
          userDetailsLoading,
          userDetails,
          userDetailsLoadingFailed,
          isFirstTime,
          isBusiness,
          isIndividual,
          openSideBar,
          landingPlan,
          landingType
        } = this.props.oneUser;

        if (userDetailsLoading) {
            return <div className={styles.loading} />;
        }


        const userTypeSet =
            (isBusiness || isIndividual) && !userDetailsLoading;
        const landUserTypeSet = landingType && !userDetailsLoading;

        if (!userTypeSet) {
            if (!landUserTypeSet) {
                return <UserTypeChoice />;
            }
        }

        const { displayName, photoURL } = userDetails;

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
                  <Account path="/account" logout={this.logout} />
                  <ManageServices path="/services/*" />
                  <Services path="/onboard/*" />
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
        oneUser: state.oneUser,
        oneServices: state.oneServices
    };
};

export default connect(mapStateToProps)(OneDashboard);