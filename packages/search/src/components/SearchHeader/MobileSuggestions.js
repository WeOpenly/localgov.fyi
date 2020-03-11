import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import Autosuggest from "react-autosuggest";
import deburr from "lodash/deburr";

import InputBase from "@material-ui/core/InputBase";
import ContentLoader from "react-content-loader";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { updateGoogLocationSearchText, selectGoogLocation } from "./actions";

import ParkingcitSvg from "../../svgIcons/ParkingCitIl.js";
import ProptaxSvg from "../../svgIcons/PropTaxIl.js";
import BusinessLic from "../../svgIcons/businessLic.js";
import Utilitybill from "../../svgIcons/utbIl.js";

import { updateServciceSearchText, selectServiceTemplateId } from "./actions";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class MobileSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: "Search for Parking Citations, Licences ..",
      showSuggestions: false,
      touched: false,
      staticServiceTemplates: [
        {
          title: "Popular Services",
          icon: null,
          suggestions: [
            {
              icon: <ParkingcitSvg style={{ width: "24px", height: "24px" }} />,
              name: "Pay Parking Citation",
              id: "0bbec7f3-7c54-4ce8-8356-8494835e2ef3"
            },
            {
              icon: <BusinessLic style={{ width: "24px", height: "24px" }} />,
              name: "Renew Business Licence",
              id: "b6a31bb0-90d7-4806-8a05-6e45c5485215"
            },
            {
              icon: <ProptaxSvg style={{ width: "24px", height: "24px" }} />,
              name: "Pay Property Taxes",
              id: "f26d145a-8058-4ec3-bb44-7baa82d3fa21"
            },
            {
              icon: <Utilitybill style={{ width: "24px", height: "24px" }} />,
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
      <div className={classes.ser_suggestion_title_container}>
        "trend up"
        <h6>
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

    return (
      <div {...containerProps} square>
        {children}
      </div>
    );
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    // inline style for demonstration purpose
    const style = isHighlighted
      ? { backgroundColor: "#fafafa", cursor: "pointer" }
      : { backgroundColor: "#ffffff", cursor: "pointer" };

    return (
      <div
        style={{
          padding: "8px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          ...style
        }}
      >
        {suggestion.icon}
        <p>
            {suggestion.name}
        </p>
      </div>
    );
  }

  handleFocus = () => {
    this.setState({
      touched: true
    });
  };

  handleAreaChange = address => {
    this.props.setSearchText(address);
  };

  handleSelect = address => {
    const { setGoogleLoc } = this.props;

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setGoogleLoc(latLng))
      .catch(error => console.error("Error", error));
    this.props.setSearchText(address);
    this.searchInput.blur();
  };

  issueFreeSearch() {
    this.props.onSearch();
  }

  blurInputs = () => {
    this.setState({
      touched: false,
      showSuggestions: false
    });
  };

  renderInput(inputProps) {
    const { classes } = this.props;

    return (
      <div className={classes.ser_gloss_search_paper_root} elevation={2}>
        <label for="mob_ser_suggestions" style={{ display: "none" }}>
          Search Services
        </label>
       "Search Services"
        <InputBase
          id="mob_ser_suggestions"
          inputProps={inputProps}
          className={classes.ser_gloss_search_input}
        />
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
    if (method === "type") {
      this.props.updateSearch(newValue);
    }
  }

  selectSuggestion(
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) {
    event.preventDefault();
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
    return this.state.showSuggestions;
  }

  render() {
    const { classes } = this.props;
    const { serviceSearchText } = this.props;
    const placeholder = "Pay Parking Tickets";
    let suggestions = this.state.staticServiceTemplates;
    const {
      locationSearchText,
      areaGuessResult,
      selectedLocationLatLng,
      inHeader
    } = this.props;

    const searchOptions = {
      types: ["(cities)"],
      componentRestrictions: {
        country: "us"
      }
    };

    let autoFilled = false;
    let showInput = "";
    const { lat, lng, city_name } = areaGuessResult;

    if (city_name) {
      autoFilled = true;
      showInput = city_name;
    }

    if (selectedLocationLatLng && "addr" in selectedLocationLatLng) {
      const { addr } = selectedLocationLatLng;
      if (addr) {
        autoFilled = true;
        showInput = addr;
      }
    }

    if (!showInput) {
      autoFilled = false;
      showInput = locationSearchText;
    }

    if (this.state.touched) {
      autoFilled = false;
      showInput = locationSearchText;
    }

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
      onSuggestionSelected: this.selectSuggestion,
      renderSuggestion: this.renderSuggestion,
      renderSectionTitle: this.renderSectionTitle,
      onSuggestionsClearRequested: () => {},
      getSectionSuggestions: this.getSectionSuggestions
    };

    const inputProps = {
      onChange: this.handleChange,
      type: "search",
      onFocus: this.onFocus,
      placeholder: this.state.placeholder,
      value: serviceSearchText ? serviceSearchText : ""
    };

    const theme = {
      suggestionsContainerOpen: classes.suggestionsContainerOpen,
      suggestionsList: classes.suggestionsList,
      sectionTitle: classes.sectionTitle
    };

    const touchedInputs = this.state.touched || this.state.showSuggestions;
    if (inHeader && !touchedInputs) {
      return (
        <div style={{ display: "flex" }}>
            "Search Icon"
        </div>
      );
    }

    return (
      <div
        className={
          touchedInputs
            ? classes.index_page_ser_suggestions_container_mob__focussed
            : classes.index_page_ser_suggestions_container_mob
        }
      >
        {touchedInputs ? (
          <div
            className={
              inHeader
                ? classes.index_page_touched_paper_header
                : classes.index_page_touched_paper
            }
          >
            <div className={classes.index_page_ser_control_items}>

              <button
                color="primary"
                className={classes.button}
                onClick={this.blurInputs}
              >
                Cancel
              </button>
              <button
                color="primary"
                onClick={() => this.props.onSearch()}
                className={classes.button}
              >
                Search
              </button>
            </div>

            <PlacesAutocomplete
              value={showInput}
              onChange={this.handleAreaChange}
              ref="placesAutocomplete"
              onSelect={this.handleSelect}
              debounce={50}
              searchOptions={searchOptions}
              highlightFirstSuggestion
              shouldFetchSuggestions={
                !autoFilled && showInput && showInput.length > 1
              }
              googleCallbackName={inHeader ? `initHeader` : `initIndex`}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div style={{ width: "100%" }}>
                  <div
                    className={classes.index_area_search_search_paper_root}
                    elevation={2}
                    aria-label="area-list"
                  >
                    {loading ? (
                      "progress"
                    ) : (
                     "Near Me"
                    )}

                    <InputBase
                      inputProps={{
                        "aria-label": "search locations",
                        "aria-autocomplete": "list",
                        "aria-haspopup": "true",
                        role: "combobox",
                        "aria-expanded": "true",
                        "aria-controls": "mob_suggestions_1"
                      }}
                      {...getInputProps({
                        placeholder: "Search locations",
                        autoFocus: false,
                        onFocus: this.handleFocus,
                        type: "search",
                        inputRef: node => {
                          this.searchInput = node;
                        },
                        className: classes.index_area_search_search_input
                      })}
                    />
                  </div>

                  <div
                    className={classes.index_area_search_search_suggestions}
                    role="listbox"
                    id="mob_suggestions_1"
                    square
                  >
                    {loading ? (
                      <div style={{ padding: "8px" }}>
                        loading
                      </div>
                    ) : null}
                    {!loading
                      ? suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? {
                                backgroundColor: "#fafafa",
                                cursor: "pointer"
                              }
                            : {
                                backgroundColor: "#ffffff",
                                cursor: "pointer"
                              };
                          return (
                            <div
                              style={{ margin: "16px" }}
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style
                              })}
                            >
                              <p>
     {suggestion.description}
                              </p>
                           
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <div className={styles.divider} />
            <form
              onSubmit={this.onSubmit}
              className={classes.index_page_ser_suggestions_container_form}
            >
              <Autosuggest
                id="serviceSuggestions_mob_1"
                {...autosuggestProps}
                inputProps={inputProps}
                theme={theme}
              />
            </form>
          </div>
        ) : (
          <Fragment>
            <PlacesAutocomplete
              value={showInput}
              onChange={this.handleAreaChange}
              ref="placesAutocomplete"
              onSelect={this.handleSelect}
              debounce={50}
              searchOptions={searchOptions}
              highlightFirstSuggestion
              shouldFetchSuggestions={
                !autoFilled && showInput && showInput.length > 1
              }
              googleCallbackName="initIndex"
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div style={{ width: "100%" }}>
                  <div
                    className={classes.index_area_search_search_paper_root}
                    elevation={2}
                    aria-label="area-list"
                  >
                    {loading ? (
                        "progress"
                    ) : (
                    "near me"
                    )}

                    <InputBase
                      inputProps={{
                        "aria-label": "search locations",
                        "aria-autocomplete": "list",
                        "aria-haspopup": "true",
                        role: "combobox",
                        "aria-expanded": "true",
                        "aria-controls": "mob_suggestions_2"
                      }}
                      {...getInputProps({
                        placeholder: "Search locations",
                        autoFocus: false,
                        onFocus: this.handleFocus,
                        type: "search",
                        inputRef: node => {
                          this.searchInput = node;
                        },
                        className: classes.index_area_search_search_input
                      })}
                    />
                  </div>

                  <div
                    className={classes.index_area_search_search_suggestions}
                    id="mob_suggestions_2"
                    role="listbox"
                    square
                  >
                    {loading ? (
                      <div style={{ padding: "8px" }}>
                        loading
                      </div>
                    ) : null}
                    {!loading
                      ? suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? {
                                backgroundColor: "#fafafa",
                                cursor: "pointer"
                              }
                            : {
                                backgroundColor: "#ffffff",
                                cursor: "pointer"
                              };
                          return (
                            <div
                              style={{
                                margin: "16px"
                              }}
                              role="option"
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style
                              })}
                            >
                              <p>
 {suggestion.description}
                              </p>
                               
           
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <div className={styles.divider} />
            <form
              onSubmit={this.onSubmit}
              className={classes.index_page_ser_suggestions_container_form}
            >
              <Autosuggest
                id="serviceSuggestions_mob_1"
                {...autosuggestProps}
                inputProps={inputProps}
                theme={theme}
              />
            </form>
          </Fragment>
        )}
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
    },
    setGoogleLoc: latlng => {
      dispatch(selectGoogLocation(latlng.lat, latlng.lng));
    },
    setSearchText: addr => {
      dispatch(updateGoogLocationSearchText(addr));
    }
  };
};

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.dynamicSearch,
    ...ownProps
  };
};

const ConnSerSuggest = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileSuggestions);

export default ConnSerSuggest;
