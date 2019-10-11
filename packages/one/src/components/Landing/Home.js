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

import AboutIl from '../../svgIcons/AboutIl.js';
import PaymentPlans from '../Payment/PaymentPlans';

import { loginGoog } from "../User/actions";


const windowGlobal = typeof window !== "undefined" && window;

const GovTechSvg = props => (<svg id="Layer_1" style={{width: '150px'}} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="20 0 150 75"><defs></defs><title>GT Logo</title><path style={{ fill: '#d4d4d4'}} d="M48.83,55.64c0,4.4,1.93,5.28,4,5.28a3.82,3.82,0,0,0,3.09-1.32V57.54a3.2,3.2,0,0,1-1.76.5c-0.87,0-1.6-.31-1.6-2.07V43.08h3.24V40.44H52.55V31.79H52.07l-2.89,1.95,0,6.7h-1.9v2.65h1.57V55.64Zm12.88,5.26c3.47,0,5.35-1.68,5.35-5.51V54.61H64v0.63C64,57.38,63.1,58,62.19,58,60.5,58,60,56.85,60,53.32V51.26h6.72a23.12,23.12,0,0,0,.48-4.73c0-4.88-2.43-6.32-5.1-6.32-2.15,0-5.84.63-5.84,8.37v3.82c0,6,1.93,8.51,5.41,8.51M60,48.76V47.52c0-3.49.62-4.6,1.93-4.6s1.87,1.09,1.87,3.77c0,0.53,0,1.65-.06,2.07H60ZM73.6,60.91c3.37,0,5.07-1.68,5.07-5.51V54.61H75.46v0.63c0,2.13-.7,2.79-1.46,2.79-1.46,0-1.9-1.34-1.9-4.87V47.42c0-3.49.6-4.5,1.81-4.5s1.54,1.22,1.54,3.25v0.68h3a8.36,8.36,0,0,0,.25-2.19c0-3-1.9-4.46-4.65-4.46-2,0-5.69.63-5.69,8.37v3.82c0,5.74,1.84,8.51,5.25,8.51m6.58-.22H83.9V44.33A2.74,2.74,0,0,1,86,42.92c1.06,0,1.62.6,1.62,2.38V60.69h3.72V45.17c0-3.29-1.35-5-3.71-5a4.65,4.65,0,0,0-3.94,2L83.56,38.7v-7H83.14l-3,1.86V60.69Zm13.52,0h3.72V44.3a2.7,2.7,0,0,1,2.09-1.38c1.06,0,1.62.6,1.62,2.38V60.69h3.72V45.17c0-3.29-1.35-5-3.71-5a4.77,4.77,0,0,0-4.24,2.41v0l-0.34-2.16H93.7V60.69Zm18.6,0.22c2.34,0,5.57-1,5.57-8.91V48.82c0-8-3.13-8.62-5.56-8.62s-5.65.75-5.65,8.62V52c0,8,3,8.91,5.63,8.91m0-2.87c-1.4,0-1.93-1.25-1.93-5V48c0-3.79.53-5.09,1.93-5.09s1.81,1.3,1.81,5.09v5c0,3.79-.47,5-1.81,5m7.39,2.65h3.72v-29h-0.62l-3,2-0.06.11v27Zm11.2,0.22c2.34,0,5.57-1,5.57-8.91V48.82c0-8-3.13-8.62-5.56-8.62s-5.65.75-5.65,8.62V52c0,8,3,8.91,5.63,8.91m0-2.87c-1.4,0-1.93-1.25-1.93-5V48c0-3.79.53-5.09,1.93-5.09s1.81,1.3,1.81,5.09v5c0,3.79-.47,5-1.81,5m7.73,4a4.65,4.65,0,0,0-.19,1.18c0,3.19,2.18,4,4.85,4,4,0,5.65-2.85,5.65-7.37V40.42h-2.9l-0.34,2a3.69,3.69,0,0,0-3.5-2.2c-1.47,0-4.44.38-4.44,7v5.32c0,6.88,3,7.32,4.35,7.32a3.91,3.91,0,0,0,3.23-1.57v3.19c0,2.47-1,3-2.1,3-1.34,0-2-.66-2-2.4h-2.63ZM143.43,57c-1.09,0-1.88-.69-1.88-3.71V46.58c0-3,.78-3.66,1.87-3.66a2.17,2.17,0,0,1,1.87,1.49V55.48A2.07,2.07,0,0,1,143.43,57m7.66,7.63v2.28a5.68,5.68,0,0,0,2,.37c3.15,0,4.62-1.91,5.37-5.79l4.26-21H159l-1.72,11.21-0.43,3.87h-0.12l-0.62-3.87L154,40.44h-3.78L155,60.8c-0.12,2.87-1.66,4.1-3.91,3.78"></path><path className="cls-1" d="M147.79,37.58v-17c0-3.6-1.48-5.43-4-5.43a5.21,5.21,0,0,0-4.63,2.64v0l-0.37-2.36h-3.13V37.58h4.07V19.68A2.94,2.94,0,0,1,142,18.17c1.16,0,1.77.66,1.77,2.6V37.58h4.06Zm-13.85-10.3a25.27,25.27,0,0,0,.53-5.17c0-5.33-2.65-6.91-5.58-6.91-2.35,0-6.38.69-6.38,9.14v4.18c0,0.66,0,1.27.07,1.86h2v5.89a5,5,0,0,0,3.89,1.56c3.79,0,5.85-1.83,5.85-6V30.94h-3.39v0.69c0,2.33-.93,3.05-1.93,3.05-1.85,0-2.36-1.3-2.36-5.16V27.28h7.34Zm-3.2-5c0,0.58,0,1.8-.06,2.26H126.6V23.2c0-3.81.67-5,2.1-5s2,1.19,2,4.11m-9.56,8.87V20.63c0-3.6-1.48-5.43-4-5.43a5.15,5.15,0,0,0-4.52,2.51,3.54,3.54,0,0,0-3.57-2.51,5.15,5.15,0,0,0-4.6,2.64v0l-0.35-2.36H101V37.58H105V19.68a2.83,2.83,0,0,1,2.12-1.51c1.32,0,1.88.66,1.88,2.6V37.58h4.07V20.29c0-.19,0-0.39,0-0.58a2.88,2.88,0,0,1,2.15-1.54c1.32,0,1.88.66,1.88,2.6V37.58h1.57V32.81ZM95.33,37.58H99.4v-17c0-3.6-1.48-5.43-4-5.43a5.21,5.21,0,0,0-4.63,2.64v0l-0.37-2.36H87.22V37.58h4.07V19.68a2.94,2.94,0,0,1,2.28-1.51c1.16,0,1.77.66,1.77,2.6V37.58ZM85.74,22.51a11.47,11.47,0,0,0,.55-3c0-2.86-1.09-4.31-3.42-4.31-1.22,0-2.46.83-3.34,2.51l-0.35-2.25h-3V37.58h2.93V32.81l1.14-.76V19.36a1.85,1.85,0,0,1,1.58-1.19c0.6,0,1.08.5,1.08,2.28v2.06h2.83ZM74.53,27.28a25.2,25.2,0,0,0,.53-5.17c0-5.33-2.65-6.91-5.58-6.91-2.35,0-6.38.69-6.38,9.14v4.18c0,6.59,2.11,9.3,5.91,9.3s5.85-1.83,5.85-6V30.94H71.48v0.69c0,2.33-.93,3.05-1.93,3.05-1.85,0-2.36-1.3-2.36-5.16V27.28h7.34Zm-3.2-5c0,0.58,0,1.8-.06,2.26H67.19V23.2c0-3.81.68-5,2.11-5s2,1.19,2,4.11M58.57,37.58l5-22.13H59.69L57.57,27.22,57,31.92H56.83L56.3,27.22,54.16,15.45h-4l5,22.13h3.47Zm-7.92-13c0-8.71-3.42-9.42-6.07-9.42s-6.17.82-6.17,9.42v3.47c0,8.74,3.33,9.74,6.15,9.74A5.24,5.24,0,0,0,48,36.69V32.84l2.42-1.62a23.72,23.72,0,0,0,.19-3.14V24.61Zm-4.08,4.56c0,4.15-.51,5.51-2,5.51s-2.11-1.37-2.11-5.51V23.73c0-4.15.58-5.56,2.11-5.56s2,1.41,2,5.56v5.45Zm-9.21,7.51V15.44H34.19l-0.37,2.18A4,4,0,0,0,30,15.21c-1.61,0-4.85.42-4.85,7.62v5.82c0,7.52,3.26,8,4.76,8a4.27,4.27,0,0,0,3.54-1.72v3.49c0,2.7-1.09,3.29-2.3,3.29C29.68,41.71,29,41,29,39.09H26.09a5.09,5.09,0,0,0-.21,1.28c0,3.49,2.38,4.35,5.3,4.35,4.32,0,6.17-3.12,6.17-8m-4-4.79a2.26,2.26,0,0,1-2,1.61c-1.19,0-2.06-.76-2.06-4V22.17c0-3.31.85-4,2-4a2.37,2.37,0,0,1,2,1.62v12.1Z"></path><path className="cls-1" d="M150.36,32.4c0,4.4,1.93,5.28,4,5.28a3.82,3.82,0,0,0,3.09-1.32V34.3a3.2,3.2,0,0,1-1.76.5c-0.87,0-1.6-.31-1.6-2.07V19.84h3.24V17.19h-3.24V8.54H153.6l-2.89,1.95,0,6.7h-1.9v2.65h1.57V32.4Z"></path></svg>)


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
        this.loginGoogWplan = this.loginGoogWplan.bind(this);
    }

    changeEmail(ev){
      this.setState({
        email: ev.target.value
      })
    }

    loginGoogWplan(plan, userType){
       const { dispatch } = this.props;

       if (windowGlobal) {
         if (plan) {
           windowGlobal.localStorage.setItem("plan", plan);
         }
         if (userType) {
           windowGlobal.localStorage.setItem("package", userType);
         }
       }
       dispatch(loginGoog(this.state.email));
    }

    loginGoog(){
        const {dispatch} = this.props;
        dispatch(loginGoog(this.state.email));
    }

    render() {
        const { authInProgress } = this.props.oneUser;
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
              "<p>Sure, try out lightning fast payment service <a href='https://pay.evergov.com'>here</a></p>"
          },
          {
            q: "How can I contact the support team if I have more questions?",
            a:
             "<p>Please drop us a line <a href='mailto:team@evergov.com'>here</a>   with more details about your question & one of our team members will respond in a day or two.</p>"
          }
        ];
         const faqComps = faqs.map((faq, idx) => {
           return (
             <FaqItem
               header={faq.q}
               name={`home-faq-${idx}`}
               description={faq.a}
             />
           );
         });

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
                            evergov{" "}
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
                        href={`https://evergov.com/terms`}
                        style={{ padding: "0.5rem" }}
                        target="_blank"
                      >
                        Terms
                      </a>

                      <a
                        href={`https://evergov.com/privacy`}
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
                style={{ margin: "4rem 0 4rem 0" }}
              >
                <div className={`${styles.column} ${styles.col1}`}></div>
                <div
                  className={`${styles.column} ${styles.colMd6} ${styles.colSm12}`}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "40px"
                    }}
                  >
                    <h1
                      style={{
                        margin: "1rem 1rem 1rem 0",
                        fontSize: "2.1rem",
                        lineHeight: "2.5rem"
                      }}
                    >
                      {" "}
                      The easiest way to interact with government services
                    </h1>
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.3rem"
                      }}
                    >
                      Think government services can't be simple and transparent?
                      <br />
                      Experience the new generation of consumer-friendly
                      government services.
                    </p>

                    <div style={{ maxWidth: "400px" }}>
                      {authInProgress ? (
                        <div className={styles.loading} />
                      ) : (
                        <div className={styles.inputGroup}>
                          <input
                            onChange={this.changeEmail}
                            type="email"
                            className={`${styles.formInput} ${styles.inputLg}`}
                            style={{ height: "2.1rem", marginRight: "0.5rem" }}
                            placeholder="your@email.com"
                          />
                          <button
                            onClick={this.loginGoog}
                            className={`${styles.btn} ${styles.btnSecondary} ${styles.inputGroupButton}`}
                          >
                            Get Started
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.column} ${styles.colMd6} ${styles.hideSm}`}
                  style={{ display: "flex", justifyContent: "right" }}
                >
                  <AboutIl />
                </div>
              </div>
              <div
                className={`${styles.columns}  ${styles.textCenter}`}
                style={{ margin: "6rem 0 4rem 0" }}
              >
                <div className={`${styles.column} ${styles.col1}`}></div>
                <div className={`${styles.column} ${styles.colXs10}}`}>
                  <h3>
                    {" "}
                    Never miss a{" "}
                    <TextLoop>
                      <h3>property tax payment</h3>
                      <h3>vehicle registration renewal</h3>
                      <h3>utility bill payment</h3>
                      <h3>business licence renewal</h3>
                    </TextLoop>{" "}
                  </h3>
                  <p>
                    We handle the renewals, auto payments and more on your
                    behalf
                  </p>
                </div>
                <div className={`${styles.column} ${styles.col1}`}></div>
              </div>
              <div
                className={`${styles.columns}`}
                style={{ margin: "4rem 0 4rem 0" }}
              >
                <div
                  className={`${styles.column} ${styles.colSm4} ${styles.colXs12}`}
                >
                  <div
                    className={`${styles.card} ${styles.textLeft}`}
                    style={{
                      border: "1px solid rgba(48,55,66,.10)",
                      background: "#fff",
                      minHeight: "200px",

                      marginBottom: "4rem",
                      marginTop: "1rem",
                      padding: "0.4rem",
                      borderRadius: "0.3rem",
                      boxShadow: "0 .3rem 0.8rem rgba(48,55,66,.10)"
                    }}
                  >
                    <div className={styles.cardHeader}>
                      <h5 className={`${styles.cardTitle}`}>
                        <span
                          style={{
                            background: "#fff",
                            color: "#ffd367",

                            fontSize: "1.2rem",
                            padding: "0.2rem 0",
                            borderRadius: "0.3rem"
                          }}
                          className={`${iconStyles.typcn} ${iconStyles.typcnFlashOutline}`}
                        ></span>{" "}
                        We'll do the heavy lifting
                      </h5>
                    </div>
                    <div className={styles.cardBody}>
                      <p className={`${styles.cardSubitle} ${styles.textGray}`}>
                        We take care of all of your government service
                        interactions including payments, renewals & much more on
                        your behalf while you can rest.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
                >
                  <div
                    className={`${styles.card} ${styles.textLeft}`}
                    style={{
                      border: "1px solid rgba(48,55,66,.10)",
                      background: "#fff",
                      minHeight: "200px",

                      marginBottom: "4rem",
                      marginTop: "1rem",
                      padding: "0.4rem",
                      borderRadius: "0.3rem",
                      boxShadow: "0 .3rem 0.8rem rgba(48,55,66,.10)"
                    }}
                  >
                    <div className={styles.cardHeader}>
                      <h5 className={`${styles.cardTitle}`}>
                        <span
                          style={{
                            background: "#fff",
                            color: "#3500f3",

                            fontSize: "1.2rem",
                            padding: "0.2rem 0",
                            borderRadius: "0.3rem"
                          }}
                          className={`${iconStyles.typcn} ${iconStyles.typcnInfinity}`}
                        ></span>{" "}
                        All in one place
                      </h5>
                    </div>
                    <div className={styles.cardBody}>
                      <p className={`${styles.cardSubitle} ${styles.textGray}`}>
                        We bring together all of your gov service related
                        accounts, bills, licenses and more, so you can
                        seamlessly manage them from one place.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.column} ${styles.colSm4}  ${styles.colXs12}`}
                >
                  <div
                    className={`${styles.card} ${styles.textLeft}`}
                    style={{
                      border: "1px solid rgba(48,55,66,.10)",
                      background: "#fff",
                      minHeight: "200px",

                      marginBottom: "4rem",
                      marginTop: "1rem",
                      padding: "0.4rem",
                      borderRadius: "0.3rem",
                      boxShadow: "0 .3rem 0.8rem rgba(48,55,66,.10)"
                    }}
                  >
                    <div className={styles.cardHeader}>
                      <h5 className={`${styles.cardTitle}`}>
                        <span
                          style={{
                            background: "#fff",
                            color: "#30ae40",

                            fontSize: "1.2rem",
                            padding: "0.2rem 0",
                            borderRadius: "0.3rem"
                          }}
                          className={`${iconStyles.typcn} ${iconStyles.typcnLockClosedOutline}`}
                        ></span>{" "}
                        Secure
                      </h5>
                    </div>
                    <div className={styles.cardBody}>
                      <p className={`${styles.cardSubitle} ${styles.textGray}`}>
                        We deeply care about user privacy & data. We don’t sell
                        your data and use industry standard encryption for all
                        transactions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.columns}`}
                style={{
                  margin: "4rem 0 4rem 0",
                  padding: "2.5rem 0.5rem",
                  background: "#f7f8f9"
                }}
              >
                <div
                  className={`${styles.column} ${styles.col3} ${styles.hideXs}`}
                />
                <div
                  className={`${styles.column} ${styles.col3} ${styles.colXs12}`}
                >
                  <div>
                    <span className={`${styles.textGray}`}>
                      <i>As featured in</i>
                    </span>
                  </div>
                  <div>
                    <a
                      target="_blank"
                      href="https://www.govtech.com/gov-experience/EverGov-Wants-to-Make-Local-Government-Services-More-Searchable.html"
                    >
                      <GovTechSvg />
                    </a>
                  </div>
                </div>
                <div
                  className={`${styles.column} ${styles.col3} ${styles.colXs12}`}
                >
                  <div>
                    <em>
                      "This makes sense, given that state agencies and larger
                      cities have been working for years to consolidate their
                      own digital services and <br /> create single login
                      interfaces that save citizens the trouble of navigating to
                      different departments"
                    </em>
                  </div>
                </div>
                <div
                  className={`${styles.column} ${styles.col3} ${styles.hideXs}`}
                />
              </div>
              <div
                className={`${styles.columns}  ${styles.textCenter}`}
                style={{ margin: "6rem 0 2rem 0" }}
              >
                <div className={`${styles.column} ${styles.col1}`}></div>
                <div className={`${styles.column} ${styles.colXs10}}`}>
                  <h3>Get started in a few minutes</h3>
                  <p>
                    We cover a variety of the most popular recurring services
                    you will need.
                  </p>
                </div>
                <div className={`${styles.column} ${styles.col1}`}></div>
              </div>
              <div
                className={`${styles.columns} `}
                style={{ margin: "4rem 0 8rem 0" }}
              >
                <div
                  className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}
                >
                  <div
                    style={{ border: "none" }}
                    className={` ${styles.textCenter}`}
                  >
                    <div
                      className={styles.cardImage}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <CreateAccount />
                    </div>
                    <div className={styles.cardHeader}>
                      <h6 className={`${styles.cardTitle}`}>
                        Create an account
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}
                >
                  <div
                    style={{ border: "none" }}
                    className={` ${styles.textCenter}`}
                  >
                    <div
                      className={styles.cardImage}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <AddDetails />
                    </div>
                    <div className={styles.cardHeader}>
                      <h6 className={`${styles.cardTitle}`}>
                        Add your service details <br /> & link your payment info
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.column}  ${styles.colSm4} ${styles.colXs12}`}
                >
                  <div
                    style={{ border: "none" }}
                    className={` ${styles.textCenter}`}
                  >
                    <div
                      className={styles.cardImage}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Relax />
                    </div>
                    <div className={styles.cardHeader}>
                      <h6 className={`${styles.cardTitle}`}>
                        Sit back & relax
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.columns} style={{ marginTop: "6rem" }}>
                <div className={`${styles.column} ${styles.col2}`} />
                <div className={`${styles.column}  ${styles.col8}`}>
                  <div className={styles.textCenter}>
                    <h3> Simple pricing </h3>
                    <div className={`${styles.cardSubitle} ${styles.textGray}`}>
                      Set it and forget it
                    </div>
                  </div>
                </div>
                <div className={`${styles.column} ${styles.col2}`} />
              </div>
              <div className={styles.columns} style={{ marginTop: "2rem" }}>
                <div className={`${styles.column} ${styles.col2}`} />
                <div className={`${styles.column}  ${styles.col8}`}>
                  <div className={`${styles.columns}`}>
                    <PaymentPlans onSelectPlan={this.loginGoogWplan} />
                  </div>
                </div>
                <div className={`${styles.column} ${styles.col2}`} />
              </div>
              <div
                className={`${styles.columns}`}
                style={{
                  margin: "4rem 0 0 0",
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
                  margin: "0rem 0 1rem 0",
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
              <div
                className={`${styles.columns}`}
                style={{
                  margin: "8rem 0 8rem 0",
                  padding: "2.5rem 0.5rem",
                  background: "#f7f8f9"
                }}
              >
                <div
                  className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
                />
                <div
                  className={`${styles.column} ${styles.col8} ${styles.colXs12} ${styles.textCenter}`}
                >
                  <div>
                    <span className={`${styles.textGray}`}>
                      <h5>Get in touch</h5>
                    </span>
                  </div>
                  <div>
                    <h3>team@evergov.com</h3>
                    <h5>650-667-0070</h5>
                  </div>
                </div>

                <div
                  className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
                />
              </div>
              <div
                className={`${styles.columns}  ${styles.textCenter}`}
                style={{ margin: "8rem 0" }}
              >
                <div
                  className={`${styles.column} ${styles.col4} ${styles.hideXs}`}
                />
                <div
                  className={`${styles.column} ${styles.col4} ${styles.colXs12} ${styles.textCenter}`}
                >
                  {authInProgress ? (
                    <div className={styles.loading} />
                  ) : (
                    <div>
                      <h3 style={{ paddingBottom: "1rem" }}>Sign up now</h3>
                      <div className={styles.inputGroup}>
                        <input
                          type="email"
                          onChange={this.changeEmail}
                          className={`${styles.formInput} ${styles.inputLg}`}
                          style={{ height: "2.1rem", marginRight: "0.5rem" }}
                          placeholder="your@email.com"
                        />
                        <button
                          onClick={() => this.loginGoog()}
                          className={`${styles.btn} ${styles.btnSecondary} ${styles.inputGroupButton}`}
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`${styles.column} ${styles.col4} ${styles.hideXs}`}
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

export default connect(mapStateToProps)(LandingHome);