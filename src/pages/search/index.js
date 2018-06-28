import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Link from 'gatsby-link';
import Helmet from "react-helmet";
import {withStyles} from '@material-ui/core/styles';
import Spinner from 'react-spinkit';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MoodBad from '@material-ui/icons/MoodBad';

import HeaderWithSearch from '../../components/HeaderWithSearch';
import SearchResults from '../../components/SearchResults';
import SemanticResults from '../../components/SemanticResults';

import withRoot from '../../withRoot';

import {updateInput, fetchSearchResults} from '../../components/Search/actions';

const styles = theme => ({
    root: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
    },
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    searchResults: {
        paddingTop: theme.spacing.unit * 3,
    },
    wrapper: {
        width: '100%',
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 48,
        color: theme.palette.primary['500'],
        marginBottom: theme.spacing.unit * 2,
    },
    link: {
        color: theme.palette.primary['500'],
        textDecoration: 'none',
    }
});

class Index extends React.Component {

    componentDidMount() {
        const {dispatch, location } = this.props;
        const { pathname } = location;
 
        const pathNameFragments = pathname.split('/');

        let searchText = null;
        if (pathname.includes('search') && pathNameFragments.length > 1) {
            searchText = pathNameFragments[2]
        }

        if (searchText) {
            dispatch(updateInput(searchText));
            dispatch(fetchSearchResults);
        }
    }

    render() {
        const {classes, location, search} = this.props;
        const {pathname} = location;
        const {isSemantic, searchResultsLoading, searchResultsLoadingFailed, input} = search;
       

        if (searchResultsLoading) {
            return (
                <div className={classes.wrapper}>
                    <Spinner name="ball-beat" color="blue"/>
                </div>
            );
        }

        if (searchResultsLoadingFailed) {
            return (
                <div className={classes.wrapper}>
                    <MoodBad className={classes.icon}/>
                    <Typography variant="title">
                        Something went wrong.
                    </Typography>
                    <Typography variant="subheading">
                        Please <Link to="/" className={classes.link}>try another search.</Link>
                    </Typography>
                </div>
            );
        }

        return (
            <div className={classes.root}>
                <Helmet title={`Search for - ${input}`} />
                <HeaderWithSearch />
                <Grid container spacing={0}>
                    <Grid item xs={1} md={1}/>
                    <Grid className={classes.searchResults} item xs={10} md={10}>
                        {isSemantic
                            ? (<SemanticResults/>)
                            : (<SearchResults/>)}
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