import React, { Fragment } from "react";
import { connect } from "react-redux";

import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import Typography from "@material-ui/core/Typography";
import ContentLoader from "react-content-loader";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { fetchGoogLoc, updateSearchText, setGoogRegion } from "./actions";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import specIconStyles from "../spectre-icons.min.module.css";

import { trackClick, trackEvent, trackInput } from "../common/tracking";

class GoogAutoComplete extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = address => {
    this.props.setSearchText(address);
  };

  parseState = results => {
    if (results) {
      const addrComps = results[0].address_components;
      const state = addrComps.filter(it => {
        const { types } = it;
        if (types.indexOf("administrative_area_level_1") !== -1) {
          return true;
        }
      });
      if (state && state[0].long_name) {
        this.props.setGoogRegion(state[0].long_name);
      }
    }
    return results;
  };

  componentWillUnmount() {
    this.props.setSearchText("");
  }

  handleSelect = address => {
    const { serviceTemplateId, fetchGoogLoc } = this.props;

    geocodeByAddress(address)
      .then(this.parseState)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        if (latLng.lat && latLng.lng) {
          fetchGoogLoc(serviceTemplateId, latLng.lat, latLng.lng);
        }
      })
      .catch(error => console.error("Error", error));

    this.props.setSearchText(address);
    this.props.trackEvent("glossary_results_item_select", {
      service_template_id: serviceTemplateId,
      address: address
    });

    // this.searchInput.blur();
  };

  render() {
    const { classes, searchText, isMobile } = this.props;
    const searchOptions = {
      types: ["(cities)"],
      componentRestrictions: {
        country: "us"
      }
    };
    const inputProps = {
      "aria-label": "search locations",
      "aria-autocomplete": "list",
      "aria-haspopup": "true",
      "aria-expanded": "true",
      role: "combobox",
      "aria-controls": "area_suggestions_1"
    };
    return (
      <PlacesAutocomplete
        value={searchText}
        searchOptions={searchOptions}
        onChange={this.handleChange}
        ref="placesAutocomplete"
        onSelect={this.handleSelect}
        debounce={50}
        highlightFirstSuggestion
        shouldFetchSuggestions={searchText && searchText.length > 1}
        googleCallbackName="initTemplate"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
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
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex));
    },
    trackEvent: (ev, data) => {
      dispatch(trackEvent(ev, data));
    },
    fetchGoogLoc: (serviceTemplateId, lat, lng) => {
      console.log(lat, lng);
      dispatch(fetchGoogLoc(serviceTemplateId, lat, lng));
    },
    setSearchText: addr => {
      dispatch(updateSearchText(addr));
    },
    setGoogRegion: reg => {
      dispatch(setGoogRegion(reg));
    }
  };
};

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.serTemplate,
    ...ownProps
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogAutoComplete);
