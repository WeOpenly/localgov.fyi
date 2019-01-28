import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Link from 'gatsby-link';
import Helmet from "react-helmet";
import Spinner from 'react-spinkit';
import { isMobileOnly } from 'react-device-detect';
import queryString from 'query-string'
import TextLoop from "react-text-loop";
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
    search_root: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
    },
    search_rootMobile: {
        width: 'auto',
        height: '100%',
        marginLeft: theme.spacing.unit * -2,
        marginRight: theme.spacing.unit * -2,
        padding: 0,
    },
    search_flex: {
        flex: 1
    },
search_menuButton : {
        marginLeft: -12,
        marginRight: 20,
    },
search_searchResults : {
        paddingTop: theme.spacing.unit * 3,
    },
search_wrapper : {
        width: '100%',
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
search_icon : {
        fontSize: 48,
        color: theme.palette.primary['500'],
        marginBottom: theme.spacing.unit * 2,
    },
search_link : {
        color: theme.palette.primary['500'],
        textDecoration: 'none',
    },
search_noresults : {
    marginTop: theme.spacing.unit * 10,
}
});

class Search extends React.Component {
    componentDidMount() {
        const {dispatch, location } = this.props;
        const { search } = this.props.location;
        let searchText = null;

        if (search) {
            const values = queryString.parse(this.props.location.search);
            if (values && values.q) {
                searchText = values.q;
            }
        }
    
        if (searchText) {
            dispatch(updateInput(searchText));
            dispatch(fetchSearchResults(search));
        }
        dispatch(trackView('search', null, null, null));
    }

    componentWillReceiveProps(newProps){
        const {dispatch, location} = this.props;
        const { search, searchResultsLoading } = this.props.location;
        if (search && newProps.location.search && newProps.location.search !== search && !searchResultsLoading){
            let searchText = null;

            const values = queryString.parse(newProps.location.search);
            if (values && values.q) {
                searchText = values.q;
            }
   

            if (searchText && searchText.length > 4) {
                dispatch(updateInput(searchText));
                dispatch(fetchSearchResults(newProps.location.search));
                dispatch(trackView('search', null, null, null));
            }
           
        }
       
    }

    render() {
        const {classes, location, search} = this.props;

        const {isSemantic, searchResultsLoading, searchResults, searchResultsLoadingFailed, input} = search;

        const noResults = !isSemantic && searchResults.length === 0;

        console.log(noResults, "noresults", searchResultsLoading, "searchresultsloading", searchResultsLoadingFailed, "searchResultsLoadingFailed")

        if (searchResultsLoading) {
            const { search } = this.props.location;
            let searchText = null;

            if (search) {
                const values = queryString.parse(this.props.location.search);
                if (values && values.q) {
                    searchText = values.q;
                }
            }

            return (<div className={!isMobileOnly ? classes.search_root : classes.search_rootMobile}>
                <Helmet title={`Loading results for Search term - ${input}`} />
                <HeaderWithSearch />
                <div className={classes.search_noresults}>
                    <div className={classes.search_wrapper}>
                        <Spinner name="ball-beat" color="blue" />
                        <Typography variant="subheading" style={{ paddingBottom: 16 }} gutterBottom>
                            <TextLoop interval={2500} children={[`Understanding your search for ${searchText}`, "Searching our directory", `Loading results for search term ${searchText}`]}/>
                        
                        </Typography>
                    </div>
                </div>
            </div>)
        }

        if (!searchResultsLoading && noResults){
            const { search } = this.props.location;
            let searchText = null;

            if (search) {
                const values = queryString.parse(this.props.location.search);
                if (values && values.q) {
                    searchText = values.q;
                }
            }
            
            return <div className={!isMobileOnly ? classes.search_root : classes.search_rootMobile}>
                <Helmet title={`Search for - ${input}`} />
                <HeaderWithSearch />
                <div className={classes.search_noresults}>
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
                <div className={classes.search_wrapper}>
                    <MoodBad className={classes.search_icon}/>
                    <Typography variant="title">
                        Something went wrong.
                    </Typography>
                    <Typography variant="subheading">
                        Please <Link to="/" className={classes.search_link}>try another search.</Link>
                    </Typography>
                </div>
            );
        }
        
        return (
            <div className={!isMobileOnly ? classes.search_search_root : classes.search_search_rootMobile}>
                <Helmet title={`Search for - ${input}`} />
                <HeaderWithSearch />
                <Grid className='search_grid' container spacing={0}>
                    <Grid className='search_grid_item' item xs={1} md={1}/>
                    <Grid className='search_grid_item' className={classes.search_searchResults} item xs={10} md={10}>
                        {isSemantic
                            ? (<SemanticResults/>)
                            : (<SearchResults/>)}
                    </Grid>
                    <Grid className='search_grid_item' item xs={1} md={1}/>
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