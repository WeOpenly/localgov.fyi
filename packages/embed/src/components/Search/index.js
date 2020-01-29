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
          <Fragment>
            <AreaSuggestions />
            <SerSuggestions onSearch={this.onSearch} />
          </Fragment>
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
