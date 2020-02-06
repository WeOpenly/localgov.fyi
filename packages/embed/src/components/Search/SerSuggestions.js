import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import Autosuggest from "react-autosuggest";
import deburr from "lodash/deburr";

import InputBase from "@material-ui/core/InputBase";

import ParkingcitSvg from "../../svgIcons/ParkingCitIl.js";
import ProptaxSvg from "../../svgIcons/PropTaxIl.js";
import BusinessLic from "../../svgIcons/businessLic.js";
import Utilitybill from "../../svgIcons/utbIl.js";

import { updateServciceSearchText, selectServiceTemplateId } from "./actions";

import autoStyles from "./auto.module.css";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class SerSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: "Search for Citations, Licences ..",
      showSuggestions: true,
      staticServiceTemplates: [
        {
          title: "Popular Services",
          icon: null,
          suggestions: [
            {
              icon: <ParkingcitSvg style={{ width: "32px", height: "18px" }} />,
              name: "Pay Parking Citation",
              id: "0bbec7f3-7c54-4ce8-8356-8494835e2ef3"
            },
            {
              icon: (
                <BusinessLic style={{ minWidth: "32px", height: "20px" }} />
              ),
              name: "Renew Business Licence",
              id: "b6a31bb0-90d7-4806-8a05-6e45c5485215"
            },
            {
              icon: <ProptaxSvg style={{ minWidth: "32px", height: "24px" }} />,
              name: "Pay Property Taxes",
              id: "f26d145a-8058-4ec3-bb44-7baa82d3fa21"
            },
            {
              icon: (
                <Utilitybill style={{ minWidth: "32px", height: "24px" }} />
              ),
              name: "Pay Utility Bill",
              id: "6e9a7e19-2f41-4a43-bb56-e7f61944aaf0"
            }
          ]
        }
      ],
      filtered: []
    };

    // presentation
    this.renderInput = this.renderInput.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);

    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(
      this
    );
    this.getSectionSuggestions = this.getSectionSuggestions.bind(this);
    this.renderSectionTitle = this.renderSectionTitle.bind(this);

    // user actions
    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectSuggestion = this.selectSuggestion.bind(this);
    this.issueFreeSearch = this.issueFreeSearch.bind(this);

    // redux actions
    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(
      this
    );
  }

  renderSectionTitle(section) {
    const { classes } = this.props;
    return (
      <div style={{marginBottom: '8px', marginLeft: '4px'}}>
        <h6 className={styles.textGray}>
          <span className={`${iconStyles.typcn} ${iconStyles.typcnFlash}`} />{" "}
          {section.title}
        </h6>
      </div>
    );
  }

  getSectionSuggestions(section) {
    return section.suggestions;
  }

  onFocus() {
    this.setState({
      showSuggestions: true
    });
  }

  renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    if (!children){
      return null;
    }

    return (
      <ul {...containerProps} >
        {children}
      </ul>
    );
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    // inline style for demonstration purpose
    const style = isHighlighted
      ? { backgroundColor: "#fafafa", cursor: "pointer" }
      : { backgroundColor: "#ffffff", cursor: "pointer" };

    return (
      <a href="#" style={{margin: '4px 0px'}}>
        <div className={`${styles.tile} ${styles.tileCentered}`}>
          <div style={{height: '24px'}} className={styles.tileIcon}>{suggestion.icon}</div>
          <div className={styles.tileContent}>{suggestion.name}</div>
        </div>
      </a>
    );
  }

  issueFreeSearch() {
    this.props.onSearch();
  }

  renderInput(inputProps) {
    const { classes, inHeader } = this.props;

    return (
      <div className={styles.inputGroup}>
        <InputBase
          className={`${styles.formInput} ${styles.inputLg}`}
          inputProps={inputProps}
        />
        <button
          onClick={this.props.onSearch}
          className={`${styles.btn} ${styles.btnPrimary} ${styles.inputGroupBtn} ${styles.btnLg}`}
        >
          <span className={`${iconStyles.typcn} ${iconStyles.typcnZoom}`} />
        </button>
      </div>
    );
  }

  handleSuggestionsFetchRequested({ value }) {
    this.setState({
      ...this.state,
      filtered: this.getSuggestions(value)
    });
  }

  handleChange(event, { newValue, method }) {
    event.preventDefault();
    if (method === "type") {
      this.props.updateSearch(newValue);
    }
  }

  selectSuggestion(
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) {
    this.props.selectService(suggestion.id);
    this.props.onSearch();
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.issueFreeSearch();
  }

  getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    const suggestions = this.state.staticServiceTemplates[0].suggestions;

    const filtered =
      inputLength === 0
        ? suggestions
        : suggestions.filter(
            suggestion =>
              suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
          );

    return filtered;
  }

  shouldRenderSuggestions(value) {
    return true;
  }

  render() {
    const { classes } = this.props;
    const { serviceSearchText, inHeader } = this.props;

    let suggestions = this.state.staticServiceTemplates;

    if (serviceSearchText) {
      suggestions = this.state.filtered;
    }

    const autosuggestProps = {
      multiSection: !serviceSearchText,
      renderInputComponent: this.renderInput,
      suggestions: suggestions,
      highlightFirstSuggestion: !serviceSearchText,
      shouldRenderSuggestions: this.shouldRenderSuggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionSelected: this.selectSuggestion,
      renderSuggestionsContainer: this.renderSuggestionsContainer,
      getSuggestionValue: suggestion => suggestion.id,
      renderSuggestion: this.renderSuggestion,
      renderSectionTitle: this.renderSectionTitle,
      onSuggestionsClearRequested: () => {},
      getSectionSuggestions: this.getSectionSuggestions
    };

    const inputProps = {
      onChange: this.handleChange,
      type: "search",
      "aria-label": "Service Suggestions",

      placeholder: this.state.placeholder,
      value: serviceSearchText ? serviceSearchText : ""
    };

    const theme = {
      suggestionsContainer: styles.menu,
      suggestion: styles.menuItem,
      suggestionsList: autoStyles.suggestionsList
    };
    
    return (
      <div style={{ position: "absolute", width: "340px" }}>
        <form onSubmit={this.onSubmit}>
          <Autosuggest
            id="serviceSuggestions"
            {...autosuggestProps}
            inputProps={inputProps}
            theme={theme}
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectService: id => {
      dispatch(selectServiceTemplateId(id));
    },
    updateSearch: text => {
      dispatch(updateServciceSearchText(text));
    }
  };
};

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.dynamicSearch,
    ...ownProps
  };
};

const ConnSerSuggest = connect(mapStateToProps, mapDispatchToProps)(SerSuggest);

export default ConnSerSuggest;
