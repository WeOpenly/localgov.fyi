import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Link from "gatsby-link";

import Helmet from "react-helmet";
import { Elements, StripeProvider } from "react-stripe-elements";
import { returnToSnap } from "../components/actions";

import Hero from "../components/Landing/Hero";
import Landing from "../components/Landing";
import LandingDesktop from "../components/LandingDesktop";

import SubmitDetails from "../components/SubmitDetails";

import FinalConf from "../components/FinalConf";
import Footer from "../components/FooterNew";
import styles from "../components/spectre.min.module.css";
import FirebaseContext from "../common/firebase/context.js";
import getFirebse from "../common/firebase/firebase.js";
import { loginAnon } from "../components/actions";

const windowGlobal = typeof window !== "undefined" && window;

const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data)
    }}
  />
);

const RawHTML = ({ children, className = "" }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{
      __html: children.replace(/\n/g, " ")
    }}
  />
);

class ServiceTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stripe: null, width: windowGlobal.innerWidth };
    this.returnToSnap = this.returnToSnap.bind(this);
  }

  returnToSnap() {
    const { dispatch } = this.props;
    dispatch(returnToSnap());
  }

  componentWillMount() {
    const { dispatch } = this.props;
    if (windowGlobal) {
      dispatch(loginAnon());
      if (window.Stripe) {
        this.setState({ stripe: window.Stripe(process.env.GATSBY_STRIPE_KEY) });
      } else {
        document.querySelector("#stripe-js").addEventListener("load", () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({
            stripe: window.Stripe(process.env.GATSBY_STRIPE_KEY)
          });
        });
      }
    }
  }

  render() {
    const { title, name, uploadable, enable_subs, sub_packages } = this.props.pageContext.data;

    const { anonUserLoading, analyseInProgress } = this.props;

    let comp = <div className={styles.loading}></div>;
    const isMobile = this.state.width <= 500;

    if (anonUserLoading) {
      return comp;
    }

    const submitDetails = (
      <div className={styles.columns}>
        <div
          className={`${styles.column} ${styles.col12}`}
          style={{ minHeight: "600px" }}
        >
          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <SubmitDetails enable_subs={enable_subs} sub_packages={sub_packages} />
            </Elements>
          </StripeProvider>
        </div>
      </div>
    );

    const { step } = this.props;
    const tabs = (
      <ul className={styles.step} style={{ margin: "16px 0px" }}>
        <li
          className={`${styles.stepItem} ${
            step === "show_landing" ? styles.active : ""
          }`}
        >
          <a href="#" onClick={this.returnToSnap}>
            Snap
          </a>
        </li>
        <li
          className={`${styles.stepItem} ${
            step === "guess_price_and_update_details" ? styles.active : ""
          }`}
        >
          <a href="#">Details</a>
        </li>
        <li
          className={`${styles.stepItem} ${
            step === "show_submit_confirm" ? styles.active : ""
          }`}
        >
          <a href="#">Finish</a>
        </li>
      </ul>
    );

    let landing = (
      <Fragment>
        <Hero
          uploadable={uploadable}
          title={title}
          name={name}
          isMobile={isMobile}
        />
        <LandingDesktop uploadable={uploadable} name={name} />;
      </Fragment>
    );

    if (isMobile) {
      landing = (
        <Fragment>
          <Hero
            uploadable={uploadable}
            title={title}
            name={name}
            isMobile={isMobile}
          />
          <Landing uploadable={uploadable} name={name} />;
        </Fragment>
      );
    }

     
    return (
      <Fragment>
        <Helmet>
          <title>{`papergov Quickpay | ${title}`}</title>
        </Helmet>

        <div className={styles.columns}>
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div className={`${styles.column} ${styles.col10}`}>
            <header className={styles.navbar}>
              <section
                style={{ padding: "0.5rem 0" }}
                className={styles.navbarSection}
              >
                <Link to="/">
                  <a href="#" style={{ textDecoration: "none" }}>
                    <h3>
                      papergov
                      <sub
                        className={styles.textUppercase}
                        style={{
                          color: "#455060",
                          fontSize: "0.5rem",
                          letterSpacing: "0.1rem",
                          fontWeight: "bold"
                        }}
                      >
                        QuickPay
                      </sub>
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
      

        <FirebaseContext.Provider value={getFirebse}>
          <div className={`${styles.container} ${styles.gridLg}`}>
            {step === "show_landing" || step === "final_conf" ? null : (
              <div className={`${styles.columns} ${styles.col12}`}>{tabs}</div>
            )}
            {step === "show_landing" ? landing : null}
            {step === "guess_price_and_update_details" ||
            step === "show_submit_confirm"
              ? submitDetails
              : null}
            {step === "final_conf" ? <FinalConf /> : null}

            <div className={`${styles.column} ${styles.col12}`}>
              <Footer isMobile={true} />
            </div>
          </div>
        </FirebaseContext.Provider>
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.quickPay,
    ...ownProps
  };
};

export default connect(mapStateToProps)(ServiceTemplate);
