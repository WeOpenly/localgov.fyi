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

import AboutIl from "../../svgIcons/AboutIl.js";
import ObservrTesti from "../../illus/ObservrTesti.js"
import EthoTesti from '../../illus/EthoTesti.js';

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
      windowGlobal.localStorage.setItem("package", "starter");
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
            heroTitle="Compliance on autopilot"
            heroSubtitle="We take care of your filings, notices & more from start to finish so you can focus 100% on making your business succeed."
            illustration={<AboutIl />}
            uthInProgress={authInProgress}
            onGetStartedClick={this.loginGoog}
          />

          <div
            className={`${styles.columns}`}
            style={{ margin: "4rem 0 4rem 0" }}
          >
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col10}`}>
              <div className={`${styles.columns}`}>
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
                    heading={"We do the heavy lifting"}
                    description="We figure out & do all the necessary filings automatically required for your business online and keep track of them"
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
                    heading={"Saves you time"}
                    description="Dealing with government agencies is no fun & we take care of these redundant processes so that you focus on your business"
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
                    heading={"Your Trusted Partner"}
                    description="We work with experts for all your compliance needs so that you are always on top of these & have no surprises coming your ways"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>
          <GetStarted />

          <WeOffer
            packName="starter"
            services={sers}
            loading={allSerFetching}
          />

          <Pricing
            loading={allSerFetching}
            plans={plans}
            showHeading={true}
            failed={allSersFailed}
            packName="starter"
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
                      <ObservrTesti style={{ width: "72px", height: "72px" }} />
                    }
                    comment={
                      <div>
                        Throughout a startup lifecycle, you accumulate a ton of
                        reoccurring payments and fees that you can’t automate.
                        &nbsp;
                        <b>
                          Keeping track of these time-sensitive tasks is a
                          hassle and inevitably takes a ton of time away from
                          the productive business. Papergov has allowed me to
                          offload these tasks and virtually set them to autopay,
                          saving us both time and money!
                        </b>
                      </div>
                    }
                    userName="Lucas Toohey"
                    userDesc="CEO, Observr"
                  />
                </div>
                <div
                  className={`${styles.column} ${styles.colSm6} ${styles.colXs12}`}
                >
                  <Testimony
                    picture={
                      <EthoTesti style={{ width: "72px", height: "72px" }} />
                    }
                    comment={
                      <div>
                        Papergov has freed up 5 full days on my calendar that I
                        otherwise spent frustratingly circling the halls of
                        government offices to stay compliant. &nbsp;
                        <b>
                          They are bringing government services to the 21st
                          century by making these processes fast & simple
                        </b>
                      </div>
                    }
                    userName="Krishna Manda"
                    userDesc="CEO, Etho"
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