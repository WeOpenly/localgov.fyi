import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {navigate} from '@reach/router';
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { withStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import withRoot from '../../withRoot';
import {
  fetchAreaSearchSuggestions,
  clearInput,
  updateInput,
  setSearchSuggesitions,
  selectOrganization,
} from "./actions";
import { trackInput, trackClick } from '../common/tracking';


const styles = theme => ({
  new_suggest_wrapper : {
    display: 'flex',
    position: 'relative',
    borderLeft: '1px solid #fafafa',
    background: theme.palette.common.white,
    fontFamily: theme.typography.fontFamily,
  },
new_suggest_progress_wrapper:{
  width: theme.spacing.unit * 8,
  background: theme.palette.primary["500"],
  height: theme.spacing.unit * 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
},
new_suggest_search : {
    width: theme.spacing.unit * 8,
    color: theme.palette.primary["200"],
    height: theme.spacing.unit * 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
new_suggest_searchButton : {
    height: '100%',
    borderRadius: 0,
  },
new_suggest_input : {
    fontFamily : theme.typography.fontFamily,
    padding :'14px',
    border: 1,
    display: "flex",
    verticalAlign: "middle",
    whiteSpace: "normal",
    background: "inherit",
    margin: 0, // Reset for Safari
    color: theme.palette.dark,
    width: "100%",
    // "&:focus": {
    //   outline: 0,
    //   background: fade(theme.palette.common.white, 0.25),
    //   boxShadow: `0 0 3px 1px ${theme.palette.primary["100"]}`
    // },
    "&:before": {
      display: "none"
    },
    "&:after": {
      display: "none"
    }
  },
  new_suggest_sectionTitle : {
    marginLeft: theme.spacing.unit * 1.5,
    marginTop: theme.spacing.unit,
    textTransform: "capitalize",
    fontSize: "0.95rem",
    fontWeight: 700,
    lineHeight: "2.75em",
    color: "rgba(30, 30, 50,0.54)"
  },
  new_suggest_container :{
    flexGrow: 1,
    position: "relative",
    margin: 0,
  },
new_suggest_suggestionsContainerOpen : {
    position: "absolute",
    padding: theme.spacing.unit * 1,
    marginTop: `4px`,
    background: "#fff",
    borderRadius: 1,
    border: `3px`,
    borderColor : 'rgba(0, 0, 0, 0.5)',
    paddingBottom: theme.spacing.unit * 3,
    zIndex: 200,
    left: 0,
    right: 0,
    overflow: "scroll"
  },
new_suggest_suggestion : {
    display: "block"
  },
new_suggest_suggestionsList : {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
});

class NewSuggestBox extends Component {
  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.selectSuggestion = this.selectSuggestion.bind(this);
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
    this.getSectionSuggestions = this.getSectionSuggestions.bind(this);
    this.renderSectionTitle = this.renderSectionTitle.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.issueFreeSearch = this.issueFreeSearch.bind(this);
    this.shouldRenderSuggestions = this.shouldRenderSuggestions.bind(this);
  }


  renderSectionTitle(section) {
    const { classes } = this.props;
    return (
      <div>
        <Typography align="left" variant="title" className={classes.new_suggest_sectionTitle}>
          {section.title}
        </Typography>
      </div>
    );
  }

  getSectionSuggestions(section) {
    return section.suggestions;
  }

  getSuggestionValue(suggestion) {
    return suggestion.org_name;
  }

  renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }

  handleBlur(event, { highlightedSuggestion}){
    event.preventDefault();
    event.stopPropagation();

  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          <div>
            <Typography align="left" variant="body2">
              {suggestion.heading}
            </Typography>
          </div>
          <div>
            <Typography align="left" variant="caption">
              {suggestion.subheading}
            </Typography>
          </div>
        </div>
      </MenuItem>
    );
  }

  clearInput() {
    const { dispatch } = this.props;

    dispatch(clearInput());
  }

  issueFreeSearch() {
    // https://github.com/ybv/openly/issues/451
    const { search, dispatch } = this.props;
    
    const { input, location } = this.props.search;
    if (!input || input.length < 3) {
      return null;
    }

    if (input !== location.org.name){
      const { serviceInput } = search;
      if (serviceInput) {

        const orgServiceTexturi = `/search/?q=${serviceInput}&org=${input}`;
        const orgServiceTextencodedUri = encodeURI(orgServiceTexturi);
        dispatch(trackInput('index_search_box', `${serviceInput} ${input}`));
        navigate(orgServiceTextencodedUri);
        return;
      }
    }

    if (location && location.org){
      const {serviceInput} = search;
      if (serviceInput && serviceInput.length > 2){
        const serviceTexturi = `/search/?q=${serviceInput}`;
        const serviceTextencodedUri = encodeURI(serviceTexturi);
        dispatch(trackInput('index_search_box', serviceInput));
        navigate(serviceTextencodedUri);
        return;
      }

      const {id} = location.org;
      const orgIdUri = `/organization/${id}/`;
      const encodedOrgIdUri = encodeURI(orgIdUri);
      dispatch(trackInput('index_search_box', input));
      navigate(encodedOrgIdUri);
      return;
    }

    const uri = `/search/?q=${input}`;
    const encodedUri = encodeURI(uri);
    dispatch(trackInput('index_search_box', input));
    navigate(encodedUri);
  }

  renderInput(inputProps) {
    const {
      home,
      placeholder,
      value,
      ref,
      onEnter,
      ...other
    } = inputProps;
    const { classes, search, bold } = this.props;
    const { searchSuggestionsLoading, input } = search;

    return (
      <div className={classes.new_suggest_wrapper}>
        <Input
          value={value}
          placeholder={inputProps.placeholder}
          inputRef={ref}
          className={classes.new_suggest_input}
          inputProps={{
            "aria-label": "Description",
            ...other
          }} />
        <div className={classes.new_suggest_search}>
          {searchSuggestionsLoading
? (
    <div className={classes.new_suggest_progress_wrapper}><CircularProgress size={24} color="#fff" thickness="4.6"/>
            </div>)
              : <Button
                  variant="contained"
                  color="primary"
                  onClick={this.issueFreeSearch}
                  aria-label="Search"
                  className={classes.new_suggest_searchButton}
                >
                <SearchIcon />
              </Button>}
        </div>
      </div>
    );
  }

  handleSuggestionsFetchRequested({ value }) {
    const { dispatch } = this.props;
    if (value && value.length > 1) {
      dispatch(fetchAreaSearchSuggestions);
    }
  }

  handleSuggestionsClearRequested() {
    const { dispatch } = this.props;
    // dispatch(clearInput());
  }

  handleChange(event, { newValue, method }) {
    const { dispatch } = this.props;

    if (method === "type" ){
      dispatch(updateInput(newValue))
    }
  }

  selectSuggestion(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    event.preventDefault();
    event.stopPropagation();
    const { dispatch } = this.props;
    const { input, userCountry } = this.props.search;
    const { id, heading } = suggestion;
    dispatch(selectOrganization(suggestion));
    dispatch(updateInput(heading));
    dispatch(trackInput('index_search_box', input));
    dispatch(trackClick('select_suggestion', 'organization', id, heading, suggestionIndex));
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.issueFreeSearch();
  }

  shouldRenderSuggestions(value) {
    if (value)
      return true;
    return false;
  }

  render() {
    const { classes } = this.props;
    const { input, searchSuggestions } = this.props.search;
    const { userCity } = this.props.search;
    const value =  input;


    let placeholder = "Location";
    if (userCity) placeholder = `Try '${userCity}'`;

    return (
      <form onSubmit={this.onSubmit} className={classes.new_suggest_container}>
        {/* renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions} */}
        <Autosuggest
          theme={{
            container: classes.new_suggest_container,
            suggestionsContainerOpen: classes.new_suggest_suggestionsContainerOpen,
            suggestionsList: classes.new_suggest_suggestionsList,
            suggestion: classes.new_suggest_suggestion
          }}
          renderInputComponent={this.renderInput}
          suggestions={searchSuggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={() => {}}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionSelected={this.selectSuggestion}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          inputProps={{
            autoFocus: false,
            type : 'search',
            classes,
            placeholder: placeholder,
            value: value,
            onChange: this.handleChange,
            onBlur: this.handleBlur,
          }}
        />
      </form>
    );
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NewSuggestBox));
