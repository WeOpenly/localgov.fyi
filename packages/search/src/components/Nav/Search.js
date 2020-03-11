import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Link from "gatsby-link";
// import HeaderAccountMenu from '../HeaderAccountMenu';
// import AreaSuggestions from '../IndexPage/AreaSuggestions'
// import SerSuggestions from '../IndexPage/SerSuggestions'
// import MobileSuggestions from '../IndexPage/MobileSuggestions'

import SearchHeader from "../SearchHeader";

import { fetchAreaGuess, executeSearch } from "../IndexPage/actions";
import { trackClick } from "../common/tracking";
import ContentLoader from "react-content-loader";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class SearchNav extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchAreaGuess();
  }

  onSearch() {
    this.props.executeSearch();
  }

  render() {
    const { classes, location, areaGuessLoading, areaGuessResult } = this.props;

    return (
      <>
        <div
          className={`${styles.columns} ${styles.hideMd}`}
          style={{
            padding: "0.7rem 0rem 0.7rem 1rem",
            boxShadow: "0 0 0.5rem 0.3rem rgba(50,50,93,.04)"
          }}
        >
          <div
            className={`${styles.column} ${styles.col2}`}
            style={{ display: "flex", paddingTop: "0.2rem" }}
          >
            <a style={{ textDecoration: "none" }} href="/">
              <h4>papergov</h4>
            </a>
          </div>
          <div className={`${styles.column} ${styles.col7}`}>
            <SearchHeader />
          </div>
          <div
            className={`${styles.column} ${styles.col3} `}
            style={{ display: "flex", justifyContent:'right' }}
          >
            <a
              className={`${styles.textGray}`}
              href={`https://papergov.com/locations`}
              style={{ padding: "0.5rem" }}
              target="_blank"
            >
              Locations
            </a>

            <a
              className={`${styles.textGray}`}
              href={`https://papergov.com/services`}
              style={{ padding: "0.5rem" }}
              target="_blank"
            >
              Services
            </a>
            <a
              className={`${styles.textGray}`}
              href={`https://papergov.com/help`}
              style={{ padding: "0.5rem" }}
              target="_blank"
            >
              Help
            </a>
          </div>
        </div>
        <div className={styles.showMd}>
          <div
            className={`${styles.columns}`}
            style={{
              padding: "0.5rem 0.7rem 0.2rem 0.5rem",
              boxShadow: "0 0 0.5rem 0.3rem rgba(50,50,93,.04)"
            }}
          >
            <div className={`${styles.column} ${styles.colMd4}`}>
              <a style={{ textDecoration: "none" }} href="/">
                <h4>papergov</h4>
              </a>
            </div>

            <div className={`${styles.column} ${styles.colMd8} `}>
              <SearchHeader />
            </div>
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

const ConnSearchNav = connect(mapStateToProps, mapDispatchToProps)(SearchNav);

export default ConnSearchNav;
