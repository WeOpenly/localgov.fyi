import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


import Footer from "../components/FooterNew";
import Link from "gatsby-link";
import TextLoop from "react-text-loop";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";


import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

const HeroIl = () => (
  <StaticQuery
    query={graphql`
      query heroIl2Query {
        heroIl: allFile(filter: { relativePath: { eq: "indexhero.png" } }) {
          edges {
            node {
              name
              childImageSharp {
                fluid {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <Img
          title={`evergov`}
          alt={`illustration of evergov`}
          style={{ width: "400px" }}
          fluid={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);


const FaqItem = props => (
  <Fragment>
    <div className={styles.accordion}>
      <input type="checkbox" id={props.name} name={props.name} hidden />
      <label className={styles.accordionHeader} for={props.name}>
        <h5>
          {" "}
          {props.header}
          <span
            className={`${iconStyles.typcn} ${iconStyles.typcnChevronRight}`}
          />
        </h5>
      </label>
      <div className={styles.accordionBody}>
        <div
          style={{ padding: "0.5rem 0.5rem" }}
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></div>
      </div>
    </div>

    <div className={styles.divider} />
  </Fragment>
);

class OneHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loginInProgress } = this.props;
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
          "<p>Please drop us a line here with more details about your question & one of our team members will respond in a day or two.</p>"
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
                      <h3>evergov</h3>
                    </a>
                  </Link>
                </section>

                <section className={styles.navbarSection}>
                  <Link to="/terms" style={{ padding: "0.5rem" }}>
                    Terms
                  </Link>
                  <Link to="/privacy" style={{ padding: "0.5rem" }}>
                    Privacy
                  </Link>
                </section>
              </header>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>
          <div
            className={`${styles.columns}  ${styles.textCenter}`}
            style={{ margin: "6rem 0 4rem 0" }}
          >
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.colXs10}}`}>
              <h3>
                We’re building the new generation of consumer-friendly
                government services.
              </h3>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>
          <div
            className={`${styles.columns}  ${styles.textCenter}`}
            style={{ margin: "6rem 0 4rem 0" }}
          >
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.colXs10}}`}>
              <HeroIl />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
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

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.oneUser
  };
};

export default connect(mapStateToProps)(OneHome);
