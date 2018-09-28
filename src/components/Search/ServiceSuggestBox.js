import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { navigateTo } from 'gatsby-link';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AttachMoney from '@material-ui/icons/AttachMoney';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import withRoot from '../../withRoot';
import {
  fetchServiceSearchSuggestions,
  clearServiceInput,
  updateServiceInput,
  setServiceSuggestions,
} from "./actions";
import { trackInput, trackClick } from './tracking';


const styles = theme => ({
  wrapper : {
    fontFamily: theme.typography.fontFamily,
    position: "relative",
    background: theme.palette.common.white,
    display: "flex",
  },
  search : {
    width: theme.spacing.unit * 8,
    color: theme.palette.primary["200"],
    height: theme.spacing.unit * 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  input : {
    fontFamily : theme.typography.fontFamily,
    padding :theme.spacing.unit*2,
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
  sectionTitle : {
    marginLeft: theme.spacing.unit * 1.5,
    marginTop: theme.spacing.unit,
    textTransform: "capitalize",
    fontSize: "0.95rem",
    fontWeight: 700,
    lineHeight: "2.75em",
    color: "rgba(30, 30, 50,0.54)"
  },
  container : {
    flexGrow: 1,
    position: "relative",
  },
  suggestionsContainerOpen : {
    position: "absolute",
    padding: theme.spacing.unit * 1,
    marginTop : `4px`,
    boxShadow : `0 0 1px 1px #36454f`,
    background: "#fff",
    borderRadius: 1,
    border : `1px solid #36454f`,
    paddingBottom: theme.spacing.unit * 3,
    zIndex: 200,
    left: 0,
    right: 0,
    overflow: "scroll"
  },
  suggestion : {
    display: "block"
  },
  suggestionsList : {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
});

class ServiceSuggestBox extends Component {
  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(clearServiceInput());
    const results = {
      results: []
    }
    dispatch(setServiceSuggestions(results));
  }

  renderSectionTitle(section) {
    const { classes } = this.props;
    return (
      <div>
        <Typography align="left" variant="title" className={classes.sectionTitle}>
          {section.title}
        </Typography>
      </div>
    );
  }

  getSectionSuggestions(section) {
    return section.suggestions;
  }

  getSuggestionValue(suggestion) {
    return suggestion;
  }

  renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          <div>
            <Typography align="left" variant="title">
              {suggestion.head}
            </Typography>
          </div>
          <div>
            <Typography align="left" variant="caption">
              {suggestion.subhead}
            </Typography>
          </div>
        </div>
      </MenuItem>
    );
  }

  clearInput() {
    const { dispatch } = this.props;
    dispatch(clearServiceInput());
  }

  issueFreeSearch() {
    const { search, dispatch } = this.props;
    const {serviceInput, selectedOrganization} = search;

    if (!serviceInput || serviceInput.length < 3) {
      if (selectedOrganization){
        const {id} = selectedOrganization;
        const uri = `/organization/${id}`;
        const encodedUri = encodeURI(uri);
        navigateTo(encodedUri);
      }
      return null;
    }

    const uri = `/search/${serviceInput}`;
    const encodedUri = encodeURI(uri);
    dispatch(trackInput('index_search_box', serviceInput));
    navigateTo(encodedUri);
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
    const { serviceSuggestionsLoading, serviceInput } = search;

    return (
      <div className={classes.wrapper}>
        <Input
          value={value}
          placeholder={inputProps.placeholder}
          inputRef={ref}
          className={classes.input}
          inputProps={{
            "aria-label": "Description",
            ...other
          }} />
        <div className={classes.search}>
          {serviceSuggestionsLoading
            ? <CircularProgress size={24} color="primary" />
            : serviceInput
              ? <IconButton aria-label="Clear" onClick={this.clearInput}>
                <CloseIcon />
              </IconButton>
              : null}
        </div>
      </div>
    );
  }

  handleSuggestionsFetchRequested({ value }) {
    const { dispatch } = this.props;
    if (value && value.length > 1) {
      dispatch(fetchServiceSearchSuggestions);
    }
  }

  handleSuggestionsClearRequested() {
    const { dispatch } = this.props;
    dispatch(clearServiceInput());
  }

  handleChange(event, { newValue, method }) {
    const { dispatch } = this.props;
    if (method === "type" ){
      dispatch(updateServiceInput(newValue))
    }
  }

  selectSuggestion(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { serviceInput, userCountry } = this.props.search;
    const { id, heading } = suggestion;
    navigateTo(`/service/${id}`);
    dispatch(trackInput('index_search_box', serviceInput));
    dispatch(trackClick('select_suggestion', 'service', id, heading, suggestionIndex));
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
    const { serviceInput, serviceSuggestions } = this.props.search;
    const placeholder = "Search for Parking Tickets, Permits, Licenses…";

    return (
      <form onSubmit={this.onSubmit} className={classes.container}>
        {/* renderSectionTitle={this.renderSectionTitle}
        getSectionSuggestions={this.getSectionSuggestions} */}
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          highlightFirstSuggestion
          renderInputComponent={this.renderInput}
          suggestions={serviceSuggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionSelected={this.selectSuggestion}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          inputProps={{
            autoFocus: true,
            classes,
            placeholder: placeholder,
            value: serviceInput,
            onChange: this.handleChange,
            onKeyDown: () => {},
            onBlur: (event) => { event.preventDefault() },
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

export default connect(mapStateToProps)(withRoot(withStyles(styles)(ServiceSuggestBox)));
