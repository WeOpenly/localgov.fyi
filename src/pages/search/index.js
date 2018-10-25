import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Link from 'gatsby-link';
import Helmet from "react-helmet";
import Spinner from 'react-spinkit';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MoodBad from '@material-ui/icons/MoodBad';

import HeaderWithSearch from '../../components/HeaderWithSearch';
import SearchResults from '../../components/SearchResults';
import SemanticResults from '../../components/SemanticResults';
import NoResults from '../../components/NoResults';
import withRoot from '../../withRoot';

import { trackView } from "../../components/common/tracking";
import { updateInput, fetchSearchResults } from '../../components/Search/actions.js';

const styles = theme => ({
    root: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
    },
    rootMobile: {
        width: 'auto',
        height: '100%',
        marginLeft: theme.spacing.unit * -2,
        marginRight: theme.spacing.unit * -2,
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
    },
noresults:{
    marginTop: theme.spacing.unit * 10,
}
});

class Search extends React.Component {
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
        dispatch(trackView('search', null, null, null));
    }

    render() {
        const {classes, location, search} = this.props;
        const {pathname} = location;
        const {isSemantic, searchResultsLoading, searchResults, searchResultsLoadingFailed, input} = search;

        const noResults = !isSemantic && searchResults.length === 0;
       
        if (searchResultsLoading) {
            return (
                <div className={classes.wrapper}>
                    <Spinner name="ball-beat" color="blue"/>
                </div>
            );
        }

        if (noResults){
            const { pathname } = location;

            const pathNameFragments = pathname.split('/');

            let searchText = null;
            if (pathname.includes('search') && pathNameFragments.length > 1) {
                searchText = pathNameFragments[2]
            }
            
            return <div className={!isMobileOnly ? classes.root : classes.rootMobile}>
                <Helmet title={`Search for - ${input}`} />
                <HeaderWithSearch />
                <div className={classes.noresults}>
                    <NoResults searchQuery={searchText} />
                </div>
                <form name="feedback" data-netlify="true" netlify-honeypot="bot-field" hidden>
                    <input type="hidden" name="form-name" value="feedback" />
                    <input type="text" name="path" />
                    <input type="email" name="email" />
                    <textarea name="feedbackComment"></textarea>
                </form>
            </div>
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
            <div className={!isMobileOnly ? classes.root : classes.rootMobile}>
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

Search.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(Search)));