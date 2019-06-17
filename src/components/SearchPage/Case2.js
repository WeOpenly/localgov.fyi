import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {navigate} from 'gatsby'
import Spinner from 'react-spinkit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import OrgAggregate from '../Organization/Aggregate';
import LocationCard from '../UserRequests/LocationCard';
import RelatedServiceTemplates from '../RelatedServiceTemplates';
import { withStyles } from '@material-ui/core/styles';
import ContentLoader from "react-content-loader"
import { trackEvent } from '../common/tracking';

const windowGlobal = typeof window !== 'undefined' && window

const DeskTopServiceLoader = () => (
  <ContentLoader 
    height={400}
    width={800}
    speed={100}
    primaryColor="#f3f3f3"
    secondaryColor="#d5d9f3"
  >
    <circle cx="27" cy="26" r="1" /> 
    <circle cx="46" cy="49" r="1" /> 
    <rect x="65" y="109" rx="0" ry="0" width="0" height="0" /> 
    <rect x="13" y="141" rx="0" ry="0" width="538" height="220" /> 
    <rect x="384" y="243" rx="0" ry="0" width="0" height="0" /> 
    <rect x="594" y="141" rx="0" ry="0" width="181" height="56" /> 
    <rect x="673" y="174" rx="0" ry="0" width="0" height="1" /> 
    <rect x="594" y="214" rx="0" ry="0" width="181" height="56" /> 
    <rect x="590" y="290" rx="0" ry="0" width="181" height="56" /> 
    <rect x="17" y="22" rx="0" ry="0" width="277" height="20" /> 
    <rect x="19" y="60" rx="0" ry="0" width="113" height="20" /> 
    <rect x="16" y="99" rx="0" ry="0" width="113" height="20" /> 
    <rect x="651" y="23" rx="0" ry="0" width="122" height="21" />
  </ContentLoader>
)


const MobileServiceLoader = () => (
    <ContentLoader
        height={360}
        width={370}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3"
    >
        <circle cx="27" cy="26" r="1" />
        <circle cx="46" cy="49" r="1" />
        <rect x="65" y="109" rx="0" ry="0" width="0" height="0" />
        <rect x="384" y="243" rx="0" ry="0" width="0" height="0" />
        <rect x="673" y="174" rx="0" ry="0" width="0" height="1" />
        <rect x="15" y="25" rx="0" ry="0" width="334" height="42" />
        <rect x="55" y="89" rx="0" ry="0" width="257" height="12" />
        <rect x="94" y="140" rx="0" ry="0" width="72" height="22" />
        <rect x="25" y="199" rx="0" ry="0" width="325" height="147" />
        <rect x="198" y="140" rx="0" ry="0" width="72" height="22" />
        <rect x="55" y="114" rx="0" ry="0" width="257" height="12" />
    </ContentLoader>
)



const styles = theme => ({
 ser_case2_loading:{
   margin: theme.spacing.unit,
 },
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
    ser_case1_suggested_row_heading_mob: {
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        flexWrap: 'wrap',
    },
    ser_case1_suggested_row_heading: {
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
    }
});

class Case2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMob: false,
        }
    }

    componentWillMount() {
        this.setState({ isMob: isMobileOnly });

    }



    render() {
        const {classes, searchResults, searchResultsLoading , shouldRedirect} = this.props;
        const resultsAvailable = searchResults && Object.keys(searchResults).length > 0;
        const loadingComp = this.state.isMob ? (<Grid container>
            <Grid item sm={1} />
            <Grid item sm={10} className={classes.ser_case2_loading}>
                <MobileServiceLoader />
            </Grid>
            <Grid item sm={1} />
        </Grid>
        ) : (<Grid container>
            <Grid item sm={12} className={classes.ser_case2_loading}>
                <DeskTopServiceLoader />
            </Grid>
        </Grid>)

        if (searchResultsLoading){
         
            return loadingComp
        }

        if (!searchResultsLoading && searchResults && searchResults.length > 0 && shouldRedirect){
            if (windowGlobal){
                const url = searchResults[0].url_slug
                navigate(`/${url}`)
                return loadingComp
            }
        
        } else{
            return (  <Grid container>
                <Grid item sm={12} className={this.state.isMob ? classes.ser_case1_suggested_row_mob : classes.ser_case1_suggested_row}>
                    <div className={this.state.isMob ? classes.ser_case1_suggested_row_locs_mob : classes.ser_case1_suggested_row_locs}>
                        <Grid container>
                            <Grid item xs="auto" />
                            <Grid item xs={12} className={classes.ser_gloss_suggested_failed_row}>
                                <LocationCard compact message={`Sorry, we couldn't find any results for your location`} />
                            </Grid>
                            <Grid item xs="auto" />
                        </Grid>
                    </div>
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

            </Grid>)
        }
    
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.searchPage,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Case2));
