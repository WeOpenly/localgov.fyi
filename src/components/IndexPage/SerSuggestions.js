import React, { Component } from 'react';
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
import FormLabel from '@material-ui/core/FormLabel';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  ser_gloss_search_paper_root: {
    display: "flex",
    alignItems: "center",
    boxShadow:
      "0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.07)",
    border: `1px solid ${theme.palette.primary["200"]}`,
    borderRadius: "4px",
    "&:hover": {
      boxShadow: `0 4px 8px 0 #d4d4d4, 0 1px 16px 0 #fafafa inset`,
      border: `1px solid ${theme.palette.primary["500"]}`
    }
  },
  ser_gloss_search_paper_root_header: {
    display: "flex",
    alignItems: "center",
    position: "relative",

    height: "40px",
    boxShadow: "none",
    background: "#fafafa",
    border: `1px solid ${theme.palette.primary["100"]}`,
    borderRadius: "4px",
    "&:hover": {
      boxShadow: `0 4px 8px 0 #dfdfdf, 0 1px 16px 0 #fafafa inset`,
      border: `1px solid ${theme.palette.primary["500"]}`
    }
  },
  suggestionsContainerOpen: {
    position: "absolute",
    width: theme.spacing.unit * 49,
    zIndex: "300",
    boxShadow:
      "0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.07)"
  },
  ser_suggestion_title_icon: {
    marginRight: theme.spacing.unit
  },
  ser_suggestion_title: {
    fontSize: "10px",
    fontWeight: "300",
    letterSpacing: "0.3em"
  },
  index_page_search_iconButton_container: {
    cursor: "pointer",
    height: "44px",
    width: "48px",
    display: "flex",
    alignItems: "center",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    justifyContent: "center",
    background: theme.palette.primary["500"],
    "&:hover": {
      background: theme.palette.primary["700"]
    }
  },
  index_page_search_iconButton_container_header: {
    cursor: "pointer",
    height: "40px",
    width: "48px",
    display: "flex",
    alignItems: "center",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    justifyContent: "center",
    background: "#d4d4d4",
    "&:hover": {
      background: theme.palette.primary["700"]
    }
  },
  index_page_search_iconButton_header: {
    minHeight: "0.9em",
    fontSize: "18px",
    color: theme.palette.primary["700"],
    "&:hover": {
     color: '#fff'
    }
  },
  index_page_search_iconButton: {
    minHeight: "1em",
    fontSize: "18px",
    color: "#fff"
  },
  ser_gloss_search_input: {
    flex: 1,

    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    fontSize: "16px",
    fontWeight: 500,
    fontFamily:
      '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
    lineHeight: "1.46429em",
    width: "100%",
    color: "rgba(30, 30, 50,0.99)"
  },
  ser_suggestion_title_container: {
    display: "flex",
    padding: theme.spacing.unit,
    alignItems: "center",
    background: "#fafafa",
    borderBottom: `1px solid ${theme.palette.primary["100"]}`
  },
  suggestionsList: {
    listStyle: "none",
    padding: theme.spacing.unit,
    marginTop: 0
  },
  sectionTitle: {
    margin: 0
  },
  index_page_ser_suggestions_container: {
    display: "flex",
    width: theme.spacing.unit * 50,
    margin: 0
  },
  index_page_ser_suggestions_container_form: {
    width: "100%",
    margin: `${theme.spacing.unit}px ${theme.spacing.unit}px ${
      theme.spacing.unit
    }px 0`,
    marginLeft: 0
  },
  index_page_ser_suggestions_container_form_header: {
    width: "100%",
    marginLeft: 0,
    position: "relative"
  }
});

class SerSuggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: 'Search for Parking Citations, Licences ..',
            showSuggestions: true,
            staticServiceTemplates: [{
                "title": "Popular Services",
                "icon": null,
                "suggestions": [
                  {
                    "icon": (<ParkingcitSvg style={{ width: '32px', height: '18px' }} />),
                    "name": "Pay Parking Citation",
                    "id": "0bbec7f3-7c54-4ce8-8356-8494835e2ef3"
                  },
                  {
                    "icon": (<BusinessLic style={{ minWidth: '32px', height: '20px' }} />),
                    "name": "Renew Business Licence",
                    "id": "b6a31bb0-90d7-4806-8a05-6e45c5485215"
                  },
                  {
                    "icon": (<ProptaxSvg style={{ minWidth: '32px', height: '24px' }} />),
                    "name": "Pay Property Taxes",
                    "id": "f26d145a-8058-4ec3-bb44-7baa82d3fa21"
                  },
                  {
                    "icon": (<Utilitybill style={{ minWidth: '32px', height: '24px' }} />),
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

    onFocus(){
        this.setState({
            showSuggestions: true
        })
    }

    renderSuggestionsContainer(options) {
        const { containerProps, children } = options;

        return (
            <Paper {...containerProps}  square>
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
            <div style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'left', width: '240px', ...style }}
            >   {suggestion.icon}
                    <Typography style={{marginLeft: '8px'}} align="left" variant="body1">
                        {suggestion.name}
                    </Typography>
                </div>
        );
    }


    issueFreeSearch() {
        this.props.onSearch();
    }

    renderInput(inputProps) {
        const { classes, inHeader } = this.props;


        return (
          <Paper
            className={
              inHeader
                ? classes.ser_gloss_search_paper_root_header
                : classes.ser_gloss_search_paper_root
            }
            elevation={2}
          >
            <InputBase
              inputProps={inputProps}
              className={classes.ser_gloss_search_input}
            />
            <div
              onClick={this.props.onSearch}
              className={inHeader ? classes.index_page_search_iconButton_container_header : classes.index_page_search_iconButton_container}
            >
              <SearchIcon
                className={inHeader ? classes.index_page_search_iconButton_header : classes.index_page_search_iconButton}
                aria-label="search"
              />
            </div>
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
        event.preventDefault();
        if (method === "type") {
            this.props.updateSearch(newValue)
        }
    }

    selectSuggestion(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {

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
        const suggestions =  this.state.staticServiceTemplates[0].suggestions;
        
        const filtered =  inputLength === 0
            ? suggestions
            : suggestions.filter(suggestion =>
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
            renderSuggestion: this.renderSuggestion,
            renderSectionTitle:this.renderSectionTitle,
            onSuggestionsClearRequested: () => {},
            getSectionSuggestions: this.getSectionSuggestions,
        };

        const inputProps = {
          onChange: this.handleChange,
          type: "search",
            "aria-label": "Service Suggestions",
            
          placeholder: this.state.placeholder,
          value: serviceSearchText ? serviceSearchText : ""
        };
        
        const theme = {
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            sectionTitle: classes.sectionTitle,
        }

        return (

             <div className={classes.index_page_ser_suggestions_container}>
            <form onSubmit={this.onSubmit} className={!inHeader ? classes.index_page_ser_suggestions_container_form : classes.index_page_ser_suggestions_container_form_header }>
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

const mapDispatchToProps = (dispatch) => {
  return {
    selectService: (id) => {
        dispatch(selectServiceTemplateId(id));
    },
    updateSearch: (text) => {
        dispatch(updateServciceSearchText(text));
    }
  }
}


const mapStateToProps = function (state, ownProps) {
    return {
        ...state.indexPage,
        ...ownProps
    };
};

const ConnSerSuggest = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SerSuggest));

export default ConnSerSuggest;