import React, { Fragment } from 'react';
import {connect} from "react-redux";
import Spinner from 'react-spinkit';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import NearMe from '@material-ui/icons/NearMe';
import Divider from '@material-ui/core/Divider';

import DirectionsIcon from '@material-ui/icons/Directions';
import Typography from '@material-ui/core/Typography';
import ContentLoader from "react-content-loader"
import CircularProgress from '@material-ui/core/CircularProgress';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import { updateGoogLocationSearchText, selectGoogLocation} from './actions';

import { trackClick, trackInput} from "../common/tracking";

const styles = theme => ({
    index_page_ser_suggestions_container:{
        margin: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px 0`,
        display: 'flex',
        width: '248px',
        justifyContent: 'center',
        position: 'relative'
    },
    index_page_ser_suggestions_container_header:{
        display: 'flex',
        marginRight: theme.spacing.unit,
        width: '248px',
        justifyContent: 'center',
        position: 'relative'
    },
    index_area_search_search_paper_root_header:{
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'none',
        border: `1px solid ${theme.palette.primary['200']}`,
        borderRadius: '4px',
        '&:hover': {
            boxShadow: `0 4px 8px 0 #dfdfdf, 0 1px 16px 0 #fafafa inset`,
            border: `1px solid ${theme.palette.primary['500']}`
        },
    },
    index_area_search_search_paper_root: {
           display: 'flex',
        alignItems: 'center',
        boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)',
        border: `1px solid ${theme.palette.primary['200']}`,
        borderRadius: '4px',
        '&:hover': {
            boxShadow: `0 4px 8px 0 #dfdfdf, 0 1px 16px 0 #fafafa inset`,
            border: `1px solid ${theme.palette.primary['500']}`
        },
    },
    index_area_search_search_input: {
        flex: 1,
                  padding: '6px',

        marginRight: theme.spacing.unit,
        fontSize: "16px",
        fontWeight: 500,
        fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
        lineHeight: "1.46429em",
        width: '100%',
        color: "rgba(30, 30, 50,0.99)",
    },
    index_area_search_search_suggestions:{
        position: 'absolute',
        zIndex: '200',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
    },
    
    index_page_search_iconButton: {
        minHeight: '1em',
        fontSize: '18px',
        color: theme.palette.primary['500'],
        marginLeft: '12px',
    }
});


const SuggestionContentLoader = props => (
    <ContentLoader
        height={360}
        width={400}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3"
    >
        <rect x="-6" y="33" rx="0" ry="0" width="394" height="27" />
        <rect x="0" y="98" rx="0" ry="0" width="394" height="27" />
        <rect x="2" y="163" rx="0" ry="0" width="394" height="27" />
        <rect x="0" y="225" rx="0" ry="0" width="394" height="27" />
        <rect x="0" y="287" rx="0" ry="0" width="394" height="27" />
    </ContentLoader>
)


class GoogAutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            touched: false,
        }
    }

    handleFocus = () => {
        this.setState({
            touched: true,
        })
    }

    handleChange = address => {
        this.props.setSearchText(address)
    };

    handleSelect = address => {
        const { setGoogleLoc} = this.props;


        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => setGoogleLoc(latLng))
            .catch(error => console.error('Error', error));
        this.props.setSearchText(address)
        this.searchInput.blur();
    };


    render() {
        const { classes, locationSearchText, areaGuessResult, inHeader} = this.props;


        const searchOptions = {
            types: ['(cities)']
        }

        let autoFilled = false;
        let showInput = '';
        const { lat, lng, city_name } = areaGuessResult;

        if (city_name){
            autoFilled = true;
            showInput = city_name;
        }
       
        if (!showInput){
            autoFilled = false;
            showInput = locationSearchText
        }

        if (this.state.touched){
            autoFilled = false;
            showInput = locationSearchText;
        }

        return (
          <div
            className={
              !inHeader
                ? classes.index_page_ser_suggestions_container
                : classes.index_page_ser_suggestions_container_header
            }
          >
            <PlacesAutocomplete
              value={showInput ? showInput : ""}
              onChange={this.handleChange}
              ref="placesAutocomplete"
              onSelect={this.handleSelect}
              debounce={50}
              searchOptions={searchOptions}
              highlightFirstSuggestion
              shouldFetchSuggestions={
                !autoFilled && (showInput && showInput.length > 1)
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
                  <Paper
                    className={
                      inHeader
                        ? classes.index_area_search_search_paper_root_header
                        : classes.index_area_search_search_paper_root
                    }
                    elevation={2}
                  >
                    {loading ? (
                      <CircularProgress size={18} />
                    ) : (
                      <NearMe
                        className={classes.index_page_search_iconButton}
                        aria-label="near-me"
                      />
                    )}

                    <InputBase
                      {...getInputProps({
                        role: "combobox",
                        "aria-label": "search locations",
                        "aria-autocomplete": "list",
                        "aria-haspopup": "true",
                        "aria-expanded": "true",
                        "aria-owns": "area_suggestions_1",
                        placeholder: "Search locations",
                        autoFocus: false,
                        onFocus: this.handleFocus,
                        type: "search",
                        inputRef: node => {
                          this.searchInput = node;
                        },
                        className:
                          classes.index_area_search_search_input
                      })}
                    />
                  </Paper>

                  <Paper
                    className={
                      classes.index_area_search_search_suggestions
                    }
                    id="area_suggestions_1"
                    role="listbox"
                    square
                  >
                    {loading ? (
                      <div style={{ padding: "8px" }}>
                        <SuggestionContentLoader />
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
                              <Typography
                                variant="body1"
                                style={{
                                  color: "rgba(30, 30, 50,0.99)",
                                  padding: "8px"
                                }}
                              >
                                {suggestion.description}
                              </Typography>
                            </div>
                          );
                        })
                      : null}
                  </Paper>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        },
        setGoogleLoc: (latlng) => {

            dispatch(selectGoogLocation(latlng.lat, latlng.lng));
        },
        setSearchText: (addr) => {
            dispatch(updateGoogLocationSearchText(addr));
        },
    }
}

const mapStateToProps = function (state, ownProps) {

    return {
        ...state.indexPage,
        ...ownProps
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GoogAutoComplete));
