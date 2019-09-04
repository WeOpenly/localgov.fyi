import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import styles from "../spectre.min.module.css"
import expStyles from "../spectre-exp.min.module.css";

import iconStyles from '../typicons.min.module.css';
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";

import Account from '../../components/Dashboard/Account';
import Receipts from '../../components/Dashboard/Receipts';
import Services from '../../components/Dashboard/Services';
import Home from '../../components/Dashboard/Home';
import UserTypeChoice from "../../components/Dashboard/UserTypeChoice";
import Toast from '../../components/Toast';
import SideBar from '../../components/Dashboard/SideBar';
import AppBar from '../../components/Dashboard/AppBar';

import {logout} from '../../components/actions';


class OneDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          open: true,
        }
        this.logout = this.logout.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar(){
      this.setState({
        open: !this.state.open
      })
    }


    logout(){
        const {dispatch} = this.props;
        dispatch(logout())
    }

    render() {
       const {userDetailsLoading, userDetails, userDetailsLoadingFailed, isFirstTime, isBusiness, isIndividual} = this.props.oneUser;

        if (userDetailsLoading){
          return <div className={styles.loading} />;
        }

        const userTypeSet =
          (isBusiness || isIndividual) && !userDetailsLoading;

        if (!userTypeSet){
          return <UserTypeChoice />
        }

        const {displayName, photoURL} = userDetails;

        return (
          <Fragment>
            <Toast />
           
            <div
              className={`${expStyles.offCanvas} ${this.state.open ? `${expStyles.offCanvasSidebarShow}` : `${expStyles.offCanvasSidebar}`
                }`}
              style={{ height: "100vh" }}
            >
              <div
                className={`${expStyles.offCanvasSidebar}`}
                style={{
                  background: "#fff",
                  boxShadow: '0 0 1.5rem 0.3rem rgba(50,50,93,.04)',
                  minWidth: "12rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                
                <SideBar onMenuClick={this.toggleSidebar} open={this.state.open} displayName={displayName} photoURL={photoURL} onLogout={this.logout} />
              
              </div>
              <div
                className={`${expStyles.offCanvasContent}`}
                style={{
                  overflowY: 'scroll',
                  padding: "0rem 0rem 0.4rem 0rem",
                                background: "#f7f8f9"
                }}
              >
             
                <AppBar onMenuClick={this.toggleSidebar} showCrumbs={!this.state.open}/>

                <div
                  className={styles.container}
                  style={{ background: "#f7f8f9" }}
                >
                  <Router>
                    <Home path="/" />
                    <Account path="/account" logout={this.logout} />
                    <Services path="/services/*" />
                    <Receipts path="/receipts" />
                  </Router>
                </div>
              </div>
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