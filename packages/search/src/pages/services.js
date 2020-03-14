import React, { Component, Fragment } from "react";
import Link from "gatsby-link";
import { navigate } from "@reach/router";
import { graphql } from "gatsby";

import { connect } from "react-redux";
import Helmet from "react-helmet";

import AnchorLink from "react-anchor-link-smooth-scroll";

import SearchNav from "../components/Nav/Search";

import FooterNew from "../components/FooterNew";

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";

import { trackView, trackClick } from "../components/common/tracking";

const LiteSerTemplate = props => {
  return (
    <a
      style={{
        cursor: "pointer",
        width: "288px",
        background: "#fff",
        color: "#3a4251",
        marginLeft: "16px",
        marginRight: "16px",
        padding: "1rem 1rem",
        marginTop: "16px",
        display: "flex",
        alignItems: "center",
        borderRadius: ".8rem",
        boxShadow: "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)",
        "&::hover": {
          boxShadow: "none"
        },
        textDecoration: "none"
      }}
      href={`/services/${props.slug}`}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: "80" }}>
        <div className={styles.textBold}>
          <h6>{props.name}</h6>
        </div>
        <div
          className={styles.textSmall}
        >{`Offered in ${props.org_count} locations`}</div>
      </div>
    </a>
  );
};

class ServiceList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.trackView();
  }

  render() {
    const { classes } = this.props;
    let catGroupMap = {};

    this.props.data.services.edges.map((ser, idx) => {
      const {
        service_category_kind,
        orgs,
        service_name_slug,
        service_glossary_description,
        service_name
      } = ser.node;
      if (catGroupMap[service_category_kind]) {
        const vals = catGroupMap[service_category_kind];
        vals.push({
          org_count: orgs.length,
          service_name_slug: service_name_slug,
          service_glossary_description: service_glossary_description,
          service_name: service_name
        });
        catGroupMap[service_category_kind] = vals;
      } else {
        catGroupMap[service_category_kind] = [
          {
            org_count: orgs.length,
            service_name_slug: service_name_slug,
            service_glossary_description: service_glossary_description,
            service_name: service_name
          }
        ];
      }
    });

    let sortedCatMap = [];
    for (const [cat, sers] of Object.entries(catGroupMap)) {
      sortedCatMap.push({ cat: cat, sers: sers });
    }
    sortedCatMap.sort((a, b) => a.cat.localeCompare(b.cat));

    let serComponents = [];
    let catComponents = [];

    for (const sortedCat of sortedCatMap) {
      const { cat, sers } = sortedCat;
      let catSerComps = sers.map((ser, idx) => {
        const { service_name, service_name_slug, org_count } = ser;
        return (
          <div>
            <LiteSerTemplate
              name={service_name}
              slug={service_name_slug}
              org_count={org_count}
            />
          </div>
        );
      });

      serComponents.push(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          margin: "3rem 0 1rem 0",
            width: "100%",
            "@media only screen and (max-width: 768px)": {
              alignItems: "center"
            }
          }}
          id={`${cat}`}
        >
          <h4>{cat}</h4>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {catSerComps}
          </div>
        </div>
      );

      catComponents.push(
        <div>
          <AnchorLink
            style={{
              textDecoration: "none"
            }}
            offset="48"
            href={`#${cat}`}
          >
            <p>{cat}</p>
          </AnchorLink>
        </div>
      );
    }

    return (
      <Fragment>
        <Helmet>
          <title>{`Services | papergov`}</title>

          <link rel="canonical" href={`https://papergov.com/services/`} />
          <meta property="og:title" content={`Services | papergov`} />
          <meta property="og:url" content={`https://papergov.com/services/`} />

          <meta name="description" content={`Services on papergov`} />

          <meta property="og:description" content={`Services on papergov`} />
        </Helmet>
        <div
          className={`${styles.container}`}
          style={{ background: "#f8f9fc" }}
        >
          <div className={`${styles.columns} ${styles.hideMd}`}>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ background: "#fff" }}
            >
              <SearchNav />
            </div>

            <div className={styles.columns}>
              <div
                style={{ margin: "3rem 0 2rem 0" }}
                className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
              >
                <h3>Services on papergov</h3>
              </div>

              <div className={`${styles.column} ${styles.col1}`}></div>
              <div className={`${styles.column} ${styles.col2}`}>
                {catComponents}
              </div>

              <div className={`${styles.column} ${styles.col8}`}>
                {serComponents}
              </div>

              <div className={`${styles.column} ${styles.col1}`}></div>
            </div>
          </div>
          <div className={`${styles.columns} ${styles.showMd}`}>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ background: "#fff" }}
            >
              <SearchNav />
            </div>

            <div className={styles.columns}>
              <div
                style={{ margin: "3rem 0 2rem 0" }}
                className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
              >
                <h3>Services on papergov</h3>
              </div>

              <div
                className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
              >
                {catComponents}
              </div>

              <div
                className={`${styles.column} ${styles.col1} ${styles.textCenter}`}
              ></div>
              <div
                className={`${styles.column} ${styles.col10} ${styles.textCenter}`}
              >
                {serComponents}
              </div>
              <div
                className={`${styles.column} ${styles.col1} ${styles.textCenter}`}
              ></div>
            </div>
          </div>
          <FooterNew page={this.props.location.pathname} />
          {/* <Banner title="hello" button={"button"} /> */}
        </div>
      </Fragment>
    );
  }
}

export const query = graphql`
  query servicesQuery {
    services: allServiceGlossaryJson {
      edges {
        node {
          id
          service_name
          service_name_slug
          service_glossary_description
          service_category_kind
          orgs {
            id
          }
        }
      }
    }
  }
`;

const mapDispatchToProps = dispatch => {
  return {
    trackView: () => {
      dispatch(trackView("service_list", null, null, null));
    }
  };
};

const mapStateToProps = function(state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnServiceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceList);

export default ConnServiceList;
