import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {navigate} from '@reach/router';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import {fade} from "@material-ui/core/styles/colorManipulator";

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import Input from "@material-ui/core/Input";
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Autosuggest from "react-autosuggest";

import withRoot from '../../withRoot';
import {fetchSearchSuggestions, clearInput, updateInput, setSearchSuggesitions, fetchSearchResults} from "./actions.js";

import { trackInput, trackClick} from '../common/tracking';

const styles = theme => ({
    header_suggest_wrapper: {
        fontFamily: theme.typography.fontFamily,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: theme.spacing.unit,
         border : `1px solid ${theme.palette.primary['100']}`,
    boxShadow : `0 1px 1px ${theme.palette.primary['50']}`,
    '&:hover' : {
        boxShadow: `0 1px 1px ${theme.palette.primary['100']}`,
          background: fade(theme.palette.common.white, 0.25)
    },
        background: theme.palette.primary["A200"],
        borderRadius: 3,
        "& $input": {
            transition: theme
                .transitions
                .create("width"),
            width: "100%"
        },
        "& $form": {
            transition: theme
                .transitions
                .create("width"),
            width: "100%"
        }
    },
    header_suggest_search: {
        width: theme.spacing.unit * 8,
        color: theme.palette.primary["200"],
        height: '36px',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    header_suggest_input: {
        font: "inherit",
        paddingLeft: theme.spacing.unit,
        border: 1,
        display: "flex",
        verticalAlign: "middle",
        whiteSpace: "normal",
        background: "inherit",
        margin: 0, // Reset for Safari
        color: theme.palette.common.dark,
        width: "100%",
        "&:focus": {
            outline: 0
        },
        "&:before": {
            display: "none"
        },
        "&:after": {
            display: "none"
        }
    },
    header_suggest_sectionTitle: {
        marginLeft: theme.spacing.unit * 1.5,
        marginTop: theme.spacing.unit,
        textTransform: "capitalize",
        fontSize: "0.95rem",
        fontWeight: 700,
        lineHeight: "2.75em",
        color: "rgba(30, 30, 50,0.54)"
    },
    header_suggest_container: {
        flexGrow: 1,
        position: "relative"
    },
    header_suggest_suggestionsContainerOpen: {
        position: "absolute",
        padding: theme.spacing.unit * 1,
        marginTop: 0,
           border : `1px solid ${theme.palette.primary['100']}`,
    boxShadow : `0 1px 1px ${theme.palette.primary['50']}`,
    '&:hover' : {
        boxShadow: `0 1px 1px ${theme.palette.primary['100']}`
    },
        background: theme.palette.common.white,
        borderRadius: 2,
        paddingBottom: theme.spacing.unit * 3,
        zIndex: 2000,
        left: 0,
        right: 0,
        overflow: 'hidden',
        overflowX: 'hidden'
    },
    header_suggest_suggestion: {
        display: "block"
    },
    header_suggest_suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none"
    }
});

class HeaderSuggestBox extends Component {
    constructor(props) {
        super(props);
        this.renderInput = this
            .renderInput
            .bind(this);
        this.renderSuggestionsContainer = this
            .renderSuggestionsContainer
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSuggestionsClearRequested = this
            .handleSuggestionsClearRequested
            .bind(this);
        this.handleSuggestionsFetchRequested = this
            .handleSuggestionsFetchRequested
            .bind(this);
        this.renderSuggestion = this
            .renderSuggestion
            .bind(this);
        this.getSuggestionValue = this
            .getSuggestionValue
            .bind(this);
        this.selectSuggestion = this
            .selectSuggestion
            .bind(this);
        this.renderSuggestionsContainer = this
            .renderSuggestionsContainer
            .bind(this);
        this.getSectionSuggestions = this
            .getSectionSuggestions
            .bind(this);
        this.renderSectionTitle = this
            .renderSectionTitle
            .bind(this);
        this.clearInput = this
            .clearInput
            .bind(this);
        this.issueFreeSearch = this
            .issueFreeSearch
            .bind(this);
        this.shouldRenderSuggestions = this
            .shouldRenderSuggestions
            .bind(this);
    }

