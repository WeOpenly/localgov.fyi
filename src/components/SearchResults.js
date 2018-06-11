import React, { Component } from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import _ from "lodash";
import Spinner from 'react-spinkit';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Search from './Search/index';
import SearchResult from "./SearchResult";

import withRoot from '../withRoot';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    searchResults: {
        paddingTop: theme.spacing.unit * 3
    },
    errorMsgContainer: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    errorText: {},
    errorStateIcon: {
        fontSize: 64
    }
});

class SearchResults extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { search, classes } = this.props;
        const { searchResults } = search;

        const searchResultCards = []

        searchResults.map((result, index) => {
           
            if (result) {
                const entityResultCards = result.suggestions.map((entResult, index) => {
                    const org_id = entResult.id;
                    const type = entResult.type;

                    return (<SearchResult key={org_id} toLink={`/${type}/${org_id}`} title={entResult.head} subtitle={type}/>
                    );
                });
                if (entityResultCards.length > 0){
searchResultCards.push(entityResultCards)
                }
            }
        });
      
        return <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>
            {searchResultCards}
            </Grid>
        </Grid>;
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(withStyles(styles)(SearchResults));
