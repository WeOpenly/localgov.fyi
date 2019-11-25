import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "gatsby-link";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import UberLogo from '../../illus/UbserLogo'
import styles from "../spectre.min.module.css";
import expStyles from "../spectre-exp.min.module.css";
import iconStyles from "../typicons.min.module.css";

const windowGlobal = typeof window !== "undefined" && window;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

    handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {

    const { onSearchChange } = this.props;

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => onSearchChange(latLng.lat, latLng.lng))
      .catch(error => console.error("Error", error));

    this.setState({ address })
  };

  render() {
    const {serPack} = this.props;
    const {auto_region} =  serPack;
    
    return (
      <div
        className={` ${styles.textCenter}`}
        style={{
          margin: "0.5rem 0.2rem",
          padding: "3rem 0.5rem 1rem 0.5rem",
          minHeight: "300px",
          border: "none",

          marginBottom: "1rem"
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              margin: "0px 0.2rem",
              textAlign: "center",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div style={{ margin: "0.8rem 0" }}>
              <figure
                className={`${styles.avatar} ${styles.avatarXl}`}
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 0.2rem 0.5rem rgba(48,55,66,.30)",
                  border: "1px solid #fff",
                  width: "100px",
                  height: "100px",
                  paddingTop: "20px"
                }}
              >
                <UberLogo />
              </figure>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "1rem 0 1rem 0"
              }}
            >
              <h2 style={{ color: "rgba(86, 39, 255, .7)" }}>
                {" "}
                Driver-partner Compliance Simplified{" "}
              </h2>
              <p
                style={{ maxWidth: "380px", padding: "0.5rem" }}
                className={styles.textSemibold}
              >
                Find all your compliance needs in a single place so that you can
                focus on what you best.
              </p>
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div className={`${expStyles.formAutocomplete} }`}>
                <div
                  className={`${expStyles.formAutocompleteInput} ${styles.formInput}}`}
                >
                  <div className={styles.inputGroup} style={{ width: "100%" }}>
                    <input
                      className={`${styles.formInput} ${styles.inputXl}`}
                      {...getInputProps({
                        placeholder: "Enter a location to get started"
                      })}
                    />
                  </div>
                </div>

                {suggestions.length > 0 ? (
                  <ul
                    className={styles.menu}
                    style={{
                      position: "absolute",
                      top: "40",
                      maxWidth: "600px",
                      minWidth: "600px"
                    }}
                  >
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = styles.menuIem;

                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <li
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <div className={`${styles.tile} ${styles.textLeft}`}>
                            <div
                              className={styles.tileContent}
                              style={{ padding: "0.3rem 0.1rem" }}
                            >
                              <div>
                                <h6 style={{ color: "#455060" }}>
                                  <span>{suggestion.description}</span>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div className={styles.textRight} style={{ margin: "1rem 0 0 0 " }}>
          {auto_region && typeof auto_region !== "object" ? (
            <div>
              <span className={styles.chip}>
                <span
                  className={`${iconStyles.typcn} ${iconStyles.typcnLocation}`}
                  style={{
                    fontSize: "0.7rem",
                    cursor: "pointer",
                    color: "#5627ff"
                  }}
                />
                Showing details for {auto_region} region
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Index;