    renderSectionTitle(section) {
        const {classes} = this.props;
        return (
            <div>
                <Typography align="left" variant="title" className={classes.header_suggest_sectionTitle}>
                    {section.title}
                </Typography>
            </div>
        );
    }

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(clearInput());
        const results = {
            results: []
        }
        dispatch(setSearchSuggesitions(results));   
    }

    getSectionSuggestions(section) {
        return section.suggestions;
    }

    getSuggestionValue(suggestion) {
        return suggestion.head;
    }

    renderSuggestionsContainer(options) {
        const {containerProps, children} = options;

        return (
            <Paper {...containerProps} square>
                {children}
            </Paper>
        );
    }

    renderSuggestion(suggestion, {query, isHighlighted}) {
        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    <div>
                        <Typography align="left" variant="body2">
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
        const {dispatch} = this.props;
        dispatch(clearInput());
        const uri = `/search/`;
        const encodedUri = encodeURI(uri);
        navigate(encodedUri);
    }

    issueFreeSearch() {
        const {search, dispatch} = this.props;
        const {input} = this.props.search;
        if (!input || input.length < 3) {
            return null;
        }

        const uri = `/search/?q=${input}`;
        const encodedUri = encodeURI(uri);
        dispatch(trackInput('header_search_box', input));
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
        const {classes, search, bold} = this.props;
        const {searchSuggestionsLoading, input} = search;

        return (
            <div className={classes.header_suggest_wrapper}>
                <Input
                    value={value}
                    placeholder={placeholder}
                    inputRef={ref}
                    className={classes.header_suggest_input}
                    inputProps={{
                    "aria-label": "Description",
                    ...other
                }}/>
                <div className={classes.header_suggest_search}>
                    {searchSuggestionsLoading
                        ? <CircularProgress size={24} color="inherit"/>
                        : input
                            ? <IconButton aria-label="Clear" color="inherit" onClick={this.clearInput}>
                                    <CloseIcon/>
                                </IconButton>
                            : <IconButton onClick={this.issueFreeSearch} aria-label="Search" color="inherit">
                                <SearchIcon/>
                            </IconButton>}
                </div>
            </div>
        );
    }

    handleSuggestionsFetchRequested({value}) {
        const {dispatch} = this.props;
        if (value && value.length > 1) {
            dispatch(fetchSearchSuggestions);
        }
    }

    handleSuggestionsClearRequested() {
        const {dispatch} = this.props;
        dispatch(clearInput());
    }

    handleChange(event, {newValue, method}) {
        const {dispatch} = this.props;
        event.preventDefault();
        if (method === "type") {
            dispatch(updateInput(newValue))
        }
    }

    selectSuggestion(event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) {
        const {dispatch} = this.props;
        const {input} = this.props.search;
        const {type, id, head} = suggestion;
        event.preventDefault();

        dispatch(trackInput('header_search_box', input));
        dispatch(trackClick('select_suggestion', type, id, head, suggestionIndex));

        navigate(`/${type}/${id}`);
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.issueFreeSearch();
    }

    shouldRenderSuggestions(value) {
        return true;
    }

    render() {
        const {classes} = this.props;

        const {input, searchSuggestions} = this.props.search;
        const {userCity} = this.props.search;

        let placeholder = `Look up a city or service`;

        if (userCity) {
            placeholder = `Try '${userCity}'`;
        }

        return (
            <form onSubmit={this.onSubmit} className={classes.header_suggest_container}>
                <Autosuggest
                    theme={{
                    container: classes.header_suggest_container,
                    suggestionsContainerOpen: classes.header_suggest_suggestionsContainerOpen,
                    suggestionsList: classes.header_suggest_suggestionsList,
                    suggestion: classes.header_suggest_suggestion
                }}
                    renderInputComponent={this.renderInput}
                    suggestions={searchSuggestions}
                    multiSection
                    renderSectionTitle={this.renderSectionTitle}
                    getSectionSuggestions={this.getSectionSuggestions}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                    renderSuggestionsContainer={this.renderSuggestionsContainer}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    onSuggestionSelected={this.selectSuggestion}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    inputProps={{
                    classes,
                    autoFocus: false,
                    placeholder: placeholder,
                    value: input,
                    onChange: this.handleChange,
                    onKeyDown: () => {},
                    onBlur: (event) => { event.preventDefault()},
                }}/>
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

export default connect(mapStateToProps)(withStyles(styles)(HeaderSuggestBox));
