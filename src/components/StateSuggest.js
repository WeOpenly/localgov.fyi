import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FilterList from '@material-ui/icons/FilterList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import {isMobileOnly, isTablet, isMobile} from 'react-device-detect';
import {withStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import {throws} from 'assert';

const suggestions = [
    {
        label: 'Afghanistan'
    }, {
        label: 'Aland Islands'
    }, {
        label: 'Albania'
    }, {
        label: 'Algeria'
    }, {
        label: 'American Samoa'
    }, {
        label: 'Andorra'
    }, {
        label: 'Angola'
    }, {
        label: 'Anguilla'
    }, {
        label: 'Antarctica'
    }, {
        label: 'Antigua and Barbuda'
    }, {
        label: 'Argentina'
    }, {
        label: 'Armenia'
    }, {
        label: 'Aruba'
    }, {
        label: 'Australia'
    }, {
        label: 'Austria'
    }, {
        label: 'Azerbaijan'
    }, {
        label: 'Bahamas'
    }, {
        label: 'Bahrain'
    }, {
        label: 'Bangladesh'
    }, {
        label: 'Barbados'
    }, {
        label: 'Belarus'
    }, {
        label: 'Belgium'
    }, {
        label: 'Belize'
    }, {
        label: 'Benin'
    }, {
        label: 'Bermuda'
    }, {
        label: 'Bhutan'
    }, {
        label: 'Bolivia, Plurinational State of'
    }, {
        label: 'Bonaire, Sint Eustatius and Saba'
    }, {
        label: 'Bosnia and Herzegovina'
    }, {
        label: 'Botswana'
    }, {
        label: 'Bouvet Island'
    }, {
        label: 'Brazil'
    }, {
        label: 'British Indian Ocean Territory'
    }, {
        label: 'Brunei Darussalam'
    }
];

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight
                        ? (
                            <span
                                key={String(index)}
                                style={{
                                fontWeight: 500
                            }}>
                                {part.text}
                            </span>
                        )
                        : (
                            <strong
                                key={String(index)}
                                style={{
                                fontWeight: 300
                            }}>
                                {part.text}
                            </strong>
                        );
                })}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value, stateSuggestions) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : stateSuggestions.filter(suggestion => {
            const keep = count < 5 && suggestion
                .label
                .slice(0, inputLength)
                .toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

const styles = theme => ({
    gloss_state_suggest_root: {
        padding: '4px 8px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        boxShadow: `0 0 1px 0 ${theme.palette.primary['300']}`
    },
    gloss_state_suggest_root_mob: {
        padding: '4px 8px',
        marginTop: theme.spacing.unit *2,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxShadow: `0 0 1px 0 ${theme.palette.primary['300']}`
    },
    input: {
        marginLeft: 12,
        padding: 8,
        flex: 1
    },
    iconButton: {
        padding: 12
    },
    divider: {
        width: 1,
        height: 32,
        margin: 4
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 100,
        width: 320,
        left: 8,
        top: 56,
        border: `1px solid ${theme.palette.primary['100']}`,
         borderRadius: '2px',
       boxShadow: `0 5px 10px 0 #f1f1f1`,
    },
    suggestion: {
        display: 'block'
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        height: theme.spacing.unit * 25,
        overflowY: 'scroll',
        listStyleType: 'none'
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

class IntegrationAutosuggest extends React.Component {
    state = {
        single: '',
        popper: '',
        filteredSuggestions: [],
        suggestions: [],
        shouldRenderSuggestions: false
    };

    componentDidMount = () => {
        if (this.props.selected) 
            this.setState({single: this.props.selected})
        if (this.props.allStates) 
            this.setState({suggestions: this.props.allStates})
    }

    handleSuggestionsFetchRequested = ({value}) => {
    
        this.setState({
            filteredSuggestions: getSuggestions(value, this.props.allStates)
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({shouldRenderSuggestions: false});
    };

    selectSuggestion = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
        event.preventDefault();
        this.props.onSelectSuggestion(suggestion);
        this.setState({shouldRenderSuggestions: false}, () => console.log("selectSuggestion done"));
    }

    handleChange = name => (event, {newValue}) => {
        this.setState({[name]: newValue});
        if (newValue === '') {
            this.props.clearStateName();
        }

    };

    toggleAllSuggestions = () => {
        this.setState({
            shouldRenderSuggestions: !this.state.shouldRenderSuggestions
        })
    }

    renderInputComponent = (inputProps) => {
        const {
            classes,
            inputRef = () => {},
            ref,
            ...other
        } = inputProps;

        return (
            <Paper className={classes.gloss_state_suggest_root} elevation={1}><InputBase
                className={classes.input}
                placeholder="Search states"
                {...other}
                inputRef={node => {
                ref(node);
                inputRef(node);
            }}/>
                <IconButton
                    onClick={this.toggleAllSuggestions}
                    className={classes.iconButton}
                    aria-label="Search">
                    <FilterList/>
                </IconButton>
            </Paper>
        )

    }
    render() {
        const {classes} = this.props;
        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: this.state.single ? this.state.filteredSuggestions: this.state.suggestions,
            alwaysRenderSuggestions: this.state.shouldRenderSuggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            onSuggestionSelected: this.selectSuggestion,
            getSuggestionValue,
            renderSuggestion
        };

        return (
            <Fragment>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                    classes,
                    placeholder: 'Filter by state',
                    value: this.state.single,
                    onChange: this.handleChange('single'),
                    inputRef: node => {
                        this.popperNode = node;
                    }
                }}
                    theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion
                }}
                    renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}/>

            </Fragment>

        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntegrationAutosuggest);