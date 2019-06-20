import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { StaticQuery, graphql } from "gatsby"
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import TextLoop from "react-text-loop";
import LocationCard from '../UserRequests/LocationCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Img from "gatsby-image";
import Avatar from '@material-ui/core/Avatar';
import OtherLocations from '../IndexPage/OtherLocations'
import RelatedServiceTemplates from '../RelatedServiceTemplates';
import { trackEvent } from '../common/tracking';

import Grid from '@material-ui/core/Grid';
import ContentLoader from "react-content-loader"
import Case1 from './Case1'
import Case2 from './Case2'
import Case3 from './Case3'

const styles = theme => ({
    ser_gloss_gridItemLocation_mob_focus: {
        boxShadow: `0 0 3px 0px ${theme.palette.primary['600']}`
    },
    ser_results_failed_row:{
        display: 'flex',
        justifyContent: 'center'
    },
    suggest_loc_card: {
        display: 'flex'
    },
    suggest_loc_org_details: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    ser_search_loading:{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '600px',
    },
    suggest_loc_logo: {
        width: 56,
        zIndex: '190',
        height: 56,
        boxShadow: `0 0 0px 1px ${theme.palette.primary["200"]}`,
        border: '1px solid #fff',
        marginRight: theme.spacing(2),
    }
});
const SuggestedLoader = () => (
    <ContentLoader
        height={200}
        width={400}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3">
        <rect x="11" y="75" rx="0" ry="0" width="166" height="61"/>
        <rect x="8" y="12" rx="0" ry="0" width="304" height="19"/>
    </ContentLoader>
)
const SearchSuggestedLoader = () => (
    <ContentLoader
        height={360}
        width={300}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3"
    >
        <rect x="89" y="28" rx="4" ry="4" width="117" height="3" />
        <rect x="92" y="45" rx="3" ry="3" width="85" height="6" />
        <circle cx="27" cy="26" r="1" />
        <circle cx="42" cy="49" r="31" />
        <circle cx="46" cy="49" r="1" />
        <rect x="13" y="100" rx="0" ry="0" width="344" height="21" />
        <rect x="65" y="109" rx="0" ry="0" width="0" height="0" />
        <rect x="11" y="141" rx="0" ry="0" width="344" height="21" />
        <rect x="11" y="180" rx="0" ry="0" width="344" height="21" />
        <rect x="8" y="221" rx="0" ry="0" width="344" height="21" />
        <rect x="91" y="66" rx="3" ry="3" width="85" height="6" />
    </ContentLoader>
)

class SearchPageResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMob: false,
        }
    }

    componentDidMount() {
        this.setState({ isMob: isMobileOnly });
    }

    componentWillReceiveProps(nextProps){
        const {dispatch} = this.props;

        if (this.props.searchResultsLoading && !nextProps.searchResultsLoading && !nextProps.searchResultsFailed){
            const { searchResults, shouldRedirect } = nextProps;
            const resLen = searchResults && Object.keys(searchResults).length > 0;
            dispatch(trackEvent('index_search_result', {
                results_case: nextProps.searchResultCase,
                results_len: resLen,
                redirected: shouldRedirect
            }));
        }
    }

    render() {
        const { classes, searchResultsLoading, searchResults, searchResultCase, searchResultsFailed, location} = this.props;
        
        if(searchResultsLoading && !searchResultsFailed){
            return (<Grid container>

                <Grid item sm={12} className={classes.ser_search_loading}>
                    <Typography varant="subtitle1" style={{ paddingBottom: 16 }} gutterBottom>
                        <TextLoop interval={800} children={[`Understanding your search `, "Searching our directory", `Loading results`]} />
                    </Typography>
                </Grid>
            </Grid>)
        }

        if (searchResultsFailed || !searchResultCase){
            return (<Grid container>

                <Grid item xs="auto" />
                <Grid item xs={12} className={classes.ser_results_failed_row}>
                    <LocationCard compact message={`Sorry, we couldn't find any results for your location`} />
                </Grid>
                <Grid item xs="auto" />
                <Grid item xs="auto" />
                <Grid item xs={12} className={classes.ser_results_failed_row}>
                    <OtherLocations />
                </Grid>
                <Grid item xs="auto" />
                <Grid item sm={12} className={this.state.isMob ? classes.ser_case1_suggested_row_mob : classes.ser_case1_suggested_row}>
                    <Typography
                        varant="h6"
                        className={this.state.isMob ? classes.ser_case1_suggested_row_heading_mob : classes.ser_case1_suggested_row_heading}>
                        Popular Services
                    </Typography>
                    <div className={this.state.isMob ? classes.ser_case1_suggested_row_mob : classes.ser_case1_suggested_row}>
                        <RelatedServiceTemplates />
                    </div>
                </Grid>
            </Grid>)
        }

        if (searchResultCase === 1){
            return <Case1 location={location}/>
        } else if (searchResultCase === 2) {
            return <Case2 location={location}/>
        } else if (searchResultCase === 3){
            return <Case3 location={location}/>
        }

        return (<SearchSuggestedLoader />)
        
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.searchPage
    };
};

export default connect(mapStateToProps)(withStyles(styles)(SearchPageResults));