import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Img from "gatsby-image";
import { graphql, StaticQuery } from "gatsby";

import ContentLoader from "react-content-loader";

import { Defer } from "react-progressive-loader";

import CommonNav from '../Nav/Common';
import MobileSuggestions from "./MobileSuggestions";
import IndexServiceTemplates from "./IndexServiceTemplates";
import { fetchAreaGuess, executeSearch } from "./actions";
import { trackClick } from "../common/tracking";
import SearchHeader from "../SearchHeader";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";



const SuggestBoxLoader = props => (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-start",
      width: "560px",
      marginTop: "8px"
    }}
  >
    <ContentLoader
      height={20}
      width={300}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="6" y="1" rx="0" ry="0" width="85" height="27" />
      <rect x="105" y="-3" rx="0" ry="0" width="152" height="27" />
    </ContentLoader>
  </div>
);

const HeroIl = () => (
  <StaticQuery
    query={graphql`
      query heroIlQuery {
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
          title={`papergov`}
          alt={`illustration of papergov`}
          style={{ width: "400px" }}
          fluid={data.heroIl.edges[0].node.childImageSharp.fluid}
        />
      );
    }}
  />
);

class IndexHero extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch() {
    this.props.executeSearch();
  }

  render() {
    const { classes, location, appReady, isMobile } = this.props;


    return (
      <>
        <div className={`${styles.columns} ${styles.hideMd}`}>
          <div className={`${styles.column} ${styles.col1}`}></div>
           <div className={`${styles.column} ${styles.col10}`}>
            <CommonNav />
          </div>
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div
            style={{
              margin: "0rem 0 0 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
            className={`${styles.column} ${styles.col5}`}
          >
            <div className={`${styles.columns}`}>
              <div
                style={{ margin: "1rem 0" }}
                className={`${styles.h4} ${styles.column} ${styles.col12} ${styles.textBold}`}
              >
                <h2>All your government services </h2>
                <h2>in a single place.</h2>
              </div>
              <div className={`${styles.column} ${styles.col12}`}>
                {appReady ? <SearchHeader /> : <SuggestBoxLoader />}
              </div>
            </div>
          </div>
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div className={`${styles.column} ${styles.col4}`}>
            <HeroIl />
          </div>
          <div className={`${styles.column} ${styles.col1}`}></div>
          <div className={`${styles.column} ${styles.col12}`}>
            {" "}
            <IndexServiceTemplates compact={true} />
          </div>
        </div>
        <div className={`${styles.columns} ${styles.showMd}`}>
          <div
            style={{ margin: "2rem 0 0 0" }}
            className={`${styles.column} ${styles.col12}`}
          >
            <a style={{ textDecoration: "none" }} href="/">
              <h2>papergov</h2>
            </a>
          </div>
          <div
            className={`${styles.column} ${styles.h4} ${styles.col12} ${styles.textGray} ${styles.textBold}`}
          >
            <p>All your government services in a single place.</p>
          </div>

          <div className={`${styles.column} ${styles.col12}`}>
            {appReady ? (
              <MobileSuggestions onSearch={this.onSearch} />
            ) : (
              <div className={styles.loading} />
            )}
          </div>

          <div className={`${styles.column} ${styles.col12}`}>
            <Defer
              render={() => (
                <IndexServiceTemplates isMobile={isMobile} compact={true} />
              )}
              renderPlaceholder={() => <div></div>}
              loadOnScreen
            />
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex));
    },
    fetchAreaGuess: () => {
      dispatch(fetchAreaGuess());
    },
    executeSearch: () => {
      dispatch(executeSearch());
    }
  };
};

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.indexPage,
    ...ownProps
  };
};

const ConnIndexHero = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexHero);

export default ConnIndexHero;
