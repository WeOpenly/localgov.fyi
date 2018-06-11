import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {navigateTo} from 'gatsby-link';

import {withStyles} from '@material-ui/core/styles';
import Spinner from 'react-spinkit';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import HeaderWithSearch from '../../components/HeaderWithSearch';
import SearchResults from '../../components/SearchResults';
import SemanticResults from '../../components/SemanticResults';

import withRoot from '../../withRoot';

import {fetchSearchResults} from '../../components/Search/actions';

const styles = theme => ({
    root: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    searchResults: {
        paddingTop: theme.spacing.unit * 3
    }
});

class Index extends React.Component {

    render() {
        const {classes, location, search} = this.props;
        const { pathname } = location;
        const {isSemantic, searchResultsLoading, searchResultsLoadingFailed} = search;

        const pathNameFragments = pathname.split('/');

        let searchText = null;
        if (pathNameFragments.length > 1) {
            searchText = pathNameFragments[2]
        }

        if (searchResultsLoading) {
            return (<Spinner name="ball-beat" color="blue"/>);
        }

        if (searchResultsLoadingFailed) {
            return "something went wrong";
        }

        return (
            <div className={classes.root}>
                <HeaderWithSearch searchText={searchText}/>
                <Grid container spacing={0}>
                    <Grid item xs={1} md={1}/>
                    <Grid className={classes.searchResults} item xs={10} md={10}>
                        {isSemantic ? (<SemanticResults/> ) : (<SearchResults/>) }
                    </Grid>
                    <Grid item xs={1} md={1}/>
                </Grid>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(Index)));