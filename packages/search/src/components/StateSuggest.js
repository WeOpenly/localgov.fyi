import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import NativeSelect from '@material-ui/core/NativeSelect';
import {withStyles} from '@material-ui/core/styles';


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
    gloss_state_suggest_root: {
        marginBottom: theme.spacing.unit * 2,
        display: 'flex',
        justifyContent: 'center',
        width: '280px',
    },
    gloss_state_suggest_root_mob: {
        marginTop: theme.spacing.unit *2,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxShadow: `0 0 1px 0 ${theme.palette.primary['300']}`
    },
    input: {
        marginLeft: 12,
        flex: 1
    },
    iconButton: {
        padding: 6,
        fontSize: '10px'
    },
    divider: {
        width: 1,
        height: 32,
        margin: 4
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 210,
        width: 270,
        right: 8,
        top: 40,
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
        height: '320px',
        overflowY: 'scroll',
        listStyleType: 'none'
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

class StateSuggest extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev){
        const { clearStateName, onSelectSuggestion }= this.props;
        console.log(ev.target.value);
        if (ev.target && ev.target.value){
            onSelectSuggestion({label: ev.target.value})
        }
        else{
            clearStateName()
        }
    }

    render() {
        const {classes} = this.props;
        const { selected, allStates  } = this.props;

        const opts = allStates.map((state, idx) => {
            return (<option value={state.label}>{state.label}</option>)
        })

        return (
            <FormControl className={classes.gloss_state_suggest_root}>
               
                <NativeSelect
                    native
                    inputProps={{
                        name:"Filter State",
                        id:"outlined-state-filter-native-simple"
                    }}
     
                    value={selected ? selected.label : ""}
                    onChange={this.handleChange}
                >
                   
                    {opts}
                    <option value="">All States</option>
                </NativeSelect>
                <FormHelperText>Filter by state</FormHelperText>
            </FormControl>

        );
    }
}

StateSuggest.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StateSuggest);