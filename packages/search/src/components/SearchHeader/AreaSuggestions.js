import React, { Fragment } from "react";
import { connect } from "react-redux";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { updateGoogLocationSearchText, selectGoogLocation } from "./actions";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import specIconStyles from "../spectre-icons.min.module.css";

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
    // this.searchInput.blur();
  };

  render() {
    const {
      locationSearchText,
      selectedLocationLatLng,
      areaGuessResult,
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

    const inputProps = {
      "aria-label": "search locations",
      "aria-autocomplete": "list",
      "aria-haspopup": "true",
      "aria-expanded": "true",
      role: "combobox",
      "aria-controls": "area_suggestions_1"
    };
    return (
      <div>
        <PlacesAutocomplete
          style={{ position: "relative" }}
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
            <div style={{ position: "relative" }}>
              <div className={styles.hasIconLeft}>
                <input
                  {...inputProps}
                  {...getInputProps({
                    placeholder: "Search locations",
                    autoFocus: false,
                    onFocus: this.handleFocus,
                    type: "search",
                    inputRef: node => {
                      this.searchInput = node;
                    }
                  })}
                  style={{ paddingLeft: "1.5rem" }}
                  className={`${styles.formInput} ${styles.inputLg}`}
                />
                {loading ? (
                  <i
                    style={{ margin: "0 0.3rem" }}
                    className={`${styles.formIcon} ${specIconStyles.icon} ${styles.loading}`}
                  />
                ) : (
                  <i
                    style={{ margin: "0 0.3rem" }}
                    className={`${styles.formIcon} ${specIconStyles.icon} ${specIconStyles.iconLocation}`}
                  />
                )}
              </div>
              {suggestions.length > 0 ? (
                <ul
                  id="area_suggestions_1"
                  role="listbox"
                  style={{ position: "absolute", left: "0px" }}
                  className={styles.menu}
                >
                  {loading ? (
                    <div style={{ padding: "8px", textAlign: "center" }}>
                      <div className={styles.loading} />
                    </div>
                  ) : null}
                  {!loading
                    ? suggestions.map(suggestion => {
                        const className = styles.menuItem;
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
                          <li
                            style={{
                              margin: "16px"
                            }}
                            role="option"
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <a href="#" style={{ margin: "4px 0px" }}>
                              <div
                                className={`${styles.tile} ${styles.tileCentered}`}
                              >
                                <div className={styles.tileContent}>
                                  {suggestion.description}
                                </div>
                              </div>
                            </a>
                          </li>
                        );
                      })
                    : null}
                </ul>
              ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(GoogAutoComplete);
