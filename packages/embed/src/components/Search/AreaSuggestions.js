import React, { Fragment } from "react";
import { connect } from "react-redux";

import InputBase from "@material-ui/core/InputBase";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { updateGoogLocationSearchText, selectGoogLocation } from "./actions";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";


class GoogAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: false
    };
  }

  handleFocus = () => {
    this.setState({
      touched: true
    });
  };

  handleChange = address => {
    this.props.setSearchText(address);
  };

  handleSelect = address => {
    const { setGoogleLoc } = this.props;

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setGoogleLoc(latLng, address))
      .catch(error => console.error("Error", error));
    this.props.setSearchText(address);
    this.searchInput.blur();
  };

  render() {
    const {
      locationSearchText,
      selectedLocationLatLng,
      areaGuessResult,
      inHeader
    } = this.props;

    console.log(this.props, "props")
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

    return (
      <div>
        <PlacesAutocomplete
          value={showInput ? showInput : ""}
          onChange={this.handleChange}
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
              <div elevation={2}>
                {loading ? (
                  <div className={styles.loading} />
                ) : (
                  <span
                    className={`${iconStyles.typcn} ${iconStyles.typcnLocationArrow}`}
                  />
                )}

                <InputBase
                  inputProps={{
                    "aria-label": "search locations",
                    "aria-autocomplete": "list",
                    "aria-haspopup": "true",
                    "aria-expanded": "true",
                    role: "combobox",
                    "aria-controls": "area_suggestions_1"
                  }}
                  {...getInputProps({
                    placeholder: "Search locations",
                    autoFocus: false,
                    onFocus: this.handleFocus,
                    type: "search",
                    inputRef: node => {
                      this.searchInput = node;
                    }
                  })}
                />
              </div>

              <div id="area_suggestions_1" role="listbox" square>
                {loading ? (
                  <div style={{ padding: "8px" }}>"loading"</div>
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
                          <p>{suggestion.description}</p>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setGoogleLoc: (latlng, result) => {
      dispatch(selectGoogLocation(latlng.lat, latlng.lng, result));
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogAutoComplete);
