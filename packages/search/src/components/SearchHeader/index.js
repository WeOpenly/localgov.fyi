import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import ContentLoader from "react-content-loader";

import SerSuggestions from "./SerSuggestions";
import AreaSuggestions from "./AreaSuggestions";
import MobileSuggestions from "./MobileSuggestions";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import specIconStyles from "../spectre-icons.min.module.css";

import { fetchAreaGuess, executeSearch } from "./actions";

class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showItems: false
    };
    this.onSearch = this.onSearch.bind(this);
    this.onShowItems = this.onShowItems.bind(this);
    this.onCloseNavItems = this.onCloseNavItems.bind(this);
  }

  onShowItems() {
    this.setState({
      showItems: true
    });
  }

  onCloseNavItems() {
    this.setState({
      showItems: false
    });
  }

  componentDidMount() {
    this.props.fetchAreaGuess();
  }

  onSearch() {
    this.props.executeSearch();
  }

  render() {
    const { classes, location, isMobile } = this.props;

    if (isMobile) {
      return <MobileSuggestions onSearch={this.onSearch} />;
    }

    return (
      <>
        <div className={`${styles.columns} ${styles.hideMd}`}>
          <div
            style={{ margin: "0 0 0 0" }}
            className={`${styles.column}  ${styles.col4} `}
          >
            <AreaSuggestions />
          </div>
          <div
            style={{ margin: "0 0 0 0" }}
            className={`${styles.column} ${styles.col8}  ${styles.textLeft}`}
          >
            <SerSuggestions onSearch={this.onSearch} />
          </div>
        </div>
        <div
          style={{
            position: "relative"
          }}
          className={`${styles.columns} ${styles.showMd} ${styles.textRight}`}
        >
          <div>
            <button
              onClick={this.onShowItems}
              className={`${styles.btn} ${styles.btnLink} ${styles.inputGroupBtn} ${styles.btnLg}`}
            >
              <span
                style={{ marginBottom: "0.2rem" }}
                className={`${specIconStyles.icon} ${specIconStyles.iconMenu}`}
              />
            </button>
          </div>
          {this.state.showItems ? (
            <div
              className={`${styles.columns}`}
              style={{
                width: "320px",
                zIndex: '5000',
                height: "150px",
                background: "#fff",
                padding: "1rem 0.5rem",
                boxShadow: "0 0 0.5rem 0.3rem rgba(50,50,93,.04)",
                position: "absolute",
                right: "10px",
                top: "40px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  zIndex: "4000"
                }}
              >
                <button
                  onClick={this.onCloseNavItems}
                  className={`${styles.btn} ${styles.btnLink}`}
                >
                  <span
                    className={`${specIconStyles.icon} ${specIconStyles.iconClose}`}
                  />
                </button>
              </div>
              <div
                style={{ width: "100%", height: '20px', margin: "1rem 0.2rem 0.2rem 0.2rem" }}
              >
                <AreaSuggestions />
              </div>
              <div
                style={{ width: "100%", margin: "0.2rem 0.2rem 0.2rem 0.2rem" }}
              >
                <SerSuggestions onSearch={this.onSearch} />
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    executeSearch: () => {
      dispatch(executeSearch());
    },
    fetchAreaGuess: () => {
      dispatch(fetchAreaGuess());
    }
  };
};

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.indexPage,
    ...ownProps
  };
};

const ConnSearch = connect(mapStateToProps, mapDispatchToProps)(SearchHeader);

export default ConnSearch;
