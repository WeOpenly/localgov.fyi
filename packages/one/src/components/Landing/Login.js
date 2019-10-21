import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import styles from "../spectre.min.module.css"
import iconStyles from '../typicons.min.module.css';

import Footer from "../FooterNew";
import Link from 'gatsby-link';
import TextLoop from "react-text-loop";
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";

import CreateAccount from "../../illus/CreateAccount.js";
import AddDetails from "../../illus/AddDetails.js";
import Relax from "../../illus/Relax.js";


import { loginGoog } from "../User/actions";


const windowGlobal = typeof window !== "undefined" && window;


const FaqItem = props => (
  <Fragment key={props.name}>
    <div key={props.name} className={styles.accordion}>
      <input type="checkbox" id={props.name} name={props.name} hidden />
      <label className={styles.accordionHeader} htmlFor={props.name}>
        <h5>
          {" "}
          {props.header}
          <span
            className={`${iconStyles.typcn} ${iconStyles.typcnChevronRight}`}
          />
        </h5>
      </label>
      <div className={styles.accordionBody}>
        <div style={{ padding: "0.5rem 0.5rem" }}
           dangerouslySetInnerHTML={{__html: props.description}}>
        </div>
      </div>
    </div>

    <div className={styles.divider} />
  </Fragment>
);


class LandingHome extends React.Component {
    constructor(props) {
        super(props);
        this.loginGoog = this.loginGoog.bind(this);
        this.state = {
          email: ''
        }
        this.changeEmail = this.changeEmail.bind(this);
    }

    

    changeEmail(ev){
      this.setState({
        email: ev.target.value
      })
    }

    loginGoog(plan, userType){
        const {dispatch} = this.props;

        if(windowGlobal){
          if (plan){
            windowGlobal.localStorage.setItem("plan", plan);
          }
          if(userType){
            windowGlobal.localStorage.setItem("package", userType);
          }
        }
        dispatch(loginGoog(this.state.email));
    }

    render() {
        const { authInProgress } = this.props.oneUser;
   
        return (
          <Fragment>
            <div className={`${styles.container} ${styles.gridXl}`}>
              <div className={styles.columns}>
                <div className={`${styles.column} ${styles.col1}`}></div>
                <div className={`${styles.column} ${styles.col10}`}>
                  <header className={styles.navbar}>
                    <section
                      style={{ padding: "0.5rem" }}
                      className={styles.navbarSection}
                    >
                      <Link to="/">
                        <a href="#" style={{ textDecoration: "none" }}>
                          <h3>
                            {" "}
                            papergov{" "}
                            <sub
                              className={styles.textUppercase}
                              style={{
                                color: "#455060",
                                fontSize: "0.5rem",
                                paddingTop: "4px",
                                letterSpacing: "0.1rem",
                                fontWeight: "bold"
                              }}
                            >
                              One
                            </sub>{" "}
                          </h3>
                        </a>
                      </Link>
                    </section>

                    <section className={styles.navbarSection}>
                      <a
                        href={`https://papergov.com/terms`}
                        style={{ padding: "0.5rem" }}
                        target="_blank"
                      >
                        Terms
                      </a>

                      <a
                        href={`https://papergov.com/privacy`}
                        style={{ padding: "0.5rem" }}
                        target="_blank"
                      >
                        Privacy
                      </a>
                    </section>
                  </header>
                </div>
                <div className={`${styles.column} ${styles.col1}`}></div>
              </div>
              <div
                className={`${styles.columns}`}
                style={{ margin: "4rem 2rem" }}
              >
                <div
                  className={`${styles.column} ${styles.colSm12} ${styles.textCenter}`}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "40px",
                      marginBottom: "240px"
                    }}
                  >
                    <h2
                      style={{
                        margin: "1rem 1rem 1rem 0",
                        lineHeight: "2.5rem"
                      }}
                    >
                      Login to your papergov Account
                    </h2>
                    <div style={{ maxWidth: "400px" }}>
                      {authInProgress ? (
                        <div className={styles.loading} />
                      ) : (
                        <button type="button" onClick={this.loginGoog} className={styles.googlebutton}>
                          <span className={styles.googlebutton__icon}>
                            <svg
                              viewBox="0 0 366 372"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                                id="Shape"
                                fill="#EA4335"
                              />
                              <path
                                d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                                id="Shape"
                                fill="#FBBC05"
                              />
                              <path
                                d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                                id="Shape"
                                fill="#4285F4"
                              />
                              <path
                                d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                                fill="#34A853"
                              />
                            </svg>
                          </span>
                          <span className={styles.googlebutton__text}>
                            Sign in with Google
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.columns} style={{ marginTop: "1rem" }}>
                <div className={`${styles.column} ${styles.col2}`} />
                <div className={`${styles.column} ${styles.col8}`}>
                  <div className={styles.divider} />
                  <Footer isMobile={true} />
                </div>
                <div className={`${styles.column} ${styles.col2}`} />
              </div>
            </div>
          </Fragment>
        );
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
      oneUser: state.oneUser,
      oneService: state.oneServices,
    };
};

export default connect(mapStateToProps)(LandingHome);