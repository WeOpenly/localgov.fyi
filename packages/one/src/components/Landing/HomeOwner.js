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

import IndexHeroIl from '../../illus/IndexHero.js';
import ThibautTesti from "../../illus/ThibautTesti.js";
import HelenTesti from "../../illus/HelenTesti.js";
import AboutIl from "../../svgIcons/AboutIl.js";

import Hero from './Hero';
import FeatureCard from './Feature';
import GetStarted from "./GetStarted";
import WeOffer from "./WeOffer";
import GetInTouch from "./GetInTouch";
import Pricing from "./Pricing";
import Testimony from './Testimony';

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


class LandingStartup extends React.Component {
  constructor(props) {
    super(props);
    this.loginGoog = this.loginGoog.bind(this);
    this.state = {
      email: ""
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.loginGoogWplan = this.loginGoogWplan.bind(this);
  }

  changeEmail(ev) {
    this.setState({
      email: ev.target.value
    });
  }

  loginGoogWplan(plan, userType, planDuration) {
    const { dispatch } = this.props;

     if (windowGlobal) {
       if (plan) {
         windowGlobal.localStorage.setItem("plan", plan);
       }
       if (planDuration) {
         windowGlobal.localStorage.setItem("planDuration", planDuration);
       }
       if (userType) {
         windowGlobal.localStorage.setItem("package", userType);
       }
     }
     dispatch(loginGoog(this.state.email));
  }

  loginGoog() {
    const { dispatch } = this.props;
    if (windowGlobal) {
      windowGlobal.localStorage.setItem("package", "ho");
    }
    dispatch(loginGoog(this.state.email));
  }

  render() {
    const { authInProgress } = this.props.oneUser;
    const {
      fetching: allSerFetching,
      failed: allSersFailed,
      sers,
      plans
    } = this.props.oneService;

    const faqs = [
      {
        q: "Can you handle other services what were listed above?",
        a:
          "<p>Yes. If it’s not in the list above, you can reach out to us once you create your account using the support option in your dashboard.</p>"
      },
      {
        q: "Do I need to connect my bank account?",
        a:
          "<p>We offer different payment options including credit card payment & different transfer by linking your account. You can choose what suits your case best.</p>"
      },
      {
        q: "Can you help me with single payments for things like tickets?",
        a:
          "<p>Sure, try out lightning fast payment service <a href='https://pay.papergov.com'>here</a></p>"
      }
    ];

    const faqComps = faqs.map((faq, idx) => {
      return (
        <FaqItem header={faq.q} name={`home-faq-${idx}`} description={faq.a} />
      );
    });

    return (
      <Fragment>
        <div className={`${styles.container} ${styles.gridXl}`}>
          <Hero
            heroTitle="Your home bills on autopilot"
            heroSubtitle="We make it seamless to manage your bills, notices & make auto payments in a single place."
            illustration={<IndexHeroIl />}
            uthInProgress={authInProgress}
            onGetStartedClick={this.loginGoog}
          />
          <div
            className={`${styles.columns}`}
            style={{ margin: "4rem 0 4rem 0" }}
          >
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col10}`}>
              <div
                className={`${styles.columns}`}
                style={{ margin: "4rem 0 4rem 0" }}
              >
                <div
                  className={`${styles.column} ${styles.colSm4} ${styles.colXs12}`}
                >
                  <FeatureCard
                    icon={
                      <span
                        style={{
                          background: "#fff",
                          color: "#ffd367",

                          fontSize: "1.2rem",
                          padding: "0.2rem 0",
                          borderRadius: "0.3rem"
                        }}
                        className={`${iconStyles.typcn} ${iconStyles.typcnFlashOutline}`}
                      ></span>
                    }
                    heading={"Simple"}
                    description="One account for all services & no more sending in paper checks or creating multiple accounts for each service to pay your bills"
                  />
                </div>

                <div
                  className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
                >
                  <FeatureCard
                    icon={
                      <span
                        style={{
                          background: "#fff",
                          color: "#3500f3",

                          fontSize: "1.2rem",
                          padding: "0.2rem 0",
                          borderRadius: "0.3rem"
                        }}
                        className={`${iconStyles.typcn} ${iconStyles.typcnInfinity}`}
                      ></span>
                    }
                    heading={"Savings"}
                    description="Say goodbye to late fees. Our automated system keeps track of your bills and handles them all for you"
                  />
                </div>

                <div
                  className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
                >
                  <FeatureCard
                    icon={
                      <span
                        style={{
                          background: "#fff",
                          color: "#30ae40",

                          fontSize: "1.2rem",
                          padding: "0.2rem 0",
                          borderRadius: "0.3rem"
                        }}
                        className={`${iconStyles.typcn} ${iconStyles.typcnLockClosedOutline}`}
                      ></span>
                    }
                    heading={"Secure"}
                    description="We deeply care about user privacy and data. We don’t sell your data & we use industry-standard encryption for all transactions"
                  />
                </div>
              </div>
            </div>
          </div>
          <GetStarted />

          <WeOffer packName="ho" services={sers} loading={allSerFetching} />

          <Pricing
            loading={allSerFetching}
            plans={plans}
            showHeading={true}
            failed={allSersFailed}
            packName="ho"
            onSelectPlan={this.loginGoogWplan}
          />
          <div
            className={`${styles.columns}`}
            style={{ margin: "4rem 0 4rem 0" }}
          >
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col10}`}>
              <div
                className={`${styles.columns}`}
                style={{
                  margin: "0rem 0 2rem 0"
                }}
              >
                <div className={`${styles.column} ${styles.col2}`} />
                <div className={`${styles.column}  ${styles.col8}`}>
                  <div className={styles.textCenter}>
                    <h3> Love for Papergov </h3>
                  </div>
                </div>
                <div className={`${styles.column} ${styles.col2}`} />
              </div>
              <div className={`${styles.columns}`}>
                <div
                  className={`${styles.column} ${styles.colSm4} ${styles.colXs12}`}
                >
                  <Testimony
                    picture={
                      <ThibautTesti style={{ width: "72px", height: "72px" }} />
                    }
                    comment={
                      <div>
                        I have automated paying my utility bills through
                        Papergov. &nbsp;
                        <b>
                          I know that wherever I move, I can trust Papergov to
                          be my user-friendly interface to the government!
                        </b>
                      </div>
                    }
                    userName="Thibaut Labarre"
                    userDesc=""
                  />
                </div>
                <div
                  className={`${styles.column} ${styles.colSm6} ${styles.colXs12}`}
                >
                  <Testimony
                    picture={
                      <HelenTesti style={{ width: "72px", height: "72px" }} />
                    }
                    comment={
                      <div>
                        I hate the bills that come in months before they are due
                        because I lose the paper bills and almost miss the due
                        dates, especially car registration and property taxes.
                        &nbsp;
                        <b>
                          With Papergov, I just snap a picture of the bill and
                          forget about it. Papergov makes sure I pay on time and
                          reminds me that it is about to make the payment
                        </b>
                      </div>
                    }
                    userName="Helen Shaughnessy"
                    userDesc=""
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>

          <div
            className={`${styles.columns}`}
            style={{
              margin: "6rem 0 2rem 0",
              padding: "2.5rem 0.5rem",
              background: "#f7f8f9"
            }}
          >
            <GetInTouch />
          </div>

          <div
            className={`${styles.columns}`}
            style={{
              margin: "6rem 0 1rem 0",
              padding: "2.5rem 0.5rem"
            }}
          >
            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
            <div
              className={`${styles.column} ${styles.col8} ${styles.colXs12} ${styles.textCenter}`}
            >
              <div>
                <h3>FAQs</h3>
              </div>
            </div>

            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
          </div>
          <div
            className={`${styles.columns}`}
            style={{
              margin: "0rem 0 8rem 0",
              padding: "0.5rem 0.5rem"
            }}
          >
            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
            <div
              className={`${styles.column} ${styles.col8} ${styles.colXs12} ${styles.textLeft}`}
            >
              {faqComps}
            </div>

            <div
              className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
            />
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

export default connect(mapStateToProps)(LandingStartup);