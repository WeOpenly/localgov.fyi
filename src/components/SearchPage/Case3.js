import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import CircularProgress from '@material-ui/core/CircularProgress';;
import Card from '@material-ui/core/Card';
import ContentLoader from "react-content-loader"
import Grid from '@material-ui/core/Grid';
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import OrgAggregate from '../Organization/Aggregate';
import SerListItemWithOrg from '../Service/ListItemWithOrg';
import LocationCard from '../UserRequests/LocationCard';
import NearbyOrgList from '../Nearby/OrgList';
import RelatedServiceTemplates from '../RelatedServiceTemplates';
import { withStyles } from '@material-ui/core/styles';
import { trackEvent } from '../common/tracking';

const styles = theme => ({
    ser_case1_suggested_row: {
        paddingLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 4,
    },
    ser_case1_suggested_row_mob: {
        paddingLeft: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 1,
    },
    ser_case1_suggested_row_mob_heading: {
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        flexWrap: 'wrap',
    },
    ser_case3_org_agg_container:{
        display: 'flex',
        flexDirection: 'column',
    },
    ser_gloss_suggested_failed_row:{
        marginTop: theme.spacing.unit *2,
    },
    ser_case1_suggested_row_heading_mob:{
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        flexWrap: 'wrap',
    },
    ser_case1_suggested_row_heading:{
        paddingBottom: theme.spacing.unit * 2,
    },
    ser_case1_suggested_row_locs: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing.unit,
    },
    ser_case1_suggested_row_locs_mob: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        position: 'relative'
    },
    ser_gloss_suggested_row: {
        paddingLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
    },
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

class Case3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMob: false,
        }
    }

    componentDidMount() {
        this.setState({ isMob: isMobileOnly });
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;
        if (this.props.searchResultsLoading && !nextProps.searchResultsLoading) {
            const { searchResults } = nextProps;
            const resLen = searchResults && Object.keys(searchResults).length > 0;
            dispatch(trackEvent('index_search_result', {
                results_case: 3,
                results_len: resLen,
            }));
        }
    }

    render() {
        const { classes, searchResults, searchResultsFailed } = this.props;
        const resultsAvailable = searchResults && Object.keys(searchResults).length > 0;

        let serResultsComponent = <Grid container>
            <Grid item xs="auto" />
            <Grid item xs={12} className={classes.ser_gloss_suggested_failed_row}>
                <LocationCard compact message={`Sorry, we couldn't find any results matching your search query`} />
            </Grid>
            <Grid item xs="auto" />
        </Grid>

        let excAreaId = null;
        let header = 'Results matching your search based on your location';

        if (resultsAvailable){
            if (searchResults.result_type === 'ser_list'){
                serResultsComponent = searchResults.results.map((ser, idx) => <SerListItemWithOrg {...ser} />)
                excAreaId = searchResults.results[0].area.id;
            }
            else if(searchResults.result_type === 'org_agg'){
                header = null
                serResultsComponent = (<div className={classes.ser_case3_org_agg_container}>
                    <OrgAggregate {...searchResults.results} />
                    <div className={classes.ser_gloss_suggested_failed_row} >
                    <LocationCard compact message={`We couldn't find results matching your search`}/> </div>
                </div>)
                excAreaId = searchResults.results.area.id;
            }
        }
     
        return (
            <Grid container>
                <Grid item sm={12} className={this.state.isMob ? classes.ser_case1_suggested_row_mob : classes.ser_case1_suggested_row}>
                    <Typography
                        variant="title"
                        className={this.state.isMob ? classes.ser_case1_suggested_row_heading_mob : classes.ser_case1_suggested_row_heading}>
                        {header}
                    </Typography>
                    <div className={this.state.isMob ? classes.ser_case1_suggested_row_locs_mob : classes.ser_case1_suggested_row_locs}>
                        {serResultsComponent}
                    </div>
                </Grid>
                <Grid item sm={12} className={this.state.isMob ? classes.ser_case1_suggested_row_mob : classes.ser_case1_suggested_row}>
                    <NearbyOrgList location={this.props.location} excAreaId={excAreaId} />
                </Grid>
                <Grid item sm={12} className={this.state.isMob ? classes.ser_case1_suggested_row_mob : classes.ser_case1_suggested_row}>
                    <Typography
                        variant="title"
                        className={this.state.isMob ? classes.ser_case1_suggested_row_heading_mob : classes.ser_case1_suggested_row_heading}>
                        Popular Services
                    </Typography>
                    <div className={this.state.isMob ? classes.ser_case1_suggested_row_mob : classes.ser_case1_suggested_row}>
                        <RelatedServiceTemplates  />
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.searchPage,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Case3));
