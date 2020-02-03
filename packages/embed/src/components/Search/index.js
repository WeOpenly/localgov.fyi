import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import ContentLoader from "react-content-loader";

import SerSuggestions from "./SerSuggestions";
import AreaSuggestions from "./AreaSuggestions";
import MobileSuggestions from "./MobileSuggestions";


import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

import { fetchAreaGuess, executeSearch } from "./actions";

class Search extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch() {
    this.props.executeSearch();
  }

  render() {
    const { classes, location, isMobile } = this.props;

    if (isMobile) {
      return (
          <MobileSuggestions onSearch={this.onSearch} />
      );
    }

    return (

        <div className={`${styles.columns}`}>
          <div
            style={{ margin: "0 0 1.5rem 0" }}
            className={`${styles.column}  ${styles.col3} ${styles.colLg3}  ${styles.colSm4} ${styles.colXs12} `}
          >
            <AreaSuggestions />
          </div>
          <div
            style={{ margin: "0 0 1.5rem 0" }}
            className={`${styles.column} ${styles.col9} ${styles.colLg9}  ${styles.colSm8} ${styles.colXs12} ${styles.textLeft}`}
          >
            <SerSuggestions onSearch={this.onSearch} />
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
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

const ConnSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default ConnSearch;
