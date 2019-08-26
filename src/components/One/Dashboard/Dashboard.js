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

import Account from './Account';
import Receipts from './Receipts';
import Services from './Services';
import Home from './Home';
import UserTypeChoice from "./UserTypeChoice";

import {logout} from '../actions';


class OneDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
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
            <div
              className={`${expStyles.offCanvas} ${
                expStyles.offCanvasSidebarShow
              }`}
              style={{ height: "100vh" }}
            >
              <div
                className={`${expStyles.offCanvasSidebar} `}
                style={{
                  background: "#fff",
                  boxShadow: '0 0 0.1rem .1rem rgba(50,50,93,.04)',
                  minWidth: "4rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around"
                }}
              >
                <div>
                  <div className={`${expStyles.nav}`}>
                    <Link className={`${expStyles.navItem}`} to="/one/dashboard" getProps={({ isCurrent }) => {
                      // the object returned here is passed to the
                      // anchor element's props
                      return {
                        style: {
                          color: isCurrent ? "#455060" : "#3500f3"
                        }
                      };
                    }}>
                      <span
                        className={`${iconStyles.typcn} ${
                          iconStyles.typcnHomeOutline
                        }`}
                        style={{
                          fontSize: "1.1rem",
                          cursor: "pointer"
                        }}
                      />
                    </Link>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <Link to="services" className={`${expStyles.navItem}`} getProps={({ isPartiallyCurrent }) => {
                      // the object returned here is passed to the
                      // anchor element's props
                      return {
                        style: {
                          color: isPartiallyCurrent ? "#455060" : "#3500f3"
                        }
                      };
              }}>
                      <span
                        className={`${iconStyles.typcn} ${
                          iconStyles.typcnPuzzle
                        }`}
                        style={{
                          fontSize: "1.1rem",
                          cursor: "pointer"
                        }}
                      />
                    </Link>
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <Link to="receipts" className={`${expStyles.navItem}`}  getProps={({ isCurrent }) => {
                      // the object returned here is passed to the
                      // anchor element's props
                      return {
                        style: {
                          color: isCurrent ? "#455060" : "#3500f3"
                        }
                      };
                    }}>
                      <span
                        className={`${iconStyles.typcn} ${
                          iconStyles.typcnDocumentText
                        }`}
                        style={{
                          fontSize: "1.1rem",
                          cursor: "pointer",
                
                        }}
                      />
                    </Link>
                  </div>
                </div>
                <div
                  style={{
                    borderTop: "1px solid rgba(50,50,93,.04)",
                    marginTop: "16px",
                    paddingTop: "16px"
                  }}
                >
                  <div>
                    <span
                      className={`${iconStyles.typcn} ${
                        iconStyles.typcnSupport
                      }`}
                      style={{ fontSize: "1rem", cursor: "pointer" }}
                    />
                  </div>
                  <div>
                    <span
                      className={`${iconStyles.typcn} ${
                        iconStyles.typcnMessages
                      }`}
                      style={{ fontSize: "1rem", cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`${expStyles.offCanvasContent}`}
                style={{
                  overflowY: 'scroll',
                  padding: "0rem 0rem 0.4rem 0rem",
                                background: "#f7f8f9"
                }}
              >
                <header
                  className={styles.navbar}
                  style={{
                    background: "#fff",
                    padding: "12px 16px",
                    boxShadow: '0 0 0.3rem .1rem rgba(50,50,93,.04)',
                  }}
                >
                  <section className={styles.navbarSection}>
                    <h6>
                      <a
                        href="/one"
                        
                      style={{ fontSize: "1.2rem", color:"#3500f3" }}
                        className={`${
                          styles.h1
                          }`}
                      >
                        evergov  <sub
                          className={styles.textUppercase}
                          style={{
                            color: '#455060',
                            fontSize: "0.5rem",
                            paddingTop: "4px",
                            letterSpacing: "0.1rem",
                            fontWeight: "bold"
                          }}
                        >
                          One
                    </sub>
                    </a>
                      </h6>
                   
                  </section>

                  <section className={styles.navbarSection}>
                    <div
                      className={`${styles.tile} ${
                        styles.tileCentered
                      }`}
                    >
                      <div className={`${styles.tileIcon} `}>
                        <figure
                          className={`${styles.avatar} ${
                            styles.avatarSm
                          }`}
                          data-initial="YB"
                          style={{ backgroundColor: "#5755d9" }}
                        >
                          <img src={photoURL} alt="..." />
                        </figure>
                      </div>
                      <div className={styles.tileContent}>
                        {displayName}
                      </div>
                    </div>
                    <div className={`${styles.dropdown} ${styles.dropdownRight}`}>
                      <a href="#" className={`${styles.dropdownToggle}`} >
                        <span
                          className={`${iconStyles.typcn} ${
                            iconStyles.typcnUser
                            }`}
                          style={{
                            margin: '1rem 0.5rem 0 1rem', 
                            cursor: "pointer"
                          }}
                        />
                        </a>
                      <ul className={styles.menu}>
                        <li className={styles.menuItem}>

                          <Link to="account" >
                            Account
                          </Link>
                        </li>
                        <li className={styles.menuItem}>
                          
                          <a
                          style={{cursor: 'pointer'}}
                            onClick={this.logout}
                          >
                            Log out
                          </a>
                        </li>
                     
                      </ul>
                  </div>
       
                  </section>
                </header>
                <div
                  className={styles.container}
                  style={{ background: "#f7f8f9" }}
                >
                  <Router>
                    <Home path="/" />
                    <Account path="/account" />
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