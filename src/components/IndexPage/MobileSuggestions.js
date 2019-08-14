import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { navigate } from '@reach/router';
import Autosuggest from "react-autosuggest";
import deburr from 'lodash/deburr';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NearMe from '@material-ui/icons/NearMe';
import Divider from '@material-ui/core/Divider';

import DirectionsIcon from '@material-ui/icons/Directions';

import ContentLoader from "react-content-loader"
import CircularProgress from '@material-ui/core/CircularProgress';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { updateGoogLocationSearchText, selectGoogLocation } from './actions';

import TrendingUp from '@material-ui/icons/TrendingUp';

import ParkingcitSvg from '../../svgIcons/ParkingCitIl.js'
import ProptaxSvg from '../../svgIcons/PropTaxIl.js'
import BusinessLic from '../../svgIcons/businessLic.js'
import Utilitybill from '../../svgIcons/utbIl.js';

import {
    updateServciceSearchText,
    selectServiceTemplateId
} from "./actions";
import { trackInput, trackClick } from '../common/tracking';


const styles = theme => ({
    index_page_ser_suggestions_container: {
        margin: theme.spacing.unit,
        display: 'flex',
        width: '300px',
        justifyContent: 'center',
        position: 'relative'
    },
    index_area_search_search_paper_root: {
        display: 'flex',
        alignItems: 'center',
        border: `1px solid #d4d4d4`,
        boxShadow: 'none',
        borderRadius: '4px',
        '&:hover': {
        },
    },
    index_area_search_search_input: {
        flex: 1,
        padding: '6px',
        fontSize: "16px",
        fontWeight: 500,
        fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
        lineHeight: "1.46429em",
        width: '100%',
        color: "rgba(30, 30, 50,0.99)",
    },
    index_area_search_search_suggestions: {
        position: 'absolute',
        zIndex: '200',
        display: 'flex',
        top: '142px',
        left: '-4px',
        width: '100%',
        flexDirection: 'column',
    },
    ser_gloss_search_paper_root: {
        display: 'flex',
        alignItems: 'center',
        borderTop: 'none',
        border: `1px solid #d4d4d4`,
        boxShadow: 'none',
        borderRadius: '4px',
        '&:hover': {

        },
    },
    ser_suggestion_title_icon: {
        marginRight: theme.spacing.unit
    },
    ser_suggestion_title: {
        fontSize: '10px',
        fontWeight: '300',
        letterSpacing: '0.3em',
    },
    index_page_search_iconButton: {
        minHeight: '1em',
        fontSize: '18px',
        color: theme.palette.primary['500'],
        marginLeft: '12px',
    },
index_page_ser_control_items:{
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
},
    ser_gloss_search_input: {
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
    suggestionsContainerOpen:{
        position: 'absolute',
        width: '100%',
        top: '142px',
        left: '-4px',
        zIndex: '10',
    },
    ser_suggestion_title_container: {
        display: 'flex',
        padding: theme.spacing.unit,
        alignItems: 'center',
        background: '#fafafa',
        borderBottom: `1px solid ${theme.palette.primary['100']}`,
    },
    suggestionsList: {
        listStyle: 'none',
        padding: theme.spacing.unit,
        marginTop: 0,
    },
    sectionTitle: {
        margin: 0
    },
    index_page_ser_suggestions_container_mob: {
        display: 'flex',
        margin: theme.spacing.unit*2,
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
    },
    index_page_ser_suggestions_container_mob__focussed:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
    },
    index_page_ser_suggestions_container_form: {
        width: '100%',
        marginLeft: 0,
    },
    index_page_touched_paper_header:{
        border: `1px solid ${theme.palette.primary['100']}`,
        boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)',
        position: 'absolute',
        left: '-320px',
        top: '0px',    
        padding: theme.spacing.unit,
        width: '320px',
        zIndex: '200',
    },
    index_page_touched_paper:{
        border: `1px solid ${theme.palette.primary['100']}`,
        boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)',
        position: 'absolute',
        padding: theme.spacing.unit,
        width: '100%',
        zIndex: '200',
        top: '-140px',
    }
});

const SuggestionContentLoader = props => (
    <ContentLoader
        height={360}
        width={400}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3">
        <rect x="-6" y="33" rx="0" ry="0" width="394" height="27"/>
        <rect x="0" y="98" rx="0" ry="0" width="394" height="27"/>
        <rect x="2" y="163" rx="0" ry="0" width="394" height="27"/>
        <rect x="0" y="225" rx="0" ry="0" width="394" height="27"/>
        <rect x="0" y="287" rx="0" ry="0" width="394" height="27"/>
    </ContentLoader>
)


class MobileSuggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: 'Search for Parking Citations, Licences ..',
            showSuggestions: false,
            touched: false,
            staticServiceTemplates: [{
                "title": "Popular Services",
                "icon": null,
                "suggestions": [
                  {
                    "icon": (<ParkingcitSvg style={{ width: '24px', height: '24px' }} />),
                        "name": "Pay Parking Citation",
                        "id": "0bbec7f3-7c54-4ce8-8356-8494835e2ef3"
                    },
                    {
                      "icon": (<BusinessLic style={{ width: '24px', height: '24px' }} />),
                        "name": "Renew Business Licence",
                        "id": "b6a31bb0-90d7-4806-8a05-6e45c5485215"
                    },
                    {
                      "icon": (<ProptaxSvg style={{ width: '24px', height: '24px' }} />),
                        "name": "Pay Property Taxes",
                        "id": "f26d145a-8058-4ec3-bb44-7baa82d3fa21"
                    },
                    {
                      "icon": (<Utilitybill style={{ width: '24px', height: '24px' }} />),
                        "name": "Pay Utility Bill",
                        "id": "6e9a7e19-2f41-4a43-bb56-e7f61944aaf0"
                    }
                ]
            }],
            "filtered": []
        }

        // presentation
        this.renderInput = this.renderInput.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);

        this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
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
        this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    }


    renderSectionTitle(section) {
        const { classes } = this.props;
        return (
            <div className={classes.ser_suggestion_title_container}>
                <TrendingUp
                    className={classes.ser_suggestion_title_icon}
                    fontSize="small" />
                <Typography align="left" variant="button" className={classes.ser_suggestion_title}>
                    {section.title}
                </Typography>
            </div>
        );
    }

    getSectionSuggestions(section) {
        return section.suggestions;
    }

    onFocus() {
        this.setState({
            showSuggestions: true
        })
    }

    renderSuggestionsContainer(options) {
        const { containerProps, children } = options;

        return (
            <Paper  {...containerProps} square>
                {children}
            </Paper>
        );
    }

    renderSuggestion(suggestion, { query, isHighlighted }) {

        // inline style for demonstration purpose
        const style = isHighlighted
            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
            : { backgroundColor: '#ffffff', cursor: 'pointer' };

        return (
            <div style={{ padding: '8px', display: 'flex', alignItems: 'center', width: '100%', ...style }}
            >   {suggestion.icon}
                <Typography style={{ marginLeft: '8px' }} align="left" variant="body1">
                    {suggestion.name}
                </Typography>
            </div>
        );
    }

    handleFocus = () => {
        this.setState({
            touched: true,
        })
    }

    handleAreaChange = address => {
        this.props.setSearchText(address)
    };

    handleSelect = address => {
        const { setGoogleLoc } = this.props;

        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => setGoogleLoc(latLng))
            .catch(error => console.error('Error', error));
        this.props.setSearchText(address)
        this.searchInput.blur();
    }

    issueFreeSearch() {
        this.props.onSearch();
    }

    blurInputs = () => {
        this.setState({
            touched: false,
            showSuggestions: false,
        })
    }

    renderInput(inputProps) {
        const { classes } = this.props;


        return (
            <Paper className={classes.ser_gloss_search_paper_root} elevation={2}>
              <label for="mob_ser_suggestions" style={{display: 'none'}}>
                Search Services
              </label>
                <SearchIcon className={classes.index_page_search_iconButton} aria-label="search" />
                <InputBase id="mob_ser_suggestions" inputProps={inputProps} className={classes.ser_gloss_search_input} />
            </Paper>
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
            this.props.updateSearch(newValue)
        }
    }

    selectSuggestion(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
        event.preventDefault();
        this.props.selectService(suggestion.id);
        this.props.onSearch()
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

        const filtered = inputLength === 0
            ? suggestions
            : suggestions.filter(suggestion =>
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
      const { locationSearchText, areaGuessResult, selectedLocationLatLng,inHeader } = this.props;

        const searchOptions = {
            types: ['(cities)'],
          componentRestrictions: {
            'country': 'us'
          }
        }

        let autoFilled = false;
        let showInput = '';
        const { lat, lng, city_name } = areaGuessResult;

        if (city_name) {
            autoFilled = true;
            showInput = city_name;
        }

      if (selectedLocationLatLng && 'addr' in selectedLocationLatLng) {
      const { addr } = selectedLocationLatLng;
      if (addr) {
        autoFilled = true;
        showInput = addr;
      }
    }


        if (!showInput) {
            autoFilled = false;
            showInput = locationSearchText
        }

        if (this.state.touched) {
            autoFilled = false;
            showInput = locationSearchText;
        }

        if (serviceSearchText) {
            suggestions = this.state.filtered
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
            getSuggestionValue: (suggestion) => suggestion.id,
            onSuggestionSelected: this.selectSuggestion,
            renderSuggestion: this.renderSuggestion,
            renderSectionTitle: this.renderSectionTitle,
            onSuggestionsClearRequested: () => { },
            getSectionSuggestions: this.getSectionSuggestions,
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
            sectionTitle: classes.sectionTitle,
        }

        const touchedInputs = this.state.touched || this.state.showSuggestions;
        if (inHeader && !touchedInputs){
            return ( 
                <div style={{display: 'flex'}}>
                    <Button
                        color="primary"
                        size="small"
                        className={classes.ser_gloss_menu_button}
                        onClick={this.onFocus}
                        aria-label="share">
                        <SearchIcon fontSize="small" />
                    </Button>
                </div>
            )
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
              <Paper
                className={
                  inHeader
                    ? classes.index_page_touched_paper_header
                    : classes.index_page_touched_paper
                }
              >
                <div className={classes.index_page_ser_control_items}>
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.blurInputs}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.props.onSearch()}
                    className={classes.button}
                  >
                    Search
                  </Button>
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
                    !autoFilled && (showInput && showInput.length > 1)
                  }
                  googleCallbackName={
                    inHeader ? `initHeader` : `initIndex`
                  }
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
                          classes.index_area_search_search_paper_root
                        }
                        elevation={2}
                        aria-label="area-list"
                      >
                        {loading ? (
                          <CircularProgress size={24} />
                        ) : (
                          <NearMe
                            className={
                              classes.index_page_search_iconButton
                            }
                            aria-label="near-me"
                          />
                        )}

                        <InputBase
                            inputProps={{
                              "aria-label": "search locations",
                              "aria-autocomplete": "list",
                              "aria-haspopup": "true",
                              role: "combobox",
                              "aria-expanded": "true",
                              "aria-controls": "mob_suggestions_1",
                            }}
                          {...getInputProps({
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
                        role="listbox"
                        id="mob_suggestions_1"
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
                                  style={{ margin: "16px" }}
                                  {...getSuggestionItemProps(
                                    suggestion,
                                    {
                                      className,
                                      style
                                    }
                                  )}
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
                <Divider />
                <form
                  onSubmit={this.onSubmit}
                  className={
                    classes.index_page_ser_suggestions_container_form
                  }
                >
                  <Autosuggest
                    id="serviceSuggestions_mob_1"
                    {...autosuggestProps}
                    inputProps={inputProps}
                    theme={theme}
                  />
                </form>
              </Paper>
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
                    !autoFilled && (showInput && showInput.length > 1)
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
                      <Paper
                        className={
                          classes.index_area_search_search_paper_root
                        }
                        elevation={2}
                        aria-label="area-list"
                      >
                        {loading ? (
                          <CircularProgress size={24} />
                        ) : (
                          <NearMe
                            className={
                              classes.index_page_search_iconButton
                            }
                            aria-label="near-me"
                          />
                        )}

                        <InputBase
                              inputProps={{
                                "aria-label": "search locations",
                                "aria-autocomplete": "list",
                                "aria-haspopup": "true",
                                role: "combobox",
                                "aria-expanded": "true",
                                "aria-controls": "mob_suggestions_2",
                              }}
                          {...getInputProps({
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
                        id="mob_suggestions_2"
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
                                  {...getSuggestionItemProps(
                                    suggestion,
                                    {
                                      className,
                                      style
                                    }
                                  )}
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
                <Divider />
                <form
                  onSubmit={this.onSubmit}
                  className={
                    classes.index_page_ser_suggestions_container_form
                  }
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

const mapDispatchToProps = (dispatch) => {
    return {
        selectService: (id) => {
            dispatch(selectServiceTemplateId(id));
        },
        updateSearch: (text) => {
            dispatch(updateServciceSearchText(text));
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

const ConnSerSuggest = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MobileSuggestions));

export default ConnSerSuggest;